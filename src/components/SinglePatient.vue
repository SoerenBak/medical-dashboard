<template>
  <div class="post">
    <!-- Router link to patient details with ID as parameter -->
    <router-link :to="{ name: 'PatientDetails', params: { id: patient.id }}">
      <h3>{{ patient.FirstName }} {{ patient.LastName }}</h3>
    </router-link>
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
.post h3 {
  display: inline-block;
  position: relative;
  font-size: 26px;
  color: white;
  max-width: 400px;
}
</style>
