<template>
    <div>
      <h1>Owner Dashboard</h1>
      <p>Manage your camping spots and bookings here.</p>
  
      <!-- Show a list of bookings here -->
      <button @click="addNewBooking">Add New Booking</button>
      <button @click="deleteBooking">Delete Booking</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'OwnerDashboard',
  
    methods: {
      addNewBooking() {
        // Code to add a new booking
        console.log('Adding a new booking...');
      },
  
      deleteBooking() {
        // Code to delete a booking
        console.log('Deleting a booking...');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles for the Owner Dashboard */
  </style>
  