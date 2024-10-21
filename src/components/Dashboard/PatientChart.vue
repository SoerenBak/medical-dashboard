<template>
    <div class="chart-container">
      <canvas id="patientChart"></canvas>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  export default {
    setup() {
      const chartInstance = ref(null);
  
      const labels = [
        '2013', '2014', '2015', '2016', '2017',
        '2018', '2019', '2020', '2021', '2022',
        '2023', '2024'
      ];
  
      const patientData = [40, 45, 55, 65, 75, 85, 100, 125, 150, 175, 200, 225];
  
      const createChart = () => {
        const ctx = document.getElementById('patientChart').getContext('2d');
  
        chartInstance.value = new Chart(ctx, {
          type: 'bar', 
          data: {
            labels: labels,
            datasets: [{
              label: 'Number of Patients',
              data: patientData,
              backgroundColor: 'rgba(59, 130, 246, 0.6)',  // Lighter shade
              borderColor: 'rgba(29, 78, 216, 1)',         // Darker shade
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of Patients'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Year'
                }
              }
            }
          }
        });
      };
  
      onMounted(() => {
        createChart();
      });
  
      return {
        chartInstance
      };
    }
  };
  </script>
  
  <style scoped>
  .chart-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  </style>
  