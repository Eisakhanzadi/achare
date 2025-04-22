<template>
  <section class="row h-100 d-flex align-items-center ">
      <form-input @send-data="data['name'] = $event" class="col col-lg-6 col-xl-4" id="name" title="نام" placeholder="مثال: عیسی" type="text" min-length="3" :validation="true" :require-input="false" error="نام باید حداقل دارای 3 کاراکتر باشد"/>
      <form-input @send-data="data['lastName'] = $event" class="col col-lg-6 col-xl-4" id="last-name" title="نام خانوادگی" placeholder="مثال: رضایی" type="text" min-length="3" :validation="true" :require-input="false" error="نام خانوادگی باید حداقل دارای 3 کاراکتر باشد"/>
      <form-input @send-data="data['phoneNumber'] = $event" class="col col-lg-6 col-xl-4" id="phone-number" title="شماره تلفن همراه" placeholder="مثال: 09121234567" type="text" min-length="11" :validation="true" :require-input="false" error="شماره وارد شده صحیح نمیباشد"/>
      <form-input @send-data="data['telephone'] = $event" class="col col-lg-6 col-xl-4" id="telephone" title="شماره تلفن ثابت" placeholder="مثال: 0211234567" type="text" min-length="11" :validation="true" :require-input="false" error="شماره وارد شده صحیح نمیباشد"/>
      <form-input @send-data="data['address'] = $event" class="col col-lg-12 col-xl-8" id="address" title="آدرس" placeholder=" " type="text" min-length="10" :validation="true" :require-input="false" error="آدرس باید حداقل 11 کارکتر باشد  "/>
    <div class="col"> {{data}}</div>
  </section>
</template>

<script setup lang="ts">
import FormInput  from '@/components/form/input.vue'
import { ref } from 'vue';
interface formData {
  name:string,
  lastName:string,
  phoneNumber:string,
  telephone:string,
  address:string,
}
const data = ref<formData>({
  name:"",
  lastName:"",
  phoneNumber:"",
  telephone:"",
  address:"",
})
</script>

<style scoped>

</style>
