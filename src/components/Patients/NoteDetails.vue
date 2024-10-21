<template>
    <div :class="['p-4', error ? 'text-red-600' : 'text-gray-800 dark:text-gray-200']">
      <div v-if="error">
        <p>{{ error }}</p>
      </div>
      <div v-else-if="note">
        <h2 class="text-2xl font-bold">{{ note.NoteName }}</h2>
        <p>Author: {{ note.NoteAuthor }}</p>
        <p>Date: {{ note.NoteDate }}</p>
        <p>Details: {{ note.NoteDetails }}</p>
      </div>
      <div v-else>
        <p>Loading note details...</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { doc, getDoc } from 'firebase/firestore';
  import { projectFirestore } from '@/firebase/config';
  
  export default {
    setup() {
      const route = useRoute();
      const note = ref(null);
      const error = ref(null);
  
      const loadNote = async () => {
        try {
          const noteId = route.params.noteId;
          const patientId = route.params.id;
          const docRef = doc(projectFirestore, 'patients', patientId, 'Notes', noteId);
          const res = await getDoc(docRef);
  
          if (!res.exists()) {
            throw Error('Note not found');
          }
  
          note.value = res.data();
        } catch (err) {
          error.value = err.message;
        }
      };
  
      onMounted(() => {
        loadNote();
      });
  
      return { note, error };
    }
  };
  </script>
  
  <style scoped>
  /* Add any styles needed for this component */
  </style>
  