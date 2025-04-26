<template>
  <div class="card rounded border-0 overflow-hidden">
    <div class="card-body p-0">
      <div class="map-title py-1 position-relative d-flex align-items-center">
        <button class="btn p-0 bg-transparent position-absolute d-md-none right-0 me-3 border-0" @click="$emit('prevStep')">
          <img class="img-fluid" src="@/assets/images/icons/arrow-right.png"
               alt="arrow-right-icon">
        </button>

        <h6 class=" mx-auto ms-md-0 me-md-4 mb-0 ">
          <span class="d-none d-md-inline">موقعیت مورد نظر خود را روی نقشه مشخص کنید</span>
          <span class="d-md-none">موقعیت</span>
        </h6>
      </div>
      <div>
        <l-map
          ref="map"
          :options="{ attributionControl: false, doubleClickZoom: false }"
          @dblclick="onMapClick"
          style=" position: relative;height: 380px;"
          :zoom="zoom"
          :center="[position.lat || userLocation.lat || defaultLocation.lat, position.lng || userLocation.lng || defaultLocation.lng]"
        >
          <l-tile-layer :url="url"></l-tile-layer>

          <l-marker
            v-if="position && position.lat && position.lng"
            visible
            draggable
            :lat-lng.sync="position"
            :icon="icon"
            @dragstart="dragging = true"
            @dragend="dragging = false"
          >
            <l-tooltip
              :content="tooltipContent"
              :options="{ permanent: true, offset: tooltipOffset }"
            />
          </l-marker>

          <!-- دکمه نمایش موقعیت من -->
          <button
            class="btn rounded-circle d-flex justify-content-center align-items-center locate-button"
            @click="handleLocateMe">
            <img src="@/assets/images/map/location.png" alt="location-icon">
          </button>
        </l-map>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import { LMap, LTileLayer, LMarker, LTooltip } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import LocationMarker from '@/assets/images/map/locationMarker.png'

export default {
  components: { Map, LMap, LTileLayer, LMarker, LTooltip },
  props: {

    defaultLocation: {
      type: Object,
      default: () => ({
        lat: 35.7219,
        lng: 51.3347
      })
    }
  },
  data() {
    return {
      loading: false,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 15,
      icon: L.icon({
        iconUrl: LocationMarker,
        iconSize: [28, 36]
      }),
      tooltipOffset: L.point({ x: 300, y: 10 }),
      dragging: false,
      position: {},
      address: '',
      userLocation: {},
      width:0,
      height:0,
      map: null
    }
  },
  mounted() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    window.addEventListener('resize' , ()=>{
      this.width = window.innerWidth
      this.height = window.innerHeight
    })
  },
  watch: {
    position: {
      deep: true,
      async handler(value) {
        this.address = await this.getAddress()
        this.$emit('setLocation', { position: value, address: this.address })
      }
    }
  },
  computed: {
    tooltipContent() {
      if (this.dragging) return '...'
      if (this.loading) return 'Loading...'
      let location = this.address
      if (location && location.address) {
        return `
        <strong>${
          location.address.road
            ? location.address.road
            : location.address.neighbourhood
        }</strong>
        <br/>
        <p>${location.address.country},${location.address.state},${
          location.address.city
        }</p>
        <hr/>
        <strong>lat:</strong> ${this.position.lat}
        <br/>
        <strong>lng:</strong> ${this.position.lng}`
      }
    }
  },
  methods: {
    async getAddress() {
      this.loading = true
      let address = 'Unresolved address'
      try {
        const { lat, lng } = this.position
        const result = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        )
        if (result.status === 200) {
          const body = await result.json()
          address = body
        }
      } catch (e) {
        console.error('Reverse Geocode Error->', e)
      }
      this.loading = false
      return address
    },
    async onMapClick(value) {
      this.position = value.latlng
    },
    onSearch(value) {
      const loc = value.location
      this.position = { lat: loc.y, lng: loc.x }
    },
    async getUserPosition() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          this.userLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          }
        })
      }
    },
    async handleLocateMe() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          }
          this.userLocation = coords
          this.position = coords

          // جابجایی نقشه به محل کاربر
          if (this.$refs.map?.mapObject) {
            this.$refs.map.mapObject.setView([coords.lat, coords.lng], this.zoom)
          }
        })
      } else {
        alert('مکان‌یاب در مرورگر شما پشتیبانی نمی‌شود.')
      }
    }
  }

}
</script>
<style scoped lang="scss">
.locate-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 58px;
  height: 58px;
  background-color: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transform: scale(1);
  transition: transform 0.3s ease;

  &:active {
    transform: scale(0.9);
  }
}

.card {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  .map-title {
    background-color: var(--gray-color-3);

    h6 {
      color: var(--dark-color);
      font-weight: var(--font-weight-bold);
      font-size: var(--font-12);
      line-height:var(--line-height-32);
    }
  }
}

@media screen and (max-width: 768px) {
  .card{
    box-shadow: none;
    border-radius: 0;
  }
}
</style>
