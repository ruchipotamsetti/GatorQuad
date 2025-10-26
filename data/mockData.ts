
import type { Specialist, UrgentCareCenter } from '../types';

export const specialistsDB: Specialist[] = [
  {
    id: 1,
    name: "Dr. Eleanor Vance",
    specialty: "Neurology",
    photo: "https://picsum.photos/seed/drevance/200",
    bio: "Dr. Vance is a board-certified neurologist with over 15 years of experience in treating complex neurological disorders.",
    location: { latitude: 28.5383, longitude: -81.3792, address: "123 Brainiac Ave, Orlando, FL" },
    acceptedInsurance: ["Florida Blue", "Aetna", "Cigna"],
    expertise: ["stroke", "headache", "migraine", "epilepsy", "TIA"],
    urgentAvailability: "2024-08-10",
  },
  {
    id: 2,
    name: "Dr. Ben Carter",
    specialty: "Cardiology",
    photo: "https://picsum.photos/seed/drcarter/200",
    bio: "Dr. Carter is a leading cardiologist known for his expertise in heart rhythm disorders and preventive cardiology.",
    location: { latitude: 28.5480, longitude: -81.3842, address: "456 Heartbeat Rd, Orlando, FL" },
    acceptedInsurance: ["Aetna", "UnitedHealthcare"],
    expertise: ["arrhythmia", "hypertension", "heart failure", "chest pain"],
    urgentAvailability: "2024-08-12",
  },
  {
    id: 3,
    name: "Dr. Olivia Chen",
    specialty: "Neurology",
    photo: "https://picsum.photos/seed/drchen/200",
    bio: "Dr. Chen specializes in the diagnosis and treatment of movement disorders, including Parkinson's disease.",
    location: { latitude: 28.6139, longitude: -81.2001, address: "789 Nerve Center, Oviedo, FL" },
    acceptedInsurance: ["Florida Blue", "UnitedHealthcare", "Cigna"],
    expertise: ["headache", "migraine", "multiple sclerosis"],
    urgentAvailability: null,
  },
  {
    id: 4,
    name: "Dr. Marcus Thorne",
    specialty: "Cardiology",
    photo: "https://picsum.photos/seed/drthorne/200",
    bio: "Dr. Thorne is a specialist in interventional cardiology, focusing on minimally invasive heart procedures.",
    location: { latitude: 28.4296, longitude: -81.4791, address: "101 Pulse Pl, Kissimmee, FL" },
    acceptedInsurance: ["Florida Blue", "Aetna"],
    expertise: ["arrhythmia", "atrial fibrillation", "pacemakers"],
    urgentAvailability: null,
  },
  {
    id: 5,
    name: "Dr. Sofia Rodriguez",
    specialty: "Dermatology",
    photo: "https://picsum.photos/seed/drrodriguez/200",
    bio: "Dr. Rodriguez is a renowned dermatologist with a focus on cosmetic dermatology and skin cancer prevention.",
    location: { latitude: 28.5709, longitude: -81.3792, address: "222 Skin Deep Dr, Winter Park, FL" },
    acceptedInsurance: ["Cigna", "UnitedHealthcare"],
    expertise: ["acne", "eczema", "skin cancer screening"],
    urgentAvailability: "2024-08-15",
  },
  {
    id: 6,
    name: "Dr. Liam Goldberg",
    specialty: "Gastroenterology",
    photo: "https://picsum.photos/seed/drgoldberg/200",
    bio: "Dr. Goldberg is a leading expert in the treatment of inflammatory bowel disease and other digestive disorders.",
    location: { latitude: 28.5391, longitude: -81.3739, address: "333 Gut Feeling Gt, Orlando, FL" },
    acceptedInsurance: ["Florida Blue", "Aetna", "Cigna"],
    expertise: ["IBS", "Crohn's disease", "acid reflux"],
    urgentAvailability: null,
  },
  {
    id: 7,
    name: "Dr. Chloe Davis",
    specialty: "Cardiology",
    photo: "https://picsum.photos/seed/drdavis/200",
    bio: "Dr. Davis is a preventive cardiologist who helps patients manage their cardiovascular health through lifestyle changes.",
    location: { latitude: 28.6500, longitude: -81.3359, address: "555 Cardio Care Ct, Lake Mary, FL" },
    acceptedInsurance: ["Florida Blue", "Cigna"],
    expertise: ["hypertension", "cholesterol management", "preventive cardiology"],
    urgentAvailability: "2024-08-11",
  },
  {
    id: 8,
    name: "Dr. Ethan Martinez",
    specialty: "Neurology",
    photo: "https://picsum.photos/seed/drmartinez/200",
    bio: "Dr. Martinez has a special interest in neurodegenerative diseases and is actively involved in clinical research.",
    location: { latitude: 28.3772, longitude: -81.5707, address: "444 Synapse Street, Lake Buena Vista, FL" },
    acceptedInsurance: ["Aetna", "UnitedHealthcare"],
    expertise: ["stroke", "dementia", "Parkinson's disease"],
    urgentAvailability: null,
  },
  {
    id: 9,
    name: "Dr. Ava Nguyen",
    specialty: "Orthopedics",
    photo: "https://picsum.photos/seed/drnguyen/200",
    bio: "Dr. Nguyen is a board-certified orthopedic surgeon specializing in sports medicine and minimally invasive surgery.",
    location: { latitude: 28.5516, longitude: -81.4572, address: "666 Bone Joint Blvd, Ocoee, FL" },
    acceptedInsurance: ["Florida Blue", "Aetna"],
    expertise: ["knee pain", "sports injuries", "joint replacement"],
    urgentAvailability: "2024-08-18",
  },
  {
    id: 10,
    name: "Dr. Noah Patel",
    specialty: "Endocrinology",
    photo: "https://picsum.photos/seed/drpatel/200",
    bio: "Dr. Patel is a leading endocrinologist with a focus on diabetes management and thyroid disorders.",
    location: { latitude: 28.6122, longitude: -81.3659, address: "777 Hormone Hwy, Altamonte Springs, FL" },
    acceptedInsurance: ["Cigna", "UnitedHealthcare"],
    expertise: ["diabetes", "thyroid disorders", "metabolism"],
    urgentAvailability: null,
  },
  {
    id: 11,
    name: "Dr. Isabella Kim",
    specialty: "Cardiology",
    photo: "https://picsum.photos/seed/drkim/200",
    bio: "Dr. Kim is a non-invasive cardiologist with expertise in cardiac imaging and heart failure management.",
    location: { latitude: 28.5383, longitude: -81.3792, address: "888 Aorta Ave, Orlando, FL" },
    acceptedInsurance: ["Florida Blue", "UnitedHealthcare"],
    expertise: ["chest pain", "coronary artery disease", "echocardiography"],
    urgentAvailability: null,
  },
  {
    id: 12,
    name: "Dr. James O'Connell",
    specialty: "Neurology",
    photo: "https://picsum.photos/seed/droconnell/200",
    bio: "Dr. O'Connell is a neurologist with a special interest in peripheral neuropathy and neuromuscular disorders.",
    location: { latitude: 28.4711, longitude: -81.4669, address: "999 Cerebellum Circle, Dr. Phillips, FL" },
    acceptedInsurance: ["Florida Blue", "Cigna"],
    expertise: ["TIA", "headache", "neuropathy"],
    urgentAvailability: "2024-08-14",
  }
];

export const urgentCareDB: UrgentCareCenter[] = [
  {
    id: 1,
    name: "QuickCare Orlando",
    location: { latitude: 28.5380, longitude: -81.3785, address: "100 Downtown Care, Orlando, FL" },
    hours: "8am - 8pm Daily",
  },
  {
    id: 2,
    name: "FastHeal Winter Park",
    location: { latitude: 28.5973, longitude: -81.3484, address: "200 WP Express, Winter Park, FL" },
    hours: "9am - 9pm Daily",
  },
  {
    id: 3,
    name: "Immediate Health Kissimmee",
    location: { latitude: 28.3039, longitude: -81.4442, address: "300 Southside Med, Kissimmee, FL" },
    hours: "7am - 10pm Daily",
  },
];

export const insuranceOptions = ["Florida Blue", "Aetna", "Cigna", "UnitedHealthcare"];

export const doctorsDB: any[] = [
  {
    id: 1,
    name: "Dr. Eleanor Vance",
    username: "drevance",
    password: "password123"
  },
  {
    id: 2,
    name: "Dr. Ben Carter",
    username: "drcarter",
    password: "password123"
  }
];

export const patientRequestsDB: any[] = [
  {
    id: 1,
    patient: {
      name: "John Smith",
      age: 45,
      gender: "Male",
      insurance: "Florida Blue"
    },
    symptoms: "I have a sudden, severe headache on one side of my head with sensitivity to light.",
    conversation: [
      { sender: "ai", text: "Hello! I'm Nurse Eva. I understand you have a severe headache. Can you tell me on a scale of 1 to 10, how would you rate the pain?" },
      { sender: "user", text: "It's a 9 out of 10. It's really bad." },
      { sender: "ai", text: "I see. Are you experiencing any other symptoms, like nausea, vomiting, or changes in your vision?" },
      { sender: "user", text: "I feel really nauseous and the lights are making it worse." },
      { sender: "ai", text: "Have you ever had a headache like this before?" },
      { sender: "user", text: "No, never this bad." }
    ],
    triageResult: {
      urgency: "URGENT",
      specialist: "Neurology",
      keywords: ["headache", "migraine", "nausea"],
      confidenceScore: 0.9,
      recommendation: "Based on the severity of your headache and sensitivity to light, it is highly recommended to seek urgent medical attention from a neurologist."
    },
    status: "Pending",
    requestDate: "2025-10-26T10:00:00.000Z",
    doctorId: 1
  },
  {
    id: 2,
    patient: {
      name: "Jane Doe",
      age: 32,
      gender: "Female",
      insurance: "Aetna"
    },
    symptoms: "I've been having heart palpitations and feel dizzy when I stand up.",
    conversation: [
      { sender: "ai", text: "Hello, I'm Nurse Eva. I understand you're experiencing heart palpitations and dizziness. How often are the palpitations occurring?" },
      { sender: "user", text: "A few times a day for the past week." },
      { sender: "ai", text: "And when you feel dizzy, does the room spin, or do you feel like you're about to faint?" },
      { sender: "user", text: "It's more of a lightheaded feeling, like I might faint." },
      { sender: "ai", text: "Are you taking any medications or have any known heart conditions?" },
      { sender: "user", text: "No, I'm not on any medications." }
    ],
    triageResult: {
      urgency: "URGENT",
      specialist: "Cardiology",
      keywords: ["palpitations", "dizziness", "lightheadedness"],
      confidenceScore: 0.85,
      recommendation: "Heart palpitations accompanied by dizziness should be evaluated by a cardiologist to rule out any underlying issues."
    },
    status: "Pending",
    requestDate: "2025-10-26T11:30:00.000Z",
    doctorId: 2
  },
  {
    id: 3,
    patient: {
      name: "Peter Jones",
      age: 62,
      gender: "Male",
      insurance: "UnitedHealthcare"
    },
    symptoms: "I've been having chest pains, especially when I walk up stairs.",
    conversation: [
      { sender: "ai", text: "Hello, I'm Nurse Eva. I'm sorry to hear you're having chest pains. Can you describe the pain? Is it sharp, dull, or a pressure?" },
      { sender: "user", text: "It feels like a heavy pressure, right in the center of my chest." },
      { sender: "ai", text: "And does the pain radiate to your arm, jaw, or back?" },
      { sender: "user", text: "Sometimes I feel it in my left shoulder." },
      { sender: "ai", text: "How long does the pain typically last?" },
      { sender: "user", text: "A few minutes, and it gets better when I rest." }
    ],
    triageResult: {
      urgency: "URGENT",
      specialist: "Cardiology",
      keywords: ["chest pain", "pressure", "arrhythmia"],
      confidenceScore: 0.98,
      recommendation: "Chest pain that occurs with exertion is a serious symptom and requires an urgent evaluation by a cardiologist."
    },
    status: "Pending",
    requestDate: "2025-10-26T12:00:00.000Z",
    doctorId: 2
  },
  {
    id: 4,
    patient: {
      name: "Mary Williams",
      age: 55,
      gender: "Female",
      insurance: "Cigna"
    },
    symptoms: "I have a persistent cough and shortness of breath.",
    conversation: [
      { sender: "ai", text: "Hello, I'm Nurse Eva. I understand you have a persistent cough. How long have you had it?" },
      { sender: "user", text: "For about a month now." },
      { sender: "ai", text: "Is the cough dry, or are you coughing up any phlegm?" },
      { sender: "user", text: "It's mostly dry, but sometimes there's a little white phlegm." },
      { sender: "ai", text: "And what about the shortness of breath? When do you notice it most?" },
      { sender: "user", text: "Mostly when I'm walking or doing chores around the house." }
    ],
    triageResult: {
      urgency: "ROUTINE",
      specialist: "Cardiology",
      keywords: ["cough", "shortness of breath", "exertion"],
      confidenceScore: 0.7,
      recommendation: "A persistent cough and shortness of breath with exertion can sometimes be related to a heart condition and should be evaluated by a cardiologist."
    },
    status: "Pending",
    requestDate: "2025-10-26T13:00:00.000Z",
    doctorId: 0
  },
  {
    id: 5,
    patient: {
      name: "David Brown",
      age: 28,
      gender: "Male",
      insurance: "Florida Blue"
    },
    symptoms: "I've been having trouble with my memory and finding the right words.",
    conversation: [
      { sender: "ai", text: "Hello, I'm Nurse Eva. I understand you're having some trouble with your memory. Can you give me an example of what's been happening?" },
      { sender: "user", text: "I keep forgetting names, and sometimes I can't think of a common word when I'm talking." },
      { sender: "ai", text: "How long has this been going on?" },
      { sender: "user", text: "For a few months, but it seems to be getting worse." },
      { sender: "ai", text: "Are you having any other symptoms, like headaches or vision problems?" },
      { sender: "user", text: "No, nothing like that." }
    ],
    triageResult: {
      urgency: "ROUTINE",
      specialist: "Neurology",
      keywords: ["memory loss", "aphasia", "cognitive decline"],
      confidenceScore: 0.8,
      recommendation: "Memory issues and difficulty with words, especially when worsening over time, should be evaluated by a neurologist to determine the cause."
    },
    status: "Pending",
    requestDate: "2025-10-26T14:00:00.000Z",
    doctorId: 0
  },
  {
    id: 6,
    patient: {
      name: "Susan Miller",
      age: 68,
      gender: "Female",
      insurance: "Aetna"
    },
    symptoms: "I've been feeling very dizzy and have had a couple of fainting spells.",
    conversation: [
      { sender: "ai", text: "Hello, I'm Nurse Eva. Dizziness and fainting can be very concerning. Can you tell me more about what happens when you feel dizzy?" },
      { sender: "user", text: "The whole room starts to spin, and I feel like I'm going to fall over." },
      { sender: "ai", text: "And what happens before you faint? Do you get any warning signs?" },
      { sender: "user", text: "I feel very lightheaded and my heart starts to race." },
      { sender: "ai", text: "Have you hit your head or had any injuries when you fainted?" },
      { sender: "user", text: "No, I've been able to sit down before I fall." }
    ],
    triageResult: {
      urgency: "URGENT",
      specialist: "Neurology",
      keywords: ["dizziness", "syncope", "fainting", "vertigo"],
      confidenceScore: 0.9,
      recommendation: "Dizziness, vertigo, and fainting spells require an urgent neurological evaluation to determine the underlying cause."
    },
    status: "Pending",
    requestDate: "2025-10-26T15:00:00.000Z",
    doctorId: 1
  }
];
