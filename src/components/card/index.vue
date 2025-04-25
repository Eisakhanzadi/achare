<script setup lang="ts">
const { data } = defineProps({
  data: {
    type: Object,
    required: true
  }
})
const cartInfo = {
  name: 'نام',
  lastName: 'نام خانوادگی',
  address: 'آدرس',
  telephone: 'شماره تلفن ثابت',
  mobile: 'شماره تلفن همراه',
  gender: 'جنسیت'
}
function convertToString(item:string|number):string{
  if (typeof item === 'string') {
    return item
  }else{
    return item.toString()
  }
}
</script>

<template>
  <article v-if="data" class="card border-0 p-3">
    <div class="card-body row row-gap-4">
      <div class="col-12 col-sm-6 col-lg-4 d-flex justify-content-between flex-sm-column gap-2">
        <h6>{{ cartInfo.name }}</h6>
        <p>{{ data.first_name.length ? data.first_name.length : '-' }}</p>
      </div>
      <div class="col-12 col-sm-6 col-lg-4 d-flex justify-content-between flex-sm-column gap-2">
        <h6>{{ cartInfo.lastName }}</h6>
        <p>{{ data.last_name.length ? data.last_name.length : '-' }}</p>
      </div>
      <div class="col-12 col-sm-6 col-lg-4 d-flex justify-content-between flex-sm-column gap-2">
        <h6>{{ cartInfo.mobile }}</h6>
        <p>{{ convertToString(data.coordinate_mobile).length ? data.coordinate_mobile :'-' }}</p>
      </div>
      <div class="col-12 col-sm-6 col-lg-4 d-flex justify-content-between flex-sm-column gap-2">
        <h6>{{ cartInfo.telephone }}</h6>
        <p>{{ convertToString(data.coordinate_phone_number).length ? data.coordinate_phone_number :'-' }}</p>
      </div>
      <div class="col-12 col-sm-6 col-lg-4 d-flex justify-content-between flex-sm-column gap-2 ">
        <h6>{{ cartInfo.gender }}</h6>
        <p>
          <span v-if="data.gender.length > 0">{{ data.gender }}</span>
          <span v-else>آقا</span>
        </p>
      </div>
      <div class="col-12 col-sm-6 col-lg-4 d-flex flex-column gap-2 address pt-4 pt-sm-0">
        <h6>{{ cartInfo.address }}</h6>
        <p v-if="data.address">{{ data.address.length ? data.address : '-'}}</p>
      </div>
    </div>
  </article>

</template>

<style lang="scss" scoped>
.card {
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--gray-color-2);
  border-radius: 4px;

  div {
    & > div {
      & > h6 {
        color: var(--gray-color-1);
        font-size: 14px;
        font-weight: 400;
        line-height: 100%;
      }

      & > p {
        color: var(--dark-color);
        font-size: 16px;
        font-weight: 700;
        line-height: 100%;
      }

      &.address {
        p {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        border-top: 1px solid var(--border-color);
        @media screen and (min-width: 768px) {
          border:0;
        }
      }
    }
  }

}
</style>
