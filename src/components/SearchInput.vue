<script setup lang="ts">
import { ref } from 'vue';
import type { ISearchInputSuggestions } from '../types';

defineProps<{
  suggestionsList?: ISearchInputSuggestions[];
  modelValue: string;
}>();
const emit = defineEmits(['update:modelValue']);

const inFocus = ref(false);

function updateValue(event: Event) {
  const input = event.target as HTMLInputElement;
  emit('update:modelValue', input.value);
}
</script>

<template>
  <div class="search-input-container">
    <input
      type="search"
      id="search-input"
      placeholder="Search by name"
      :value="modelValue"
      @input="updateValue"
      @blur="inFocus = false"
      @focus="inFocus = true" />
    <ul
      v-show="suggestionsList && suggestionsList.length > 1 && modelValue && inFocus"
      class="suggestions-list">
      <li
        v-for="item in suggestionsList"
        :key="item.key"
        @mousedown="emit('update:modelValue', item.name)">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search-input-container {
  position: relative;
}

.suggestions-list {
  position: absolute;
  width: 100%;
  border-radius: 0.25rem;
  margin-top: 0.5rem;
  max-height: 12rem;
  overflow-y: auto;
  z-index: 10;
  list-style: none;
  padding: 0;
}

.suggestions-list li {
  padding: 0.5rem;
  cursor: pointer;
  color: #fff;
  background-color: #374151;
  border: 1px solid #4b5563;
}
.suggestions-list li:hover {
  background-color: #475569;
}

#search-input {
  border-radius: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #1f2937;
  border: 1px solid #4b5563;
  color: #f9fafb;
}

#search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}

@media (prefers-color-scheme: light) {
  #search-input {
    background-color: #f9fafb;
    border: 1px solid #d1d5db;
    color: #111827;
  }

  .suggestions-list li {
    background-color: #fff;
    border: 1px solid #e5e7eb;
    color: #000;
  }

  .suggestions-list li:hover {
    background-color: rgb(229 231 235);
  }
}
</style>
