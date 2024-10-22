<template>
  <div class="p-4">
    <div v-if="error" class="text-red-600">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="patient" class="space-y-6">
      <!-- Patient Info Card -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
          {{ patient.FirstName }} {{ patient.LastName }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-gray-600 dark:text-gray-400"><strong>Gender:</strong> {{ patient.Gender }}</p>
            <p class="text-gray-600 dark:text-gray-400"><strong>Date of Birth:</strong> {{ patient.DateofBirth }}</p>
          </div>
          <div>
            <p class="text-gray-600 dark:text-gray-400"><strong>Blood Type:</strong> {{ patient.BloodType }}</p>
            <p class="text-gray-600 dark:text-gray-400"><strong>Phone:</strong> {{ patient.Phone }}</p>
            <p class="text-gray-600 dark:text-gray-400"><strong>Email:</strong> {{ patient.Email }}</p>
          </div>
        </div>
      </div>

      <!-- Notes and Allergies Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <!-- Notes Section -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Notes</h3>
            <button
              @click="goToAddNote"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Add Note
            </button>
          </div>
          <table class="min-w-full mt-4">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                <th class="px-4 py-2 text-left">Note Title</th>
                <th class="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="note in notes" :key="note.id" class="border-t">
                <td class="px-4 py-2 text-gray-600 dark:text-gray-300">{{ note.NoteName }}</td>
                <td class="px-4 py-2">
                  <router-link
                    :to="{ name: 'NoteDetails', params: { patientId: patientId, noteId: note.id } }"
                    class="text-blue-500 hover:underline"
                  >
                    View Note
                  </router-link>
                </td>
              </tr>
              <tr v-if="!notes.length">
                <td colspan="2" class="px-4 py-2 text-gray-600 dark:text-gray-400 text-center">No notes available</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Allergies Section -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Allergies</h3>
            <button
              @click="goToAddAllergy"
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
            >
              Add Allergy
            </button>
          </div>
          <table class="min-w-full mt-4">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                <th class="px-4 py-2 text-left">Allergy</th>
                <th class="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="allergy in allergies" :key="allergy.id" class="border-t">
                <td class="px-4 py-2 text-gray-600 dark:text-gray-300">{{ allergy.AllergyName }}</td>
                <td class="px-4 py-2">
                  <router-link
                    :to="{ name: 'AllergyDetails', params: { id: patientId, allergyId: allergy.id } }"
                    class="text-blue-500 hover:underline"
                  >
                    View Allergy
                  </router-link>
                </td>
              </tr>
              <tr v-if="!allergies.length">
                <td colspan="2" class="px-4 py-2 text-gray-600 dark:text-gray-400 text-center">No allergies available</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Loading patient details...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { projectFirestore } from '@/firebase/config';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const patient = ref(null);
    const error = ref(null);
    const notes = ref([]);
    const allergies = ref([]);
    const patientId = route.params.id;

    const loadPatient = async () => {
      try {
        const docRef = doc(projectFirestore, 'patients', patientId);
        const res = await getDoc(docRef);

        if (!res.exists()) {
          throw Error('Patient not found');
        }

        patient.value = res.data();

        // Load notes and allergies
        await loadNotes(patientId);
        await loadAllergies(patientId);
      } catch (err) {
        error.value = err.message;
      }
    };

    const loadNotes = async (patientId) => {
      try {
        const notesRef = collection(projectFirestore, 'patients', patientId, 'Notes');
        const notesSnapshot = await getDocs(notesRef);
        notes.value = notesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (err) {
        error.value = `Error fetching notes: ${err.message}`;
      }
    };

    const loadAllergies = async (patientId) => {
      try {
        const allergiesRef = collection(projectFirestore, 'patients', patientId, 'Allergies');
        const allergiesSnapshot = await getDocs(allergiesRef);
        allergies.value = allergiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (err) {
        error.value = `Error fetching allergies: ${err.message}`;
      }
    };

    // Navigate to Add Note page
    const goToAddNote = () => {
      router.push({ name: 'AddNote', params: { patientId: patientId } });
    };

    // Navigate to Add Allergy page
    const goToAddAllergy = () => {
      router.push({ name: 'AddAllergy', params: { patientId: patientId } });
    };

    onMounted(() => {
      loadPatient();
    });

    return { patient, error, notes, allergies, patientId, goToAddNote, goToAddAllergy };
  },
};
</script>

<style scoped>
/* Style for table borders */
table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
  border-bottom: 1px solid #e0e0e0;
}
</style>
