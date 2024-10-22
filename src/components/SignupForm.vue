<template>
  <div class="signup-container bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <input 
        type="text" 
        required 
        placeholder="Display name" 
        v-model="displayName" 
        class="input-field"
      />
      <input 
        type="email" 
        required 
        placeholder="Email" 
        v-model="email" 
        class="input-field"
      />
      <input 
        type="password" 
        required 
        placeholder="Password" 
        v-model="password" 
        class="input-field"
      />
      <div class="error text-red-500 dark:text-red-400" v-if="error">
        {{ error }}
      </div>
      <button class="submit-btn">Sign up</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import useSignup from '../composables/useSignup';

export default {
  setup(props, context) {
    const displayName = ref('');
    const email = ref('');
    const password = ref('');

    const { error, signup } = useSignup();

    const handleSubmit = async () => {
      await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        context.emit('signup');
      }
    };

    return { displayName, email, password, handleSubmit, error };
  }
};
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 0 auto;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.input-field {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: #f9fafb;
  color: #374151;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.input-field:focus {
  outline: none;
  border-color: #3b82f6;
}

.dark .input-field {
  background-color: #374151;
  color: #f9fafb;
  border-color: #4b5563;
}

.error {
  margin-top: 8px;
}

.submit-btn {
  width: 100%;
  background-color: #3b82f6;
  color: white;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #2563eb;
}

.dark .submit-btn {
  background-color: #2563eb;
}

.dark .submit-btn:hover {
  background-color: #374151;
}
</style>
