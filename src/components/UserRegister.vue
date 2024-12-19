<template>
  <div class="register-container">
    <h1>Register</h1>
    <form @submit.prevent="registerUser" class="register-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" v-model="username" id="username" placeholder="Enter your username" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email" placeholder="Enter your email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" placeholder="Enter your password" required />
      </div>
      <button type="submit" class="submit-button">Register</button>
    </form>
    <div class="login-link">
      <p>Already have an account? <a @click="goToLogin">Login</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserRegister',

  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },

  methods: {
    async registerUser() {
      try {
        // Debugging logs
        console.log("Sending data:", {
          username: this.username,
          email: this.email,
          password: this.password,
        });

        // Send POST request to backend API
        const response = await this.$axios.post('http://localhost:3000/api/users/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        });

        console.log("API Response:", response);
        
        if (response.status === 201) {
          alert('Registration successful');
          this.$router.push('/login'); // Redirect to login page after successful registration
        } else {
          alert('Registration failed');
        }
      } catch (error) {
        console.error('Registration failed:', error);
        alert('Registration failed');
      }
    },

    goToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
  font-family: 'Arial', sans-serif;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

.register-form {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
}

input {
  width: 100%;
  padding: 12px;
  font-size: 1.1em;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #4CAF50;
}

.submit-button {
  width: 100%;
  padding: 15px;
  font-size: 1.2em;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #45a049;
}

.login-link {
  margin-top: 20px;
  font-size: 1.1em;
}

.login-link a {
  color: #4CAF50;
  cursor: pointer;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
