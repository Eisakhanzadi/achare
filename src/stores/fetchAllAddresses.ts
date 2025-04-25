import { defineStore } from 'pinia'
import axios from 'axios'

export const useGetAddressesStore = defineStore('getAddresses', {
  state: () => {
    return {
      addresses: [],
      loading:false
    }
  },
  getters:{
    getAddresses(state){
      return state.addresses
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async fetchAllAddresses() {
      try {
        this.loading = true
        await axios.get('karfarmas/address').then(res => {
          this.addresses = res.data
        })
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  },
})
