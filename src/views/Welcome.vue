<template>
  <div class="welcome-container mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8">
    <div v-if="showLogin" class="text-center">
      <LoginForm @login="enterDashboard" />
      <p class="mt-4 text-gray-600 dark:text-gray-300">
        No account yet? 
        <span @click="showLogin = false" class="text-blue-500 hover:underline cursor-pointer dark:text-blue-400">Signup</span> instead
      </p>
    </div>
    <div v-else class="text-center">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Sign Up</h2>
      <SignupForm @login="enterDashboard" />
      <p class="mt-4 text-gray-600 dark:text-gray-300">
        Already registered? 
        <span @click="showLogin = true" class="text-blue-500 hover:underline cursor-pointer dark:text-blue-400">Log in</span> instead
      </p>
    </div>
  </div>
</template>

<script>
import SignupForm from '@/components/SignupForm.vue';
import LoginForm from '@/components/LoginForm.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: { SignupForm, LoginForm },
  setup() {
    const showLogin = ref(true);
    const router = useRouter();

    const enterDashboard = () => {
      router.push({ name: 'Dashboard' });
    };

    return { showLogin, enterDashboard };
  }
};
</script>

<style scoped>
.welcome-container {
  transition: background-color 0.3s ease, color 0.3s ease;
}

p {
  margin-top: 16px;
}

h2 {
  margin-bottom: 16px;
}
</style>
