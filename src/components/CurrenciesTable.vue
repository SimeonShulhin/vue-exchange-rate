<script setup lang="ts">
import { ref } from 'vue';
import type { IExchangeRate } from '../types';
import { computed } from 'vue';
import { useCurrencyStore } from '../stores/currency';
import { useRouter } from 'vue-router';
import SearchInput from './SearchInput.vue';

const ITEMS_PER_PAGE = 10;

const props = withDefaults(
  defineProps<{
    currencies: IExchangeRate[];
    withDate?: boolean;
  }>(),
  { withDate: false }
);

const router = useRouter();

const store = useCurrencyStore();
const { setCurrentCurrency } = store;

function goToEditMode(currency: IExchangeRate) {
  setCurrentCurrency(currency);
  router.push(`edit-currency`);
}
const filterValue = ref('');

const curentPage = ref(0);

const filteredCurrencies = computed(() =>
  props.currencies.filter((el) => el.txt.toLowerCase().includes(filterValue.value.toLowerCase()))
);
const suggestions = computed(() =>
  filteredCurrencies.value.map((el) => ({
    key: el.r030 + el.exchangedate,
    name: el.txt,
  }))
);
const paginatedCurrencies = computed(() => {
  const start = curentPage.value * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  return filteredCurrencies.value.slice(start, end);
});
const totalPages = computed(() => Math.ceil(filteredCurrencies.value.length / ITEMS_PER_PAGE));
</script>

<template>
  <div v-if="currencies" class="currency-table">
    <div class="filter-container">
      <SearchInput v-model.trim="filterValue" :suggestionsList="suggestions" />
    </div>
    <table>
      <tr>
        <th>Literal code</th>
        <th>Currency name</th>
        <th>Currency rate</th>
      </tr>
      <tr
        v-for="el in paginatedCurrencies"
        :key="el.r030 + el.exchangedate"
        @click="goToEditMode(el)">
        <td>{{ el.cc }}</td>
        <td>{{ el.txt }}</td>
        <td>{{ el.rate }}</td>
        <td v-if="withDate">{{ el.exchangedate }}</td>
      </tr>
    </table>
    <div v-if="totalPages > 1" class="pagination">
      <button :disabled="curentPage === 0" @click="curentPage--">Prev</button>
      <button
        v-for="num in totalPages"
        :key="num"
        :disabled="curentPage === num - 1"
        @click="curentPage = num - 1">
        {{ num }}
      </button>
      <button :disabled="curentPage === totalPages - 1" @click="curentPage++">Next</button>
    </div>
  </div>
</template>

<style scoped>
.filter-container {
  margin-bottom: 1rem;
  text-align: left;
}
.currency-table {
  min-width: 50vw;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 0.5rem;
}

table {
  width: 100%;
  border-radius: 0.5rem;
  border-collapse: collapse;
}

td {
  padding: 0.5rem 1rem;
}

tr td {
  cursor: pointer;
}

tr:not(:first-child):hover {
  opacity: 0.5;
}
</style>
