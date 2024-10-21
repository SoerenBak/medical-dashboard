<template>
  <div class="p-4 pl-0">
    <h1 class="text-2xl font-semibold text-gray-800 dark:text-white mb-3">Dashboard</h1>
    <Navigation />
    <Boxes />
  </div>
</template>

<script>
import getUser from '@/composables/getUser';
import Navigation from '../components/Navigation.vue'
import Boxes from '../components/Dashboard/Boxes.vue'
import { watch } from 'vue';
import { useRouter } from 'vue-router';

export default {
    components: { Navigation, Boxes },
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
