<script setup lang="ts"></script>

<template>
  <div class="app">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <span> | </span>
      <RouterLink to="/edit">Edit</RouterLink>
      <span> | </span>
      <RouterLink to="/search">Search</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
}
</style>
