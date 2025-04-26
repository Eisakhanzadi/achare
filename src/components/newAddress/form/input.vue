<template>
  <div class="mb-3">
    <div v-if="type!='checkbox' && type!='radio'">
      <div class="d-flex align-items-baseline justify-content-between">
        <label :for="id" class="form-label cursor-pointer w-100">{{ title }} <span v-if="requireInput">(اختیاری)</span></label>
        <span class="require text-nowrap" v-if="requireInput">*با پیش شماره </span>
      </div>
      <div  class="position-relative">
        <input ref="inputElement" v-model.trim="inputValue" @input="handleInput" :id="id"
               :type="type"
               class="form-control w-100" :placeholder="placeholder">
        <button @click.prevent="clearData"
                class="close position-absolute border-0 outline-0 rounded-circle"></button>
      </div>
      <span ref="errorElement" :class="{'d-block':!validation , 'd-none':validation}" class="error ">{{ error }}</span>
    </div>
    <div v-if="type=='checkbox' || type=='radio'">
      <label :for="id" class="form-check-label cursor-pointer d-flex align-items-center gap-2">{{ title }}
          <input ref="inputElement" v-model="inputValue" @input="handleInput" :id="id" :name="name"
                 :type="type" :value="value" :checked="checked"
                 class="form-check-input w-fit d-none">
          <span class="checked"></span>
      </label>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

const {
  title,
  placeholder,
  error,
  type,
  id,
  validation,
  minLength,
  requireInput,
  checked,
  value,
  name
} = defineProps({
  error: {
    type: String,
    required: true,
    default: 'لطفا کادر بالا را پرکنید'
  },
  name: {
    type: String,
    default: ''
  },
  requireInput: {
    type: Boolean,
    required: true,
    default: false
  },
  validation: {
    type: Boolean,
    default: true
  },
  minLength: {
    type: String || Number,
    required: true,
    default: 3
  },
  id: {
    type: String,
    required: true,
    default: 'test'
  },
  title: {
    type: String,
    required: true,
    default: 'عنوان'
  },
  type: {
    type: String,
    required: true,
    default: 'text'
  },
  placeholder: {
    type: String,
    required: true,
    default: 'اینجا را تکمیل کنید '
  },
  checked: {
    default: false,
    type: Boolean
  },
  value: {
    default: '',
    type: String
  }
})
const inputElement = ref<HTMLInputElement>()
const errorElement = ref<HTMLInputElement>()
const emit = defineEmits(['sendData'])
const inputValue = ref<string>(value)
const timer = ref<unknown>()
const handleInput = () => {
  clearTimeout(timer.value)
  timer.value = setTimeout(() => emit('sendData', inputValue.value), 500)
  successValidation()
}


function successValidation() {
  if (inputElement.value?.classList.contains('validation-field')) {
    inputElement.value?.classList.remove('validation-field')
  }
  if (inputValue.value.length >= Number(minLength)) {
    inputElement.value?.classList.add('validation-success')
    if (errorElement.value?.classList.contains('d-blick')){}
  } else {
    inputElement.value?.classList.remove('validation-success')
  }
}

function clearData() {
  if (inputElement.value?.classList.contains('validation-success')) {
    inputElement.value?.classList.remove('validation-success')
  }
  inputValue.value = ''
}

watch(() => validation, () => {
  if (!validation) {
    if (inputElement.value?.classList.contains('validation-success')) {
      inputElement.value?.classList.remove('validation-success')
    }
    inputElement.value?.classList.add('validation-field')
  }
})
</script>
<style scoped lang="scss">
label {
  cursor: pointer;
  font-size: var(--font-14);
  font-weight: var(--font-weight-medium);
  color: var(--dark-color);

  span {
    font-size: var(--font-10);
    font-weight: var(--font-weight-medium);
  }
}

svg {
  fill: red;
}

span.require {
  color: var(--gray-color-6);
  font-weight: var(--font-weight-light);;
  font-size: var(--font-10);
}

input:not([type="checkbox"]):not([type="radio"]) {
  box-shadow: unset !important;
  border-radius: 5px;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-14);
  vertical-align: middle;
  border: 1px solid var(--gray-color-4);
  color: var(--dark-color) !important;
  height: 46px;
  padding-left: 30px;

  &:focus {
    border: 1px solid var(--gray-color-4);
  }
}

input::placeholder {
  color: var(--gray-color);
}

button.close {
  width: 16px;
  height: 16px;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--gray-color-5);
  transition: 0.2s;

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  &:after {
    content: "";
    width: 80%;
    height: 1px;
    background: white;
    position: absolute;
    transform-origin: center;
    transform: translate(-50%, -50%) rotate(45deg);
    left: 50%;
    top: 50%;
  }

  &:before {
    content: "";
    width: 80%;
    height: 1px;
    background: white;
    position: absolute;
    transform-origin: center;
    transform: translate(-50%, -50%) rotate(-45deg);
    left: 50%;
    top: 50%;
  }
}

.error {
  font-size: var(--font-10);
  line-height:var(--line-height-32);
  font-weight: var(--font-weight-light);;
  color: var(--error-color);
}

.validation-success {
  border: var(--primary-color) 1px solid !important;
}

.validation-field {
  border: var(--error-color) 1px solid !important;
}

/* checkbox */
.checked {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid var(--primary-color);
  border-radius: 100%;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--primary-color);
    width: 8px;
    height: 8px;
    border-radius: 100%;
    visibility: hidden;
  }
}

:is(input[type=checkbox] , input[type=radio]):checked + span.checked::after {
  visibility: visible;
}
</style>
