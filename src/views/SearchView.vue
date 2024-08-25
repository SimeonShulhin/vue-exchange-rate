<script setup lang="ts">
import { ref } from 'vue';
import ExchangeRateService from '../services/ExchangeRateService';
import CurrenciesTable from '../components/CurrenciesTable.vue';

const MAX_DATE = new Date().toISOString().split('T')[0];

const dateInput = ref();
const searchedCurrencies = ref();

async function searchCurrencies() {
  const dateString = dateInput.value.split('-').join('');
  const res = await ExchangeRateService.getRates(dateString);
  searchedCurrencies.value = res;
}
</script>

<template>
  <h1>Search currencies by date</h1>
  <form action="#" @submit.prevent="searchCurrencies">
    <input id="date" type="date" :max="MAX_DATE" required v-model="dateInput" />
    <input type="submit" />
  </form>
  <CurrenciesTable v-if="searchedCurrencies" :currencies="searchedCurrencies" />
</template>

<style scoped>
form {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
</style>
