<template>
  <div>
    <!-- Router link to patient details with ID as parameter -->
    <router-link :to="{ name: 'PatientDetails', params: { id: patient.id }}">
      <h3>{{ patient.FirstName }} {{ patient.LastName }}</h3>
    </router-link>

    <p>ID: {{ patient.id }}</p>
  </div>
</template>

<script>
export default {
  props: {
    patient: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
