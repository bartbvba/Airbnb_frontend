<template>
    <div>
      <h1>Campsites</h1>
      <div v-for="camping in campings" :key="camping.camping_id">
        <p>{{ camping.name }} - {{ camping.location }} - ${{ camping.price_per_night }} per night</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        campings: [],
      };
    },
    created() {
      this.fetchCampings();
    },
    methods: {
      async fetchCampings() {
        try {
          const response = await axios.get('http://localhost:3000/api/campings');
          this.campings = response.data;
        } catch (error) {
          console.error('Error fetching campings:', error);
        }
      },
    },
  };
  </script>
  