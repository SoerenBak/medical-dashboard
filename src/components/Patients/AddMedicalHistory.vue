<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Add Medical History</h2>

    <div v-if="error" class="text-red-600 mb-4">
      <p>{{ error }}</p>
    </div>

    <form @submit.prevent="submitForm" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div class="mb-4">
        <label for="medicalName" class="block text-gray-700 dark:text-gray-300 mb-2">Medical Name</label>
        <input
          v-model="medicalName"
          type="text"
          id="medicalName"
          required
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div class="mb-4">
        <label for="medicalDate" class="block text-gray-700 dark:text-gray-300 mb-2">Date</label>
        <input
          v-model="medicalDate"
          type="date"
          id="medicalDate"
          required
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div class="mb-4">
        <label for="medicalDetails" class="block text-gray-700 dark:text-gray-300 mb-2">Details</label>
        <textarea
          v-model="medicalDetails"
          id="medicalDetails"
          rows="4"
          required
          class="w-full p-2 border border-gray-300 rounded"
        ></textarea>
      </div>

      <button
        type="submit"
        class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200"
      >
        Add Medical History
      </button>
    </form>

    <div v-if="success" class="mt-4 text-green-600">
      <p>{{ success }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { collection, addDoc } from 'firebase/firestore';
import { projectFirestore } from '@/firebase/config';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const medicalName = ref('');
    const medicalDate = ref('');
    const medicalDetails = ref('');
    const error = ref(null);
    const success = ref(null);
    const route = useRoute();
    const router = useRouter();
    const patientId = route.params.patientId;

    const submitForm = async () => {
      try {
        // Reference to the 'MedicalHistory' collection for the patient
        const historyCollectionRef = collection(projectFirestore, 'patients', patientId, 'MedicalHistory');
        
        // Add a new document to the collection
        await addDoc(historyCollectionRef, {
          MedicalName: medicalName.value,
          MedicalDate: medicalDate.value,
          MedicalDetails: medicalDetails.value,
        });

        success.value = 'Medical history added successfully!';
        clearForm();
      } catch (err) {
        error.value = `Error adding medical history: ${err.message}`;
      }
    };

    const clearForm = () => {
      medicalName.value = '';
      medicalDate.value = '';
      medicalDetails.value = '';
      success.value = null;
    };

    return { medicalName, medicalDate, medicalDetails, error, success, submitForm };
  }
};
</script>

<style scoped>
/* Add any specific styles for the form here */
</style>
