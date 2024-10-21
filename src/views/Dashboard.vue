<template>
  <div class="p-4 pl-0">
    <h1 class="text-2xl font-semibold text-gray-800 dark:text-white mb-3">Dashboard</h1>
    <Navigation />


    <nav class="grid grid-cols-4 gap-4">
        <router-link to="/dashboard/patients" class="">Patients</router-link>
        <router-link to="/dashboard/add-patient" class="">Add New Patient</router-link>
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
