<template>
    <div class="home">
      <div v-if="error">{{ error }}</div>
      <div v-if="patients.length" class="layout">
        <PatientsList :patients="patients" />
      </div>
      <div v-else>
        Loading...
      </div>
    </div>
  </template>
  
  <script>
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
  
  </style>
  