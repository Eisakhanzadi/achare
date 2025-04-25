<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import AddressCard from '@/components/card/index.vue'
import { useGetAddressesStore } from '@/stores/fetchAllAddresses.ts'

const store = useGetAddressesStore()
const data = computed(() => store.getAddresses)

const date = new Date() as Date
const halfMinute = 30 * 1000 as number

onBeforeMount(async () => {
  //اینجا امدم از لوکال استوریج استفاده کردم که اگر کاربر به هر دلیلی از این صفحه خارج شد تا 30 ثانیه مجدد درخواست نخوره
  document.title = 'لیست آدرس ها'
  const newFetchTime = localStorage.getItem('time') as string
  if (Number(newFetchTime) > Number(date.getTime())) {
    return false
  } else {
    await store.fetchAllAddresses()
    localStorage.setItem('time', `${date.getTime() + halfMinute}`)
  }
})
</script>

<template>
  <section class="position-relative container">
    <div class="loader text-white h5" v-if="store.loading && !data?.length">
      لطفا کمی صبر کنید...
    </div>
    <div v-if="data && data.length" class="pt-4">
      <div>
        <h2>آدرس ها و مشخصات</h2>
      </div>
      <section class="d-flex flex-column gap-3 gap-md-4">
        <address-card v-for="(item , index) in data" :data="item" :key="index" />
      </section>
    </div>
  </section>
</template>
<style scoped>
.container {
  max-width: 800px;
}

h2 {
  font-weight: 400;
  font-size: 16px;
  color: var(--dark-color);
  line-height: 32px;
}

.loader {
  -webkit-text-stroke: 1px #000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  font-weight: 700;
  z-index: 5;
  inset: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  min-height: 100%;
  backdrop-filter: blur(3px);
}
</style>
