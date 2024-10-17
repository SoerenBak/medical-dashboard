<template>
  <div>
    <div class="container">
        <Navigation />
    </div>
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

<style>
  nav {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav p {
    margin: 2px auto;
    font-size: 16px;
    color: #444;
  }
  nav p.email {
    font-size: 14px;
    color: #999;
  }
</style>