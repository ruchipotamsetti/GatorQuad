import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import ResultsDisplay from './components/ResultsDisplay';
import ChatWindow from './components/ChatWindow';
import DoctorLogin from './components/doctor/DoctorLogin';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import PatientCard from './components/doctor/PatientCard';
import PostTriageChoice from './components/PostTriageChoice';
import DoctorSelection from './components/DoctorSelection';
import Home from './components/Home';
import { getAITriage, continueAITriage } from './services/geminiService';
import type { TriageResult, RankedSpecialist, UrgentCareCenter, Message, Doctor, PatientRequest, Specialist } from './types';
import { Urgency } from './types';
import { specialistsDB, urgentCareDB, doctorsDB, patientRequestsDB } from './data/mockData';
import { getCoordsFromZip } from './utils/geolocation';
import { getDistanceInMiles } from './utils/geolocation';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [triageResult, setTriageResult] = useState<TriageResult | null>(null);
  const [rankedSpecialists, setRankedSpecialists] = useState<RankedSpecialist[] | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number; } | null>(null);
  const [isChatting, setIsChatting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [loggedInDoctor, setLoggedInDoctor] = useState<Doctor | null>(null);
  const [patientRequests, setPatientRequests] = useState<PatientRequest[]>(patientRequestsDB);
  const [selectedRequest, setSelectedRequest] = useState<PatientRequest | null>(null);

  // New state for post-triage workflow
  const [postTriageStep, setPostTriageStep] = useState<'choice' | 'select_doctor' | 'consent' | 'request_sent' | null>(null);
  const [newRequest, setNewRequest] = useState<Partial<PatientRequest> | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const rankAndFilterSpecialists = useCallback((
    triage: TriageResult,
    location: { latitude: number; longitude: number; },
    insurance: string,
    radius: number
  ): RankedSpecialist[] => {
    
    const specialistsWithDistance = specialistsDB.map(specialist => {
      const distance = getDistanceInMiles(
        location.latitude,
        location.longitude,
        specialist.location.latitude,
        specialist.location.longitude
      );
      return { ...specialist, distance };
    });

    const filtered = specialistsWithDistance.filter(specialist => {
      const specialtyMatch = specialist.specialty.toLowerCase() === triage.specialist?.toLowerCase();
      const insuranceMatch = insurance === 'any' || specialist.acceptedInsurance.includes(insurance);
      const distanceMatch = specialist.distance <= radius;
      return specialtyMatch && insuranceMatch && distanceMatch;
    });

    const ranked = filtered.map(specialist => {
      let matchScore = 0;
      triage.keywords.forEach(keyword => {
        if (specialist.expertise.includes(keyword.toLowerCase())) {
          matchScore += 10;
        }
      });
      if (specialist.urgentAvailability) {
        matchScore += 5;
      }
      matchScore -= specialist.distance; 

      return { ...specialist, matchScore };
    });

    return ranked.sort((a, b) => b.matchScore - a.matchScore);

  }, []);

  const handleStartConsultation = async (symptoms: string, zipCode: string, insurance: string, radius: number) => {
    setIsLoading(true);
    setError(null);
    setTriageResult(null);
    setRankedSpecialists(null);
    setUserLocation(null);
    setIsChatting(true);
    setPostTriageStep(null);

    const location = await getCoordsFromZip(zipCode);
    if (!location) {
      setError("Invalid ZIP code. Please try again.");
      setIsLoading(false);
      setIsChatting(false);
      return;
    }
    setUserLocation(location);

    const initialMessages: Message[] = [
      {
        sender: 'ai',
        text: "Hello! I'm Nurse Eva, your AI triage assistant. I'll ask a few questions to understand your symptoms better. Let's start with your initial concern."
      },
      {
        sender: 'user',
        text: symptoms
      }
    ];
    setMessages(initialMessages);
    setNewRequest({ symptoms, conversation: initialMessages });

    try {
      const aiResponse = await continueAITriage(initialMessages);
      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse.question }]);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    const newMessages: Message[] = [...messages, { sender: 'user', text }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const aiResponse = await continueAITriage(newMessages);

      if (aiResponse.recommendation) {
        setTriageResult(aiResponse);
        setNewRequest(prev => ({ ...prev, triageResult: aiResponse, conversation: newMessages }));
        setIsChatting(false);
        setPostTriageStep('choice');
      } else {
        setMessages(prev => [...prev, { sender: 'ai', text: aiResponse.question }]);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDoctorLogin = (username: string, password: string) => {
    const doctor = doctorsDB.find(d => d.username === username && d.password === password);
    if (doctor) {
      setLoggedInDoctor(doctor);
      window.location.hash = '#/doctor/dashboard';
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleLogout = () => {
    setLoggedInDoctor(null);
    window.location.hash = '#/';
  };

  const handleSelectRequest = (request: PatientRequest) => {
    setSelectedRequest(request);
    window.location.hash = '#/doctor/request/' + request.id;
  };

  const handleApproveRequest = (request: PatientRequest) => {
    const updatedRequests = patientRequests.map(r => r.id === request.id ? { ...r, status: 'Approved' } : r);
    setPatientRequests(updatedRequests);
    setSelectedRequest(null);
    window.location.hash = '#/doctor/dashboard';
  };

  const handleClaimRequest = (request: PatientRequest) => {
    if (!loggedInDoctor) return;
    const updatedRequests = patientRequests.map(r => r.id === request.id ? { ...r, doctorId: loggedInDoctor.id } : r);
    setPatientRequests(updatedRequests);
  };

  // Handlers for the new post-triage workflow
  const handleSelectSpecificDoctor = () => setPostTriageStep('select_doctor');
  const handleEnterSmartQueue = () => setPostTriageStep('consent');
  const handleBackToChoice = () => setPostTriageStep('choice');

  const handleSendRequestToDoctor = (doctorId: number) => {
    if (!newRequest) return;
    const finalRequest: PatientRequest = {
      ...newRequest,
      id: patientRequests.length + 1,
      patient: { name: 'New Patient', age: 30, gender: 'N/A' }, // Placeholder
      status: 'Pending',
      requestDate: new Date().toISOString(),
      doctorId
    } as PatientRequest;
    setPatientRequests(prev => [...prev, finalRequest]);
    setPostTriageStep('request_sent');
  };

  const handleSmartQueueConsent = () => {
    if (!newRequest) return;
    const finalRequest: PatientRequest = {
      ...newRequest,
      id: patientRequests.length + 1,
      patient: { name: 'New Patient', age: 30, gender: 'N/A' }, // Placeholder
      status: 'Pending',
      requestDate: new Date().toISOString(),
      doctorId: 0 // 0 for smart queue
    } as PatientRequest;
    setPatientRequests(prev => [...prev, finalRequest]);
    setPostTriageStep('request_sent');
  };

  const renderPatientContent = () => {
    if (route === '#/patient/login') {
      if (isChatting) {
        return <ChatWindow messages={messages} onSendMessage={handleSendMessage} isLoading={isLoading} />;
      }
      if (postTriageStep === 'choice') {
        return <PostTriageChoice onSelectSpecificDoctor={handleSelectSpecificDoctor} onEnterSmartQueue={handleEnterSmartQueue} />;
      }
      if (postTriageStep === 'select_doctor' && triageResult) {
        const doctors = specialistsDB.filter(d => d.specialty === triageResult.specialist) as Specialist[];
        return <DoctorSelection doctors={doctors} onSelectDoctor={handleSendRequestToDoctor} onBack={handleBackToChoice} />;
      }
      if (postTriageStep === 'consent') {
        return (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Consent for Smart Queue</h2>
            <p className="text-gray-600 mb-6">By entering the Smart Queue, you consent to have your anonymized patient card shared with multiple relevant specialists on our platform. This will help you find the fastest available appointment.</p>
            <div className="space-x-4">
              <button onClick={handleSmartQueueConsent} className="py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700">I Consent, Enter Smart Queue</button>
              <button onClick={handleBackToChoice} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50">Back to Options</button>
            </div>
          </div>
        );
      }
      if (postTriageStep === 'request_sent') {
        return (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200 text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Request Sent!</h2>
            <p className="text-gray-600">Your request has been sent. You will be notified when a doctor approves your appointment.</p>
          </div>
        );
      }
      return <SearchForm onSearch={handleStartConsultation} isLoading={isLoading} />;
    }
    return null;
  };

  const renderContent = () => {
    if (route.startsWith('#/doctor')) {
      if (!loggedInDoctor) {
        return <DoctorLogin onLogin={handleDoctorLogin} error={error} />;
      }
      if (route.startsWith('#/doctor/request/')) {
        const request = patientRequests.find(r => r.id === selectedRequest?.id);
        return request ? <PatientCard request={request} onApprove={handleApproveRequest} onBack={() => window.location.hash = '#/doctor/dashboard'} /> : <div>Request not found</div>;
      }
      const doctorProfile = specialistsDB.find(s => s.id === loggedInDoctor.id);
      const directRequests = patientRequests.filter(r => r.doctorId === loggedInDoctor.id);
      const smartQueueRequests = patientRequests.filter(r => r.doctorId === 0 && r.status === 'Pending' && doctorProfile && doctorProfile.specialty === r.triageResult.specialist);
      return <DoctorDashboard directRequests={directRequests} smartQueueRequests={smartQueueRequests} onSelectRequest={handleSelectRequest} onClaimRequest={handleClaimRequest} />;
    }

    if (route === '#/' || route === '') {
      return <Home />;
    }

    return (
      <main className="container mx-auto px-4 md:px-8 py-8">
        {renderPatientContent()}
        <ResultsDisplay
          isLoading={isLoading && !isChatting}
          error={error}
          triageResult={triageResult}
          rankedSpecialists={rankedSpecialists}
          urgentCareCenters={urgentCareDB as UrgentCareCenter[]}
          userLocation={userLocation}
        />
      </main>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header key={loggedInDoctor ? loggedInDoctor.id : 'logged-out'} loggedInDoctor={loggedInDoctor} onLogout={handleLogout} />
      {renderContent()}
      <footer className="text-center py-4 mt-8">
        <p className="text-sm text-gray-500">
          Disclaimer: This is a demo application and not a substitute for professional medical advice.
        </p>
      </footer>
    </div>
  );
}

export default App;