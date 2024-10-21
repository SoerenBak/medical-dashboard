<template>
  <div class="messages-box bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
    <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Unread Messages</h3>
    <ul class="message-list space-y-4">
      <li
        v-for="(message, index) in messages"
        :key="index"
        class="message-item flex items-start p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
      >
        <div class="avatar bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
          <span class="material-icons">person</span>
        </div>
        <div class="message-content flex-grow">
          <div class="flex justify-between items-center">
            <span class="font-semibold text-blue-600 dark:text-blue-400">{{ message.sender }}</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ message.timestamp }}</span>
          </div>
          <p class="text-gray-700 dark:text-gray-300">{{ message.text }}</p>
        </div>
      </li>
    </ul>
    <p v-if="messages.length === 0" class="text-gray-500 dark:text-gray-400">No unread messages.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        { sender: "Dr. Smith", text: "Please review the latest lab results.", timestamp: "2 mins ago" },
        { sender: "Nurse Julia", text: "New patient has been added.", timestamp: "5 mins ago" },
        { sender: "Admin", text: "Schedule changes for next week.", timestamp: "10 mins ago" },
        { sender: "Dr. Adams", text: "Follow-up required for patient John Doe.", timestamp: "15 mins ago" },
      ],
    };
  },
};
</script>

<style scoped>
.messages-box {
  transition: background-color 0.3s ease, color 0.3s ease; /* Smooth transition for theme changes */
}

.message-list {
  list-style: none;
  padding: 0;
}

.message-item {
  background-color: #f9fafb;
  border-radius: 8px;
  transition: background-color 0.3s ease; 
}

.message-item:hover {
  background-color: #e5e7eb;
}

.dark .message-item {
  background-color: #2d3748;
}

.dark .message-item:hover {
  background-color: #2d3748;
}

.message-content {
  flex-grow: 1;
}

.avatar {
  width: 40px;
  height: 40px; 
}

.message-item p {
  margin: 0;
}
</style>
