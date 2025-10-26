import React, { useState, useRef, useEffect } from 'react';
import type { Message } from '../types';

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage, isLoading }) => {
  // baseInput holds committed text (typed + finalized speech). interimTranscript holds temporary interim speech.
  const [baseInput, setBaseInput] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    const fullText = (baseInput + interimTranscript).trim();
    if (fullText) {
      // If input is long, split it into safe-sized chunks before sending
      const MAX_CHARS = 2000; // conservative limit for model input — adjust if needed
      const text = fullText;
      if (text.length <= MAX_CHARS) {
        onSendMessage(text);
      } else {
        // split into chunks and send sequentially with part labels
        const parts: string[] = [];
        for (let i = 0; i < text.length; i += MAX_CHARS) {
          parts.push(text.slice(i, i + MAX_CHARS));
        }
        parts.forEach((part, idx) => {
          const labelled = `(part ${idx + 1} of ${parts.length}) ${part}`;
          onSendMessage(labelled);
        });
      }
      // clear both committed and interim text after sending
      setBaseInput('');
      setInterimTranscript('');
    }
  };

  // Initialize SpeechRecognition (browser Web Speech API)
  useEffect(() => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition || (window as any).mozSpeechRecognition;
    if (!SpeechRecognition) return;

    const recog = new SpeechRecognition();
    recog.continuous = true;
    recog.interimResults = true;
    recog.lang = 'en-US';

    recog.onresult = (event: any) => {
      let interim = '';
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const res = event.results[i];
        if (res.isFinal) {
          final += res[0].transcript;
        } else {
          interim += res[0].transcript;
        }
      }
      // Append only final results to baseInput
      if (final) {
        setBaseInput(prev => (prev ? prev + ' ' : '') + final.trim());
        setInterimTranscript('');
      } else {
        // update interim transcript separately (do not mutate baseInput)
        setInterimTranscript(interim);
      }
    };

    recog.onerror = (e: any) => {
      console.warn('SpeechRecognition error', e);
    };

    recognitionRef.current = recog;

    return () => {
      try {
        recog.onresult = null;
        recog.onerror = null;
        recog.stop && recog.stop();
      } catch (e) {
        // ignore
      }
      recognitionRef.current = null;
    };
  }, []);

  const toggleRecording = () => {
    const recog = recognitionRef.current;
    if (!recog) {
      alert('Live transcription is not supported by this browser. Try Chrome or Edge.');
      return;
    }

    if (!isRecording) {
      try {
        recog.start();
        setIsRecording(true);
      } catch (e) {
        console.warn('Could not start recognition:', e);
      }
    } else {
      try {
        recog.stop();
      } catch (e) {
        // ignore
      }
      setIsRecording(false);
      // when stopping, commit any remaining interim transcript into baseInput
      setBaseInput(prev => (prev ? prev + ' ' : '') + interimTranscript.trim());
      setInterimTranscript('');
    }
  };

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Consultation with Nurse Eva</h2>
      <div className="h-96 overflow-y-auto p-4 border border-gray-200 rounded-md bg-gray-50 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-lg max-w-lg ${
              msg.sender === 'user'
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="p-3 rounded-lg bg-gray-200 text-gray-800">
              <div className="animate-pulse flex space-x-2">
                <div className="rounded-full bg-gray-400 h-2 w-2"></div>
                <div className="rounded-full bg-gray-400 h-2 w-2"></div>
                <div className="rounded-full bg-gray-400 h-2 w-2"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4">
        <div className="flex">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-l-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Type your response... Or press the mic to speak"
            value={baseInput + interimTranscript}
            onChange={(e) => { setBaseInput(e.target.value); setInterimTranscript(''); }}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            disabled={isLoading}
          />

          <button
            onClick={toggleRecording}
            title={isRecording ? 'Stop recording' : 'Start voice transcription'}
            className={`px-4 py-3 border-t border-b border-gray-300 shadow-sm text-lg font-medium focus:outline-none ${isRecording ? 'bg-red-500 text-white' : 'bg-white text-gray-700'}`}
            disabled={isLoading}
          >
            {isRecording ? '■' : '🎤'}
          </button>

          <button
            onClick={handleSend}
            className="px-6 py-3 border border-transparent rounded-r-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
