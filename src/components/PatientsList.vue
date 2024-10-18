<template>
  <div>
    <div v-if="patients && patients.length">
      <div v-for="patient in patients" :key="patient.id" class="patient-item">
        <SinglePatient :patient="patient"/>
      </div>
    </div>
    <div v-else>
      No patients available.
    </div>
  </div>
</template>

<script>
import SinglePatient from './SinglePatient.vue';

export default {
  components: { SinglePatient },
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
