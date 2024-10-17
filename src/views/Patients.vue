<template>
    <div class="home">
      <div v-if="error">{{ error }}</div>
      <div v-if="patients.length" class="layout">
        <PatientsList :patients="patients" />
      </div>
      <div v-else>
        Loading
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import getPatients from '../composables/getPatients'
  import PatientsList from '@/components/PatientsList.vue'
  
  export default {
    name: 'Home',
    components: { PatientsList },
    setup() {
      const { patients, error, load } = getPatients()
      load()
  
      return { patients, error }
    },
  }
  </script>
  
  <style>
  .home {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
  }
  .layout {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 20px;
  }
  </style>
  