<!-- Login.vue -->
<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login" class="form-div">
      <div>
        <div class="email">
          <label> Email: </label>
          <input class="email-input" v-model="username" type="text" required />
        </div>
        <div class="password">
          <label>Password: </label>
          <input class="password-input" v-model="password" type="password" required />
        </div>
      </div>
      <div>
        <button class="button" type="submit"><span>Login </span></button>
      </div>
    </form>
  </div>
</template>
  
<script>
import { defineComponent, ref, reactive, toRefs } from "vue";
import useAuthStore from "@/store/auth-store.js";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const username = ref("");
    const password = ref("");
    const authStore = useAuthStore();

    const router = useRouter();
    const state = reactive({
      isLoggedIn: false,
    });


    const login = async () => {
      try {
        const userCredentials = {
          username: username.value,
          password: password.value,
        };

        // Call your backend API for authentication
        const token = await authStore.loginUser(userCredentials);
        // console.log(token);
        // Check if the token is received
        if (token) {
          sessionStorage.setItem("jwtToken", token.token);
          sessionStorage.setItem("userId", token.userId)
          authStore.userJWT = token.token
          authStore.userID = token.userId
          alert("Login successful!");
          state.isLoggedIn = true;
          router.push('/')

          // Redirect to another page or perform other actions after successful login
        } else {
          alert("Invalid username or password");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again later.");
      }
    };

    return {
      login,
      username,
      password,
      ...toRefs(state)
    };
  },
});
</script>
  
<style scoped>
.email {
  margin-top: 10px;
  margin-bottom: 10px;
}

.email-input {
  margin-left: 20px;
}

.login {
  background: #b5b4b4;
  width: 300px;
  height: 400px;
  margin: auto;
  border-radius: 25px;
  border: 2px solid #8e918e;
  padding: 20px;
  margin-top: 100px;
  margin-bottom: 100px;
}

.login h2 {
  text-align: center;
}

.form-div {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  padding: 15px;
  height: 200px;
  align-items: center;
}

.button {
  border-radius: 50px;
  background-color: #696766;
  border: none;
  color: #ffffff;
  text-align: center;
  font-size: 20px;
  padding: 10px;
  width: 150px;
  transition: all 0.5s;
  cursor: pointer;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: "\00bb";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}

label {
  margin-bottom: 8px;
}
</style>