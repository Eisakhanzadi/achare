<script setup lang="ts">

</script>

<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{name:'newAddress'}">
        <img src="/achare.png" alt="achare logo" width="30" height="24" class="d-inline-block align-text-top">

      </router-link>
      <ul class="navbar-nav gap-3 list-group-horizontal">
        <li class="nav-item">
          <router-link class="nav-link fw-bold" aria-current="page" :to="{name:'newAddress'}">ثبت آدرس</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link fw-bold" aria-current="page" :to="{name:'allAddress'}">مشاهده آدرس ها</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar{
  backdrop-filter: drop-shadow(0 2px #00000026);
}
a.router-link-exact-active {
  color: var(--primary-color);
}

a.router-link-exact-active:hover {
  background-color: transparent;
}
img{
  width: 70px;
  height: 39px;
}
</style>
