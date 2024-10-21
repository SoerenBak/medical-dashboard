<template>
    <div>
      <nav class="grid grid-cols-4 gap-6 pt-6 pb-6">
        <router-link to="/dashboard/patients" class="dashboard-link">
          <div class="flex flex-col items-center justify-center h-full bg-gray-200 dark:bg-gray-800">
            <span class="material-icons text-4xl mb-2">people</span>
            <p class="text-center font-semibold text-gray-800 dark:text-white">All Patients</p>
          </div>
        </router-link>
  
        <router-link to="/dashboard/add-patient" class="dashboard-link">
          <div class="flex flex-col items-center justify-center h-full bg-gray-200 dark:bg-gray-800">
            <span class="material-icons text-4xl mb-2">person_add</span>
            <p class="text-center font-semibold text-gray-800 dark:text-white">Add New Patient</p>
          </div>
        </router-link>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
   
  };
  </script>
  
  <style scoped>
  .dashboard-link {
    width: 100%;
    height: 150px;  
    border-radius: 8px; 
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    text-decoration: none;
  }
  
  .dashboard-link:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
  
  .material-icons {
    color: #3b82f6;
  }
  
  p {
    color: #374151;
  }
  </style>
  