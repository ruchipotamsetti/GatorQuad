import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import ResultsDisplay from './components/ResultsDisplay';
import { getAITriage } from './services/geminiService';
import type { TriageResult, RankedSpecialist, UrgentCareCenter } from './types';
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

  const rankAndFilterSpecialists = useCallback((
    triage: TriageResult,
    location: { latitude: number; longitude: number; },
    insurance: string,
    radius: number
  ): RankedSpecialist[] => {
    
    // First, map all specialists to include their distance from the user
    const specialistsWithDistance = specialistsDB.map(specialist => {
      const distance = getDistanceInMiles(
        location.latitude,
        location.longitude,
        specialist.location.latitude,
        specialist.location.longitude
      );
      return { ...specialist, distance };
    });

    // Then, filter by specialty, insurance, and the provided radius
    const filtered = specialistsWithDistance.filter(specialist => {
      const specialtyMatch = specialist.specialty.toLowerCase() === triage.specialist?.toLowerCase();
      const insuranceMatch = insurance === 'any' || specialist.acceptedInsurance.includes(insurance);
      const distanceMatch = specialist.distance <= radius;
      return specialtyMatch && insuranceMatch && distanceMatch;
    });

    // Finally, rank the filtered list
    const ranked = filtered.map(specialist => {
      // Simple scoring: prioritize keywords, then availability, then distance
      let matchScore = 0;
      triage.keywords.forEach(keyword => {
        if (specialist.expertise.includes(keyword.toLowerCase())) {
          matchScore += 10;
        }
      });
      if (specialist.urgentAvailability) {
        matchScore += 5;
      }
      matchScore -= specialist.distance; // Closer is better

      return { ...specialist, matchScore };
    });

    return ranked.sort((a, b) => b.matchScore - a.matchScore);

  }, []);

  const handleSearch = async (symptoms: string, zipCode: string, insurance: string, radius: number) => {
    setIsLoading(true);
    setError(null);
    setTriageResult(null);
    setRankedSpecialists(null);
    setUserLocation(null);

    const location = getCoordsFromZip(zipCode);
    if (!location) {
      setError("Invalid ZIP code. Please try again.");
      setIsLoading(false);
      return;
    }
    setUserLocation(location);

    try {
      const triage = await getAITriage(symptoms);
      setTriageResult(triage);

      if (triage.urgency === Urgency.ROUTINE && triage.specialist) {
        const specialists = rankAndFilterSpecialists(triage, location, insurance, radius);
        setRankedSpecialists(specialists);
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
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        <ResultsDisplay
          isLoading={isLoading}
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