<template>
  <div class="mb-3">
    <div class="d-flex align-items-center justify-content-between">
      <label :for="id" class="form-label ">{{ title }} <span
        v-if="requireInput">(اختیاری)</span></label>
      <span class="require" v-if="requireInput">*با پیش شماره </span>
    </div>
    <div class="position-relative">
      <input ref="inputElement" v-model.trim="inputValue" @input="handleInput" :id="id"
             :type="type"
             class="form-control" :placeholder="placeholder">
      <button @click="clearData"
              class="close position-absolute border-0 outline-0 rounded-circle"></button>
    </div>
    <span v-if="!validation" class="error">{{ error }}</span>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

const { title, placeholder, error, type, id, validation, minLength, requireInput } = defineProps({
  error: {
    type: String,
    required: true,
    default: 'لطفا کادر بالا را پرکنید'
  },
  requireInput: {
    type: Boolean,
    required: true,
    default: false
  },
  validation: {
    type: Boolean,
    required: true,
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
  }
})
const inputElement = ref<HTMLInputElement>()
const emit = defineEmits(['sendData'])
const inputValue = ref<string>('')
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
  font-size: 14px;
  font-weight: 500;
  color: var(--dark-color);

  span {
    font-size: 10px;
    font-weight: 500;
  }
}

span.require {
  color: var(--dark-gray-color);
  font-weight: 400;
  font-size: 10px;
}

input {
  box-shadow: unset !important;
  border-radius: 5px;
  font-weight: 700;
  font-size: 14px;
  vertical-align: middle;
  border: 1px solid var(--border-color);
  color: var(--dark-color) !important;
  height: 46px;
  padding-left: 30px;

  &:focus {
    border: 1px solid var(--border-color);
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
  background: var(--middle-gray-color);
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
  font-size: 10px;
  line-height: 32px;
  font-weight: 400;
  color: var(--error-color);
}

.validation-success {
  border: var(--primary-color) 1px solid !important;
}

.validation-field {
  border: var(--error-color) 1px solid !important;
}
</style>
