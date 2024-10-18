<template>
    <div v-if="error">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="patient">
      <h2>{{ patient.FirstName }} {{ patient.LastName }}</h2>
      <p>Gender: {{ patient.Gender }}</p>
      <p>Date of Birth: {{ patient.DateofBirth }}</p>
      <p>Blood Type: {{ patient.BloodType }}</p>
      <p>Phone: {{ patient.Phone }}</p>
      <p>Email: {{ patient.Email }}</p>
  
      <!-- Display patient notes -->
      <h3>Notes</h3>
      <ul v-if="patient.Notes && patient.Notes.length">
        <li v-for="(note, index) in patient.Notes" :key="index">{{ note }}</li>
      </ul>
      <p v-else>No notes available</p>
    </div>
    <div v-else>
      <p>Loading patient details...</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { doc, getDoc } from 'firebase/firestore'
  import { projectFirestore } from '@/firebase/config'
  import { useRoute } from 'vue-router'
  
  export default {
    setup() {
      const route = useRoute()
      const patient = ref(null)
      const error = ref(null)
  
      const loadPatient = async () => {
        try {
          const docRef = doc(projectFirestore, 'patients', route.params.id)
          const res = await getDoc(docRef)
  
          if (!res.exists()) {
            throw Error('Patient not found')
          }
  
          patient.value = res.data()
        } catch (err) {
          error.value = err.message
        }
      }
  
      onMounted(() => {
        loadPatient()
      })
  
      return { patient, error }
    }
  }
  </script>
  