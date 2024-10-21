<template>
  <nav v-if="user" class="flex items-center justify-between p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow">
    <div>
      <p class="text-lg font-semibold text-gray-800 dark:text-white">
        Hey there {{ user.displayName }}
      </p>
      <p class="email text-gray-600 dark:text-gray-400">
        Currently logged in as: {{ user.email }}
      </p>
    </div>
    <button 
      @click="handleClick" 
      class="mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-300 dark:bg-blue-700 dark:hover:bg-blue-600"
    >
      Log out
    </button>
  </nav>
</template>

<script>
import useLogout from '@/composables/useLogout';
import getUser from '@/composables/getUser';

export default {
  setup() {
    const { logout, error } = useLogout();
    const { user } = getUser();

    const handleClick = async () => {
      await logout();
      if (!error.value) {
        console.log('User logged out');
      }
    };

    return { handleClick, user };
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
