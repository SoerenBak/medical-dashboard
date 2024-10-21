<template>
  <div :class="['p-4', error ? 'text-red-600' : 'text-gray-800 dark:text-gray-200']">
    <div v-if="error">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="patient">
      <h2 class="text-2xl font-bold">{{ patient.FirstName }} {{ patient.LastName }}</h2>
      <p>Gender: {{ patient.Gender }}</p>
      <p>Date of Birth: {{ patient.DateofBirth }}</p>
      <p>Blood Type: {{ patient.BloodType }}</p>
      <p>Phone: {{ patient.Phone }}</p>
      <p>Email: {{ patient.Email }}</p>


      <h3 class="text-xl font-semibold mt-4">Notes</h3>
      <ul v-if="notes.length" class="list-disc ml-5">
        <li v-for="note in notes" :key="note.id">
          <router-link :to="{ name: 'NoteDetails', params: { patientId: patient.id, noteId: note.id } }" class="text-blue-600 hover:underline">
  <strong>{{ note.NoteName }}</strong>
</router-link>
        </li>
      </ul>
      <p v-else>No notes available</p>
     
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
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const patient = ref(null);
    const error = ref(null);
    const notes = ref([]);

    const loadPatient = async () => {
      try {
        const docRef = doc(projectFirestore, 'patients', route.params.id);
        const res = await getDoc(docRef);

        if (!res.exists()) {
          throw Error('Patient not found');
        }

        patient.value = res.data();

        // Load notes
        await loadNotes(docRef);
      } catch (err) {
        error.value = err.message;
      }
    };

    const loadNotes = async (patientDocRef) => {
      try {
        const notesRef = collection(patientDocRef, 'Notes');
        const notesSnapshot = await getDocs(notesRef);
        notes.value = notesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (err) {
        error.value = `Error fetching notes: ${err.message}`;
      }
    };

    onMounted(() => {
      loadPatient();
    });

    return { patient, error, notes };
  },
};
</script>

<style scoped>
/* Additional styles can go here */
</style>
