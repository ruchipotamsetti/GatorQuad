# MediConnect 

**UF AI Days Hackathon Project**

## Problem Statement

Getting timely access to the *right* medical specialist is a critical challenge. Patients often face:
1.  **Long Wait Times:** Months-long delays even for urgent conditions.
2.  **Mismatch:** Seeing a general specialist when a sub-specialist is needed, wasting time and resources.
3.  **Insurance Barriers:** Difficulty finding specialists who accept their insurance.
4.  **Location Constraints:** Trouble finding nearby specialists or knowing if traveling further would yield a faster appointment.

This leads to delayed care, poorer health outcomes, and immense patient frustration. 

---

## Our Solution: MediConnect

MediConnect is an AI-powered application designed to intelligently connect patients with the most appropriate, available, in-network specialist, prioritizing urgent needs.

### How it Works

1.  **User Input:** The patient provides:
    * **Symptoms** (free text)
    * **Zip Code**
    * **Search Radius** (e.g., 30 miles, 100 miles)
    * **Insurance Plan**
2.  **AI Analysis:** An AI model analyzes the symptoms to determine:
    * **Urgency Level** (Emergency, Urgent, Routine)
    * **Required Specialist** (e.g., Neurologist)
    * **Likely Condition Keywords** (e.g., ["stroke", "TIA"])
3.  **Smart Matching Engine:** The system searches a **(currently mock)** database of specialists and performs:
    * **Location Filtering:** Finds doctors within the specified radius using geographic coordinates.
    * **Insurance Filtering:** Checks if the doctor accepts the patient's plan.
    * **Specialty Filtering:** Matches the required specialist type.
    * **Expertise Ranking:** Prioritizes doctors whose listed expertise keywords best match the AI-identified condition keywords.
4.  **Output Recommendation:** The app presents the user with:
    * **Best Case:** A ranked list of in-network specialists who match the condition, sorted by the soonest available *urgent* appointment slot and then by proximity.
    * **Alternative:** If no suitable urgent specialist slots are found, recommends Urgent Care based on the AI's triage.
    * **Emergency:** If symptoms are critical, directs the user to call 911 or go to the ER. 

---

## Key Features

* **AI-Powered Triage:** Assesses symptom urgency using Natural Language Processing.
* **Sub-Specialty Matching:** Goes beyond basic specialty to match based on likely condition.
* **Insurance & Location Aware:** Filters results based on practical constraints.
* **Urgent Slot Prioritization:** Focuses on finding and ranking hidden "fast-pass" availability.
* **Cross-System Concept:** Designed as an aggregator to search across different (mock) clinics/hospitals.

---

## Technology Stack (Hackathon Prototype)

* **Language:** Python
* **Core Libraries:** `pgeocode` (Zip to Lat/Lon), `geopy` (Distance Calc), LLM API (Gemini for Triage)
* **Data:** Mock JSON files for specialist and urgent care information.

---

## HIPAA Considerations

This prototype uses **mock data** and demonstrates the core AI logic. A real-world, production version of this application would require strict adherence to HIPAA regulations, including:
* Using HIPAA-compliant hosting and AI services (with BAAs).
* Implementing robust data encryption, access controls, and audit logging.
* Handling all user-provided symptom information as Protected Health Information (PHI).

Our hackathon build **does not** handle real PHI and uses a non-compliant AI API for demonstration purposes only.

---

## Hackathon Scope

This project is a **Proof of Concept (POC)** built within the ~24-hour timeframe of the UF AI Days Hackathon. The focus is on demonstrating the feasibility and value of the AI-driven triage and precision matching engine using a simulated environment. The primary challenge for real-world deployment (beyond the scope of this hackathon) would be integrating with live scheduling systems across various healthcare providers.
