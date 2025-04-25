<script setup lang="ts">
const { data } = defineProps(
  {
    data: {
      type: Object,
      required: true
    }
  }
)
</script>

<template>
  <div v-if="data && Object.keys(data).length > 0">
    <h6 v-if="data.title">{{ data.title }}</h6>
    <p v-if="data.info">{{ data.info }}</p>
  </div>
</template>

<style scoped>

</style>
