<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCurrencyStore } from '../stores/currency';
import CurrenciesTable from '../components/CurrenciesTable.vue';

const store = useCurrencyStore();

const { changedCurrencies } = storeToRefs(store);
</script>

<template>
  <h1>Changed currencies</h1>
  <CurrenciesTable :currencies="changedCurrencies" withDate />
</template>
