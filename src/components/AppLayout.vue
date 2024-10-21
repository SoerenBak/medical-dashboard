<template>
    <button
      @click="toggleDarkMode"
      class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
    </button>
    
    <div :class="['app-container', isDarkMode ? 'bg-gray-800' : 'bg-gray-100']">
      <div class="app-window bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 w-[90vw] md:w-[70vw] lg:w-[70vw] flex flex-col">
        <header class="flex items-center mb-4 gap-2">
          <button 
            @click="goBack" 
            class="p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
            :class="isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'"
          >
            <span class="material-icons">arrow_back</span>
          </button>
          <!-- <button 
            @click="goForward" 
            class="p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
            :class="isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'"
          >
            <span class="material-icons">arrow_forward</span>
          </button> -->
        </header>
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isDarkMode: false,
      };
    },
    mounted() {
      const userPreference = localStorage.getItem('darkMode');
      if (userPreference) {
        this.isDarkMode = JSON.parse(userPreference);
        document.documentElement.classList.toggle('dark', this.isDarkMode);
      }
    },
    methods: {
      toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode));
        document.documentElement.classList.toggle('dark', this.isDarkMode);
      },
      goBack() {
        this.$router.go(-1);
      },
      goForward() {
        this.$router.go(1);
      }
    },
  };
  </script>
  
  <style scoped>
  .app-container {
    @apply flex items-center justify-center min-h-screen;
  }
  </style>
  