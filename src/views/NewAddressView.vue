<template>
  <section class="">
    <div class="form-container">
      <div>
        <h3>ثبت آدرس</h3>
      </div>
      <div class=" card  h-100 border-0  px-4 pb-4 pt-2">
        <div class="card-header border-0 bg-transparent">
          <h4>لطفا مشخصات و آدرس خود را وارد کنید </h4>
        </div>
        <div class="card-body row d-flex align-items-center">
          <form-input @send-data="data['name'] = $event" class="col-12 col-lg-6 col-xl-4" id="name"
                      title="نام" placeholder="مثال: عیسی" type="text" min-length="3"
                      :validation="validationError.name"
                      :require-input="false" error="نام باید حداقل دارای 3 کاراکتر باشد" />
          <form-input @send-data="data['lastName'] = $event" class="col-12 col-lg-6 col-xl-4"
                      id="last-name"
                      title="نام خانوادگی" placeholder="مثال: رضایی" type="text" min-length="3"
                      :validation="validationError.lastName" :require-input="false"
                      error="نام خانوادگی باید حداقل دارای 3 کاراکتر باشد" />
          <form-input @send-data="data['phoneNumber'] = $event" class="col-12 col-lg-6 col-xl-4"
                      id="phone-number" title="شماره تلفن همراه" placeholder="مثال: 09121234567"
                      type="text" min-length="11" :validation="validationError.phoneNumber"
                      :require-input="false"
                      error="شماره وارد شده صحیح نمیباشد" />
          <form-input @send-data="data['telephone'] = $event" class="col-12 col-lg-6 col-xl-4"
                      id="telephone"
                      title="شماره تلفن ثابت" placeholder="مثال: 0211234567" type="text"
                      min-length="11"
                      :validation="validationError.telephone" :require-input="true"
                      error="شماره وارد شده صحیح نمیباشد" />
          <form-input @send-data="data['address'] = $event" class="col-12 col-lg-12 col-xl-8"
                      id="address"
                      title="آدرس" placeholder=" " type="text" min-length="10"
                      :validation="validationError.address"
                      :require-input="false" error="آدرس باید حداقل 11 کارکتر باشد  " />
          <div class="col"> {{ data }}</div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import FormInput from '@/components/form/input.vue'
import { onMounted, reactive, ref } from 'vue'
onMounted(()=>document.title = 'ثبت آدرس')
interface formData {
  name: string,
  lastName: string,
  phoneNumber: string,
  telephone: string,
  address: string,
}

interface formDataError {
  name: Boolean,
  lastName: Boolean,
  phoneNumber: Boolean,
  telephone: Boolean,
  address: Boolean,
}

const validationError = reactive<formDataError>({
  name: true,
  lastName: true,
  phoneNumber: true,
  telephone: true,
  address: true
})
const data = ref<formData>({
  name: '',
  lastName: '',
  phoneNumber: '',
  telephone: '',
  address: ''
})
</script>

<style scoped>
.form-container {
  margin: auto;
  width: 100%;
  height: 100%;
  max-width: 808px;
  max-height: 407px;

    h3 {
      font-weight: 400;
      font-size: 16px;
      line-height: 32px;
      color: var(--dark-color);
    }

  .card {
    background-color: white;
    border-radius: 4px;
    border: 1px solid var(--lighter-color);
    backdrop-filter: drop-shadow(0 16px rgba(0, 0, 0, 0.08));

    h4 {
      font-weight: 700;
      font-size: 16px;
      line-height: 32px;
      color: var(--dark-color);
    }
  }
}
</style>
