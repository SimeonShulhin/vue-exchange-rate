<script setup lang="ts">
import { useCurrencyStore } from '../stores/currency';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';

const router = useRouter();
const store = useCurrencyStore();

const { editOrAddCurrency, currentCurrency: currency } = store;

const currencyForm = reactive({
  cc: currency?.cc || '',
  txt: currency?.txt || '',
  rate: currency?.rate || 0,
});
const isFormValid = computed(
  () =>
    currency &&
    Object.entries(currencyForm).some(([key, value]) => {
      const typedKey = key as keyof typeof currency;
      return value !== currency[typedKey];
    })
);

function submitForm() {
  if (isFormValid.value && currency.r030) {
    editOrAddCurrency({
      ...currencyForm,
      r030: currency.r030,
      exchangedate: currency.exchangedate,
    });
    goBack();
  } else {
    console.error('Something wrong happened');
  }
}

function goBack() {
  router.back();
}
</script>

<template>
  <div v-if="currency">
    <h1>Edit currency</h1>
    <form id="editCurrencyForm" @submit.prevent="submitForm">
      <div class="form-wrapper">
        <div class="form-field">
          <label for="currencyCC">Literal code</label>
          <input type="text" id="currencyCC" required v-model.trim="currencyForm.cc" />
        </div>
        <div class="form-field">
          <label for="currencyName">Currency name</label>
          <input type="text" id="currencyName" required v-model.trim="currencyForm.txt" />
        </div>
        <div class="form-field">
          <label for="currencyRate">Currency rate</label>
          <input
            type="number"
            step="0.000001"
            id="currencyRate"
            required
            v-model.trim="currencyForm.rate" />
        </div>
      </div>
      <div class="form-btns">
        <button type="reset" @click="goBack">Cancel</button>
        <button type="submit">Save</button>
      </div>
      <p v-if="!isFormValid" class="danger">Please add changes to form</p>
    </form>
  </div>
</template>

<style scoped>
#editCurrencyForm {
}

.form-wrapper {
  display: flex;
  gap: 0.5rem;
}
.form-field {
  display: flex;
  flex-direction: column;
}
.form-field label {
  text-align: left;
}

.form-btns {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}
</style>
