<template>
  <div class="p-4 pl-0">
    <h1 class="text-2xl font-semibold text-gray-800 dark:text-white mb-3">Dashboard</h1>
    <Navigation />


    <nav>
      <router-link to="/dashboard/patients" class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Patients</router-link>
      <router-link to="/dashboard/add-patient" class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add New Patient</router-link>

    </nav>

  </div>
</template>

<script>
import getUser from '@/composables/getUser';
import Navigation from '../components/Navigation.vue'
import { watch } from 'vue';
import { useRouter } from 'vue-router';

export default {
    components: { Navigation },
    setup() {
      const { user } = getUser()
      const router = useRouter()

      watch(user, () => {
        if(!user.value) {
          router.push({ name: 'Welcome'})
        }
      })
    }
}
</script>

<style scoped>
</style>
