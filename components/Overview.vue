<template>
  <div>
    <h2>Ваш баланс</h2>
    <p>Доходы: {{ income }}</p>
    <p>Расходы: {{ expenses }}</p>
    <p>Баланс: {{ balance }}</p>
  </div>

  <div class="max-h-[340px] mb-8">
    <Doughnut
      id="donut-chart"
      :data="{
        labels: ['Income', 'Expenses', 'Balance'],
        datasets: [
          {
            data: [income, expenses, balance],
            backgroundColor: ['#84cc16', '#f43f5e', '#0ea5e9'],
            hoverOffset: 16,
          },
        ],
      }"
      :options="{
        plugins: {
          legend: {
            labels: {
              pointStyle: 'rectRounded',
              usePointStyle: true,
            },
            position: 'left',
          },
        },
        layout: {
          padding: {
            bottom: 10,
            right: 10,
          },
        },
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

const { income = 0, expenses = 0 } = defineProps<{
  income?: number;
  expenses?: number;
}>();

const balance = computed(() => income - expenses),
  chartData = useTemplateRef("chartdiv");

onUpdated(() => {});
</script>
<style scoped></style>
