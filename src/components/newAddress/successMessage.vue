<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="d-flex flex-column justify-content-center align-items-center gap-2 mt-4 mt-md-0">
    <p class="d-flex flex-column align-items-center gap-2">
      <span class="icon"></span>
      <span>اطلاعات شما با موفقیت ثبت شد</span>
    </p>
    <button @click="router.push({ name: 'allAddress' })" class="btn">مشاهده اطلاعات</button>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  border: 1.5px solid var(--primary-color);
  color: var(--primary-color);
  max-width: 340px;
  height: 48px;
  text-align: center;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-16);
  line-height: var(--line-height-100);
}

p {
  span.icon {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 33.7px;
    height: 33.7px;
    border-radius: 100px;
    border: 1.5px solid var(--dark-color-2);

    &:after {
      content: '';
      position: absolute;
      border-bottom: 1px solid var(--dark-color-2);
      border-right: 1px solid var(--dark-color-2);
      width: 9px;
      height: 15px;
      transform: rotate(45deg);
    }
  }
}
</style>
