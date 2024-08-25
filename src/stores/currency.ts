import { ref } from 'vue';
import { defineStore } from 'pinia';
import ExchangeRateService from '../services/ExchangeRateService';
import { formatDate } from '../utils/dateFormatter';
import type { IExchangeRate } from '../types';

export const useCurrencyStore = defineStore('currency', () => {
  const currentDayCurrencies = ref([] as IExchangeRate[]);
  async function getCurrencies() {
    const res = await ExchangeRateService.getRates(formatDate(new Date()));
    currentDayCurrencies.value = res;
  }

  const changedCurrencies = ref([] as IExchangeRate[]);
  function editOrAddCurrency(currency: IExchangeRate) {
    const currencyIndex = changedCurrencies.value.findIndex(
      (el) => el.r030 === currency.r030 && el.exchangedate === currency.exchangedate
    );
    if (currencyIndex > -1) {
      changedCurrencies.value[currencyIndex] = currency;
    } else {
      changedCurrencies.value.push(currency);
    }
  }

  const currentCurrency = ref({} as IExchangeRate);
  function setCurrentCurrency(currency: IExchangeRate) {
    currentCurrency.value = currency;
  }

  return {
    currentDayCurrencies,
    getCurrencies,
    changedCurrencies,
    editOrAddCurrency,
    currentCurrency,
    setCurrentCurrency,
  };
});
