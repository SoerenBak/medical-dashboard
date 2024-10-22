<template>
  <div class="login-form-container max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg">
    <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Login</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input 
          type="email" 
          id="email" 
          required 
          placeholder="Enter your email" 
          v-model="email" 
          class="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        >
      </div>
      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
        <input 
          type="password" 
          id="password" 
          required 
          placeholder="Enter your password" 
          v-model="password" 
          class="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        >
      </div>
      <div v-if="error" class="error-message text-red-600 dark:text-red-400 mb-4">{{ error }}</div>
      <button 
        type="submit" 
        class="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      >
        Log in
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import useLogin from '../composables/useLogin';

export default {
  setup(props, context) {
    const email = ref('');
    const password = ref('');

    const { error, login } = useLogin();

    const handleSubmit = async () => {
      await login(email.value, password.value);
      if (!error.value) {
        context.emit('login');
      }
    };

    return { email, password, handleSubmit, error };
  }
};
</script>

<style scoped>
.login-form-container {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.error-message {
  font-size: 0.875rem;
}

</style>
