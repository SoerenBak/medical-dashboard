<template>
    <div>
      <div v-if="patients && patients.length">
        <div v-for="patient in patients" :key="patient.id" class="patient-item">
          <h3>{{ patient.FirstName }} {{ patient.LastName }}</h3>
          <p>Gender: {{ patient.Gender }}</p>
          <p>Date of Birth: {{ patient.DateofBirth }}</p>
          <p>Blood Type: {{ patient.BloodType }}</p>
        </div>
      </div>
      <div v-else>
        No patients available.
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      patients: {
        type: Array,
        default: () => []
      }
    }
  }
  </script>
  
  <style>
  .patient-item {
    padding: 10px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
  }
  </style>
  