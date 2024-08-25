<script setup lang="ts">
import { onMounted } from 'vue';
import { useCurrencyStore } from '../stores/currency';
import { storeToRefs } from 'pinia';
import CurrenciesTable from '../components/CurrenciesTable.vue';
import { computed } from 'vue';

const store = useCurrencyStore();
const { currentDayCurrencies } = storeToRefs(store);
const { getCurrencies } = store;

onMounted(() => {
  getCurrencies();
});
</script>

<template>
  <div>
    <h1>Exchange currencies</h1>
    <h2>on: {{ currentDayCurrencies[0]?.exchangedate }}</h2>
    <CurrenciesTable :currencies="currentDayCurrencies" />
  </div>
</template>

<style scoped></style>
