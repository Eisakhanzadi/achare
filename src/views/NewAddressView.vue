<template>
  <section
    class="register-address position-relative gap-4 d-flex flex-column justify-content-between ">
    <div class="container px-0 py-md-5">
      <success-message v-if="currentStepActive == 3" />
      <div v-show="currentStepActive === 1" class="form-container px-3 py-2 py-md-0  ">
        <div>
          <h3>ثبت آدرس</h3>
        </div>
        <div class=" card border-0 px-1 px-md-4 pb-4 pt-2">
          <div class="card-header border-0 bg-transparent">
            <h4>لطفا مشخصات و آدرس خود را وارد کنید </h4>
          </div>
          <div class="card-body">
            <form action="">
              <div class=" row d-flex align-items-baseline">
                <form-input @send-data="formData['name'] = $event" class="col-12 col-lg-6 col-xl-4"
                            id="name"
                            title="نام" placeholder="مثال: عیسی" type="text" min-length="3"
                            :validation="validationError.name"
                            :require-input="false" error="نام باید حداقل دارای 3 کاراکتر باشد" />
                <form-input @send-data="formData['lastName'] = $event"
                            class="col-12 col-lg-6 col-xl-4"
                            id="last-name"
                            title="نام خانوادگی" placeholder="مثال: رضایی" type="text"
                            min-length="3"
                            :validation="validationError.lastName" :require-input="false"
                            error="نام خانوادگی باید حداقل دارای 3 کاراکتر باشد" />
                <form-input @send-data="formData['phoneNumber'] = $event"
                            class="col-12 col-lg-6 col-xl-4"
                            id="phone-number" title="شماره تلفن همراه"
                            placeholder="مثال: 09121234567"
                            type="text" min-length="11" :validation="validationError.phoneNumber"
                            :require-input="false"
                            error="شماره وارد شده صحیح نمیباشد" />
                <form-input @send-data="formData['telephone'] = $event"
                            class="col-12 col-lg-6 col-xl-4"
                            id="telephone"
                            title="شماره تلفن ثابت" placeholder="مثال: 0211234567" type="text"
                            min-length="11"
                            :validation="validationError.telephone" :require-input="true"
                            error="شماره وارد شده صحیح نمیباشد" />
                <form-input @send-data="formData['address'] = $event"
                            class="col-12 col-lg-12 col-xl-8"
                            id="address"
                            title="آدرس" placeholder=" " type="text" min-length="10"
                            :validation="validationError.address"
                            :require-input="false"
                            error="آدرس باید حداقل 11 کارکتر باشد  "
                />
              </div>
              <div>
                <p class="gender-title">جنسیت</p>
                <div class="d-flex">
                  <form-input @send-data="formData['gender'] = $event"
                              class=" col-4 col-sm-3 col-md-2 d-flex gap-3"
                              id="female"
                              title="خانم" placeholder=" " type="radio" min-length=""
                              :validation="validationError.address"
                              :require-input="false"
                              error=""
                              value="female"
                              :checked="false"
                              name="gender"
                  />
                  <form-input @send-data="formData['gender'] = $event"
                              class=" col-4 col-sm-3 col-md-2 d-flex gap-3"
                              id="male"
                              title="آقا" placeholder=" " type="radio" min-length=""
                              :validation="validationError.address"
                              :require-input="false"
                              error=""
                              value="male"
                              :checked="true"
                              name="gender"

                  />
                </div>
              </div>
            </form>


          </div>
        </div>
      </div>
      <div class="map-container" v-if="currentStepActive === 2">
        <div class=" px-0 d-none d-md-flex align-items-center py-2 gap-2">
          <button class="btn p-0 bg-transparent border-0" @click="handleButton('-')">
            <img class="img-fluid" src="@/assets/images/icons/arrow-right.png"
                 alt="arrow-right-icon">
          </button>
          <h5 class="select-address mb-0">انتخاب آدرس</h5>
        </div>
        <Map @prevStep="handleButton('-')" @setLocation="mapInfo = $event.position" />
      </div>
    </div>
    <div v-if="currentStepActive != 3"
         class="footer w-100 d-flex align-items-center justify-content-center ">
      <button @click="handleButton('+')"
              class="btn d-flex align-items-center justify-content-center text-center text-white">
        <span v-if="currentStepActive <= 2 && !loading">ثبت و ادامه</span>
        <span v-if="loading" class="loader"></span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

import axios from 'axios'

import FormInput from '@/components/newAddress/form/input.vue'
import SuccessMessage from '@/components/newAddress/successMessage.vue'
import Map from '@/components/newAddress/map.vue'

const mapInfo = ref<object>({})
const loading = ref<boolean>(false)
const currentStepActive = ref<number>(2)

onMounted(() => document.title = 'ثبت آدرس')

interface formData {
  name: string,
  lastName: string,
  phoneNumber: string,
  telephone: string,
  address: string,
  gender: string
}

interface validationError {
  name: boolean,
  lastName: boolean,
  phoneNumber: boolean,
  telephone: boolean,
  address: boolean,
}

const validationError = reactive<validationError>({
  name: true,
  lastName: true,
  phoneNumber: true,
  telephone: true,
  address: true
})
const formData = ref<formData>({
  name: '',
  lastName: '',
  phoneNumber: '',
  telephone: '',
  address: '',
  gender: 'male'
})

function handleButton(op: string) {
  if (op == '+') {
    if (handleForm()) {
      currentStepActive.value != 2 ? currentStepActive.value += 1 : currentStepActive.value = 2
    } else {
      return
    }
  } else {
    if (currentStepActive.value > 1) {
      currentStepActive.value -= 1
    } else {
      currentStepActive.value = 1
    }
  }
}

function handleForm() {
  if (currentStepActive.value == 1) {
    if (formData.value.name.length < 3) {
      validationError.name = false
    }
    if (formData.value.lastName.length < 3) {
      validationError.lastName = false
    }
    if (formData.value.telephone.length > 0) {
      if (formData.value.telephone.length != 11) {
        validationError.telephone = false
      }
    }
    if (formData.value.phoneNumber.length != 11) {
      validationError.phoneNumber = false
    }
    if (formData.value.address.length < 10) {
      validationError.address = false
    }
    if (
      formData.value.name.length >= 3 &&
      formData.value.lastName.length >= 3 &&
      formData.value.phoneNumber.length == 11 &&
      formData.value.address.length > 10
    ) {
      if (formData.value.telephone.length > 0) {
        if (formData.value.telephone.length == 11)
          return true
        else
          return false
      } else {
        return true
      }
    }
  }
  if (currentStepActive.value == 2) {
    if (Object.keys(mapInfo.value).length > 0) {
      console.log(mapInfo.value, 0)
      fetchData()
      return true
    } else {
      alert('...لطفا ابتدا آدرس خود را انتخاب کنید ')
      return false
    }
  }
}

async function fetchData() {
  const data = {
    first_name: formData.value.name,
    last_name: formData.value.lastName,
    coordinate_mobile: formData.value.phoneNumber,
    coordinate_phone_number: formData.value.telephone,
    address: formData.value.address,
    region: '1',
    lat: mapInfo.value.lat,
    lng: mapInfo.value.lng,
    gender: formData.value.gender
  }
  try {
    loading.value = true
    await axios.post('karfarmas/address', data).then(res => {
        if (res.status == 201) {
          currentStepActive.value = 3
        } else {
          currentStepActive.value = 2
        }
      }
    )
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-address {
  min-height: calc(100vh - 70px);

  .container {
    max-width: 800px;
  }

  .form-container {
    min-height: 407px;

    h3 {
      font-weight: 400;
      font-size: 16px;
      line-height: 32px;
      color: var(--dark-color);
    }

    .card {
      background-color: white;
      border-radius: 4px;
      border: 1px solid var(--gray-color-2);
      backdrop-filter: drop-shadow(0 16px rgba(0, 0, 0, 0.08));

      h4 {
        font-weight: 700;
        font-size: 16px;
        line-height: 32px;
        color: var(--dark-color);
      }

      .gender-title {
        font-size: 14px;
        font-weight: 500;
        color: var(--dark-color);
      }
    }
  }

  .map-container {
    .select-address {
      font-size: 16px;
      font-weight: 400;
      line-height: 32px;
      color: var(--dark-color);
    }
  }

  .footer {
    height: 84px;
    background-color: var(--gray-color-3);
    box-shadow: 0 -1px 8px rgba(0, 0, 0, 0.1) inset;

    button {
      background-color: var(--primary-color);
      font-size: 16px;
      font-weight: 700;
      line-height: 100%;
      width: 224px;
      height: 46px;
    }
  }
}

/* start loader animation */
.loader, .loader:before, .loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  animation-fill-mode: both;
  animation: bblFadInOut 1.8s infinite ease-in-out;
}

.loader {
  color: #FFF;
  font-size: 7px;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  animation-delay: -0.16s;
  margin-top: -30px;
}

.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}

.loader:before {
  left: -3.5em;
  animation-delay: -0.32s;
}

.loader:after {
  left: 3.5em;
}

@keyframes bblFadInOut {
  0%, 80%, 100% {
    box-shadow: 0 2.5em 0 -1.3em
  }
  40% {
    box-shadow: 0 2.5em 0 0
  }
}

/* end loader animation */


/* responsive size */
@media screen and (max-width: 768px) {
  .register-address {

    .footer {
      //z-index: 1000;
      //position: fixed;
      //bottom: 0;
      //right: 0;

      button {
        font-size: 14px;
        width: 90%;
      }
    }
  }
}
</style>
