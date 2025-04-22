<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/header/index.vue'
</script>

<template>
<div class="outer-container">
  <Header/>
  <main class="container-sm">
    <RouterView />
  </main>
</div>
</template>

<style scoped lang="scss">
.outer-container {
  background: var(--light-color);
  main{
    min-height: 100vh;
  }
}


</style>
