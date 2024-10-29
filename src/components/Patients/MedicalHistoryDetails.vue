<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Medical History Details</h2>

    <!-- Error message if there's an issue loading the data -->
    <div v-if="error" class="text-red-600 mb-4">
      <p>{{ error }}</p>
    </div>

    <!-- Details section when data is available -->
    <div v-else-if="medicalHistory">
      <div class="mb-4">
        <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">{{ medicalHistory.MedicalName }}</h3>
        <p class="text-gray-600 dark:text-gray-400 mt-1">
          <strong>Date:</strong> {{ medicalHistory.MedicalDate }}
        </p>
      </div>
      <div class="border-t border-gray-300 dark:border-gray-700 mt-4 pt-4">
        <p class="text-gray-800 dark:text-gray-300"><strong>Details:</strong></p>
        <p class="text-gray-600 dark:text-gray-400 mt-2">{{ medicalHistory.MedicalDetails }}</p>
      </div>
    </div>

    <!-- Loading state if data hasn't yet loaded -->
    <div v-else class="text-gray-600 dark:text-gray-400">
      <p>Loading medical history details...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { doc, getDoc } from 'firebase/firestore';
import { projectFirestore } from '@/firebase/config';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const medicalHistory = ref(null);
    const error = ref(null);
    const patientId = route.params.patientId;
    const historyId = route.params.historyId;

    const loadMedicalHistory = async () => {
      try {
        const historyRef = doc(projectFirestore, 'patients', patientId, 'MedicalHistory', historyId);
        const res = await getDoc(historyRef);

        if (!res.exists()) {
          throw Error('Medical history entry not found');
        }

        medicalHistory.value = res.data();
      } catch (err) {
        error.value = err.message;
      }
    };

    onMounted(() => {
      loadMedicalHistory();
    });

    return { medicalHistory, error };
  }
};
</script>

<style scoped>
/* Add padding, responsive text sizing, and border styling consistent with other views */
.p-6 {
  padding: 1.5rem;
}
.text-gray-800 {
  color: #2d3748;
}
.text-gray-600 {
  color: #718096;
}
.dark\:text-gray-200 {
  color: #edf2f7;
}
.dark\:text-gray-400 {
  color: #a0aec0;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.border-t {
  border-top-width: 1px;
}
</style>
