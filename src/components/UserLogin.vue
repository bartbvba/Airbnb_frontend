<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="loginUser" class="login-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email" placeholder="Enter your email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" placeholder="Enter your password" required />
      </div>
      <button type="submit" class="submit-button">Login</button>
    </form>

    <!-- Owner Login Button -->
    <div class="owner-login">
      <button @click="loginAsOwner" class="submit-button">Login as Owner</button>
    </div>

    <div class="register-link">
      <p>Don't have an account? <a @click="goToRegister">Register</a></p>
    </div>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'; // Don't forget to import this!

export default {
  name: 'UserLogin',

  data() {
    return {
      email: '',
      password: '',
      isOwner: false,  // Boolean to check if it's an owner login
    };
  },

  methods: {
    async loginUser() {
      try {
        const response = await this.$axios.post('http://localhost:3000/api/users/login', {
          email: this.email,
          password: this.password,
        });

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          this.checkUserRole(); // Check user role after login
        } else {
          alert('Invalid credentials');
        }
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed');
      }
    },

    async loginAsOwner() {
      this.isOwner = true;
      try {
        const response = await this.$axios.post('http://localhost:3000/api/users/login', {
          email: this.email,
          password: this.password,
        });

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          this.checkUserRole(); // Check if user is an owner
        } else {
          alert('Invalid credentials for owner');
        }
      } catch (error) {
        console.error('Owner login failed:', error);
        alert('Owner login failed');
      }
    },

    checkUserRole() {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwt_decode(token);
        if (decoded.role === 'owner') {
          this.$router.push('/owner-dashboard'); // Redirect to owner dashboard
        } else {
          this.$router.push('/airbnb'); // Regular user page
        }
      }
    },

    goToRegister() {
      this.$router.push('/register');
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
  font-family: 'Arial', sans-serif;
}

h1 {
  font-size: 3em;
  margin-bottom: 20px;
  color: #333;
}

.login-form {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  color: #555;
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

.owner-login {
  margin-top: 20px;
  width: 100%;
}

.register-link {
  margin-top: 20px;
  font-size: 1.1em;
  color: #555;
}

.register-link a {
  color: #4CAF50;
  cursor: pointer;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
