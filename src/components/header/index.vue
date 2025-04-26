<script setup lang="ts">
import { onMounted, ref } from 'vue'

const navbar = ref<HTMLElement>()
onMounted(() => {
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 150) {
      if (!navbar.value?.classList.contains('active'))
        navbar.value?.classList.add('active')
      else {
        return
      }
    } else {
      if (navbar.value?.classList.contains('active'))
        navbar.value?.classList.remove('active')
    }
  })
})
</script>

<template>
  <nav ref="navbar" class="navbar navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand m-0" :to="{name:'newAddress'}">
        <img src="/achare.png" alt="achare logo" width="30" height="24"
             class="d-inline-block align-text-top">
      </router-link>
      <ul class="navbar-nav gap-3 list-group-horizontal">
        <li class="nav-item">
          <router-link class="nav-link fw-bold" aria-current="page" :to="{name:'newAddress'}">
            ثبت آدرس
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link fw-bold" aria-current="page" :to="{name:'allAddress'}">مشاهده
            آدرس ها
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  backdrop-filter: drop-shadow(0 2px #00000026);
  z-index: 2000;
}

.nav-item {
  font-weight: var(--font-weight-bold);
  font-size: var(--font-14);
 line-height: var(--line-height-100);
  text-align: center;
}

.active {
  position: fixed;
  top: 0;
  animation: activeMenu 1s 1 forwards ease;
  width: 100%;
}

a.router-link-exact-active {
  color: var(--primary-color);
}

a.router-link-exact-active:hover {
  background-color: transparent;
}

img {
  width: 70px;
  height: 39px;
}

@keyframes activeMenu {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
