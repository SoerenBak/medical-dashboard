<template>
    <div class="p-4">
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">Add New Patient</h2>
      <form @submit.prevent="addPatient" class="mt-4 space-y-4">
        <div>
          <label class="block text-gray-700 dark:text-gray-300">First Name</label>
          <input 
            type="text" 
            v-model="patient.FirstName" 
            required 
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label class="block text-gray-700 dark:text-gray-300">Last Name</label>
          <input 
            type="text" 
            v-model="patient.LastName" 
            required 
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label class="block text-gray-700 dark:text-gray-300">Gender</label>
          <select 
            v-model="patient.Gender" 
            required 
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label class="block text-gray-700 dark:text-gray-300">Date of Birth</label>
          <input 
            type="date" 
            v-model="patient.DateofBirth" 
            required 
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label class="block text-gray-700 dark:text-gray-300">Blood Type</label>
          <select 
            v-model="patient.BloodType" 
            required 
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="" disabled>Select Blood Type</option>
            <option value="A RhD positive (A+)">A RhD positive (A+)</option>
            <option value="A RhD negative (A-)">A RhD negative (A-)</option>
            <option value="B RhD positive (B+)">B RhD positive (B+)</option>
            <option value="B RhD negative (B-)">B RhD negative (B-)</option>
            <option value="O RhD positive (O+)">O RhD positive (O+)</option>
            <option value="O RhD negative (O-)">O RhD negative (O-)</option>
            <option value="AB RhD positive (AB+)">AB RhD positive (AB+)</option>
            <option value="AB RhD negative (AB-)">AB RhD negative (AB-)</option>
          </select>
        </div>
        <div>
          <label class="block text-gray-700 dark:text-gray-300">Phone</label>
          <input 
            type="tel" 
            v-model="patient.Phone" 
            required 
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label class="block text-gray-700 dark:text-gray-300">Email</label>
          <input 
            type="email" 
            v-model="patient.Email" 
            required 
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <button 
          type="submit" 
          class="w-full mt-4 bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition duration-300 dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          Add Patient
        </button>
      </form>
      <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>
      <div v-if="success" class="mt-4 text-green-500">{{ success }}</div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { projectFirestore } from '@/firebase/config';
  import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
  
  export default {
    setup() {
      const patient = ref({
        FirstName: '',
        LastName: '',
        Gender: '',
        DateofBirth: '',
        BloodType: '',
        Phone: '',
        Email: '',
        Notes: [] // Initialize an empty array for notes
      });
      
      const error = ref('');
      const success = ref('');
  
      const addPatient = async () => {
        try {
          const patientsCollection = collection(projectFirestore, 'patients'); // Get a reference to the patients collection
          const docRef = await addDoc(patientsCollection, patient.value); // Add the patient document
          success.value = `Patient added successfully! ID: ${docRef.id}`;
          error.value = '';
          // Reset the form after submission
          patient.value = {
            FirstName: '',
            LastName: '',
            Gender: '',
            DateofBirth: '',
            BloodType: '',
            Phone: '',
            Email: '',
            Notes: []
          };
        } catch (err) {
          error.value = `Error adding patient: ${err.message}`;
          success.value = '';
        }
      };
  
      return { patient, addPatient, error, success };
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styles here if needed */
  </style>
  