<template>
  <div class="absolute top-4 right-4">
    <button
      @click="toggleDarkMode"
      class="toggle-dark-mode p-2 bg-blue-500 text-white rounded-full flex items-center justify-center transition-all duration-500 ease-in-out transform hover:scale-105 hover:bg-blue-600"
    >
      <span class="material-icons text-2xl transition-transform duration-500 ease-in-out" :class="isDarkMode ? 'rotate-180' : 'rotate-0'">
        {{ isDarkMode ? 'dark_mode' : 'light_mode' }}
      </span>
    </button>
  </div>
  
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

.toggle-dark-mode {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.toggle-dark-mode:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.material-icons {
  color: white;
  font-size: 24px;
}

.app-window {
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}
</style>
