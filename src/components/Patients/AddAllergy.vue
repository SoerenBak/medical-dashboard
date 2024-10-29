<template>
  <div class="add-allergy">
    <h2 class="text-2xl font-bold mb-4">Add Allergy</h2>
    <form @submit.prevent="submitAllergy" class="space-y-4">
      <div>
        <label for="allergyName" class="block text-sm font-medium text-gray-700">Allergy Name</label>
        <input
          type="text"
          id="allergyName"
          v-model="allergyName"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div>
        <label for="allergyNotes" class="block text-sm font-medium text-gray-700">Allergy Notes</label>
        <textarea
          id="allergyNotes"
          v-model="allergyNotes"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        ></textarea>
      </div>

      <div>
        <label for="allergyDate" class="block text-sm font-medium text-gray-700">Allergy Date</label>
        <input
          type="date"
          id="allergyDate"
          v-model="allergyDate"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div>
        <label for="symptoms" class="block text-sm font-medium text-gray-700">Symptoms</label>
        <input
          type="text"
          id="symptoms"
          v-model="symptoms"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <button
        type="submit"
        class="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
      >
        Add Allergy
      </button>
    </form>
    <p v-if="errorMessage" class="text-red-600 mt-4">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getFirestore, doc, collection, addDoc } from 'firebase/firestore';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    
    const allergyName = ref('');
    const allergyNotes = ref('');
    const allergyDate = ref('');
    const symptoms = ref('');
    const errorMessage = ref('');

    const db = getFirestore(); // Initialize Firestore instance

    const submitAllergy = async () => {
      errorMessage.value = ''; // Reset any previous error messages
      const allergyData = {
        AllergyName: allergyName.value,
        AllergyNotes: allergyNotes.value,
        AllergyDate: allergyDate.value,
        Symptoms: symptoms.value,
      };

      try {
        const patientRef = doc(db, 'patients', route.params.id); // Reference to patient document
        const allergiesRef = collection(patientRef, 'Allergies'); // Reference to allergies sub-collection

        await addDoc(allergiesRef, allergyData); // Add new document to Allergies collection

        // Clear the form fields after submission
        allergyName.value = '';
        allergyNotes.value = '';
        allergyDate.value = '';
        symptoms.value = '';
        
        // Navigate back to patient details after adding the allergy
        router.push({ name: 'PatientDetails', params: { id: route.params.id } });
      } catch (error) {
        errorMessage.value = 'Error adding allergy: ' + error.message;
      }
    };

    return {
      allergyName,
      allergyNotes,
      allergyDate,
      symptoms,
      errorMessage,
      submitAllergy
    };
  },
};
</script>

<style scoped>
.add-allergy {
  padding: 1rem;
}
</style>
