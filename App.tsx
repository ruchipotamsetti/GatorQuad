import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import ResultsDisplay from './components/ResultsDisplay';
import ChatWindow from './components/ChatWindow';
import { getAITriage, continueAITriage } from './services/geminiService';
import type { TriageResult, RankedSpecialist, UrgentCareCenter, Message } from './types';
import { Urgency } from './types';
import { specialistsDB, urgentCareDB } from './data/mockData';
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

    const location = getCoordsFromZip(zipCode);
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
        if (aiResponse.urgency === Urgency.ROUTINE && aiResponse.specialist && userLocation) {
          const specialists = rankAndFilterSpecialists(aiResponse, userLocation, 'any', 25);
          setRankedSpecialists(specialists);
        }
        setIsChatting(false);
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

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header />
      <main className="container mx-auto px-4 md:px-8 py-8">
        {!isChatting ? (
          <SearchForm onSearch={handleStartConsultation} isLoading={isLoading} />
        ) : (
          <ChatWindow messages={messages} onSendMessage={handleSendMessage} isLoading={isLoading} />
        )}
        <ResultsDisplay
          isLoading={isLoading && !isChatting}
          error={error}
          triageResult={triageResult}
          rankedSpecialists={rankedSpecialists}
          urgentCareCenters={urgentCareDB as UrgentCareCenter[]}
          userLocation={userLocation}
        />
      </main>
      <footer className="text-center py-4 mt-8">
        <p className="text-sm text-gray-500">
          Disclaimer: This is a demo application and not a substitute for professional medical advice.
        </p>
      </footer>
    </div>
  );
}

export default App;