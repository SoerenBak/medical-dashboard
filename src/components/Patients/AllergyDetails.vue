<template>
    <div :class="['p-4', error ? 'text-red-600' : 'text-gray-800 dark:text-gray-200']">
      <div v-if="error">
        <p>{{ error }}</p>
      </div>
      <div v-else-if="allergy">
        <h2 class="text-2xl font-bold">{{ allergy.AllergyName }}</h2>
        <p><strong>Date:</strong> {{ allergy.AllergyDate }}</p>
        <p><strong>Notes:</strong> {{ allergy.AllergyNotes }}</p>
  
        <!-- Handling Symptoms array -->
        <p><strong>Symptoms:</strong></p>
        <ul v-if="allergy.Symptoms && allergy.Symptoms.length">
          <li v-for="(symptom, index) in allergy.Symptoms" :key="index" class="ml-4 list-disc">
            {{ symptom }}
          </li>
        </ul>
        <p v-else>No symptoms available</p>
      </div>
      <div v-else>
        <p>Loading allergy details...</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { doc, getDoc, collection } from 'firebase/firestore'; // Correct Firebase imports
  import { projectFirestore } from '@/firebase/config';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const route = useRoute();
      const allergy = ref(null);
      const error = ref(null);
      const patientId = route.params.id;
      const allergyId = route.params.allergyId;
  
      const loadAllergy = async () => {
        try {
          // Firestore document reference to the specific allergy in sub-collection
          const allergyRef = doc(
            collection(projectFirestore, 'patients', patientId, 'Allergies'),
            allergyId
          );
          const res = await getDoc(allergyRef);
  
          if (!res.exists()) {
            throw Error('Allergy not found');
          }
  
          allergy.value = res.data();
        } catch (err) {
          error.value = err.message;
        }
      };
  
      onMounted(() => {
        loadAllergy();
      });
  
      return { allergy, error, patientId };
    }
  };
  </script>
  
  <style scoped>
  /* Additional styles can go here */
  </style>
  