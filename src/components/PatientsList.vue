<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white dark:bg-gray-800 border border-gray-300">
      <thead>
        <tr class="bg-gray-200 dark:bg-gray-700">
          <th class="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-200">ID</th>
          <th class="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-200">First Name</th>
          <th class="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-200">Last Name</th>
          <th class="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-200">Gender</th>
          <th class="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-200">Date of Birth</th>
          <th class="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-200">Blood Type</th>
          <th class="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-200">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="patients.length === 0">
          <td colspan="7" class="py-4 text-center text-gray-500">No patients available.</td>
        </tr>
        <tr
          v-for="patient in patients"
          :key="patient.id"
          class="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-900">
          <td class="py-2 px-4 border-b text-gray-700 dark:text-gray-300">{{ patient.id }}</td>
          <td class="py-2 px-4 border-b text-gray-700 dark:text-gray-300">{{ patient.FirstName }}</td>
          <td class="py-2 px-4 border-b text-gray-700 dark:text-gray-300">{{ patient.LastName }}</td>
          <td class="py-2 px-4 border-b text-gray-700 dark:text-gray-300">{{ patient.Gender }}</td>
          <td class="py-2 px-4 border-b text-gray-700 dark:text-gray-300">{{ patient.DateofBirth }}</td>
          <td class="py-2 px-4 border-b text-gray-700 dark:text-gray-300">{{ patient.BloodType }}</td>
          <td class="py-2 px-4 border-b text-gray-700 dark:text-gray-300">
            <router-link :to="{ name: 'PatientDetails', params: { id: patient.id }}" class="text-blue-500 hover:underline">View</router-link>
          </td>
        </tr>
      </tbody>
    </table>
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
/* You can add any additional styles here if needed */
</style>
