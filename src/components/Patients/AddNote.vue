<template>
  <div class="p-4">
    <h2 class="text-xl font-semibold">Add Note</h2>
    <form @submit.prevent="submitNote" class="mt-4">
      <input 
        v-model="noteAuthor" 
        placeholder="Author" 
        required 
        class="border rounded p-2 mb-4 w-full"
      />
      <input 
        v-model="noteName" 
        placeholder="Note Name" 
        required 
        class="border rounded p-2 mb-4 w-full"
      />
      <textarea 
        v-model="noteDetails" 
        placeholder="Note Details" 
        required 
        class="border rounded p-2 mb-4 w-full"
      ></textarea>
      <button 
        type="submit" 
        class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Note
      </button>
      <p v-if="error" class="text-red-600">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { doc, collection, addDoc } from 'firebase/firestore';
import { projectFirestore } from '@/firebase/config'; // Ensure this path is correct
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute(); // Get the current route to access the patient ID
    const noteAuthor = ref('');
    const noteName = ref('');
    const noteDetails = ref('');
    const error = ref(null);

    const submitNote = async () => {
      try {
        const patientId = route.params.id; // Get the patient ID from the route
        const patientRef = doc(projectFirestore, 'patients', patientId); // Reference to the patient document
        const notesRef = collection(patientRef, 'Notes'); // Reference to the Notes subcollection

        // Prepare the note data
        const noteData = {
          NoteAuthor: noteAuthor.value,
          NoteDate: new Date().toISOString(), // Current date
          NoteDetails: noteDetails.value,
          NoteName: noteName.value,
        };

        // Add the note to the subcollection
        await addDoc(notesRef, noteData);
        console.log('Note added successfully!');

        // Clear the input fields after submission
        noteAuthor.value = '';
        noteName.value = '';
        noteDetails.value = '';
      } catch (err) {
        error.value = `Error adding note: ${err.message}`;
        console.error(error.value);
      }
    };

    return { noteAuthor, noteName, noteDetails, submitNote, error };
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
