<template>
  <div class="main-container">
    <h1>Welcome to Airbnb</h1>
    <p>Please choose an option to proceed:</p>
    <div class="buttons-container">
      <button @click="goToLogin" class="main-button">Login</button>
      <button @click="goToRegister" class="main-button">Register</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',  // Updated component name

  methods: {
    goToLogin() {
      this.$router.push('/login');  // Navigate to Login page
    },
    goToRegister() {
      this.$router.push('/register');  // Navigate to Register page
    }
  }
};
</script>

<style scoped>
.main-container {
  text-align: center;
  margin-top: 50px;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

p {
  font-size: 1.2em;
  margin-bottom: 40px;
}

.buttons-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.main-button {
  padding: 10px 20px;
  font-size: 1.2em;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.main-button:hover {
  background-color: #45a049;
}
</style>
