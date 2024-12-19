<template>
  <div id="app">
    <h1>Welcome to Airbnb</h1>
    <router-view /> <!-- This will render the correct page based on the route -->
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    console.log("App component created");
  }
};
</script>
