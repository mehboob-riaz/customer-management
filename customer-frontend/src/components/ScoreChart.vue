<template>
  <div class="pie-chart">
    <PieChart :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// Registering chart components globally
ChartJS.register(ArcElement, Tooltip, Legend)

// Defining props for the component
const props = defineProps({
  score: {
    type: Number,
    required: true
  }
})

// Computed property for chart data
const chartData = computed(() => ({
  labels: ['Score', 'Remaining'],
  datasets: [
    {
      data: [props.score, 100 - props.score],
      backgroundColor: ['#4caf50', '#ccc']
    }
  ]
}))

// Chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false // Hide the legend
    },
    tooltip: {
      enabled: false // Disable the tooltip
    }
  }
}

// Define PieChart as a component
const PieChart = Pie
</script>

<style>
.pie-chart {
  width: 50px;
  height: 50px;
}
</style>
