<!-- Login.vue -->
<template>
  <div class="login">
  <h2>Login</h2>
  <form @submit.prevent="login" class="form-div">
  <div>
  <div class="email">
  <label> Email : </label>
  <input class="email-input" v-model="email" type="text" required />
  <div v-if="email && !isEmailValid"  class="error-message">Email is not valid</div>
  </div>
  <div class="password">
  <label>Password: </label>
  <input class="password-input" v-model="password" type="password" required />
  <div v-if="!isPasswordValid && password" class="error-message">Enter a valid password</div>
  </div>
  </div>
  <div class="new-user">
  <div>
  <button class="button" type="submit"><span>Login </span></button>
  </div>
  <div>
  <p>New User?</p>
  <div class="regbutton">
    <button class="button1" type="submit" @click="takeMeToResgistraion"><span>Register </span></button>
  </div>
  </div>
</div>
  </form>
  </div>
  </template>
   
  <script>
  import { defineComponent, ref, computed} from "vue";
  import useAuthStore from "@/store/auth-store.js";
  import { useRouter } from "vue-router";
   
  export default defineComponent({
    setup() {
      const email = ref("");
      const password = ref("");
      const authStore = useAuthStore();
      const router = useRouter();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
      const isLoggedIn = ref(false)

      // const state = reactive({
      //   isLoggedIn: false,
      //   isEmailValid: true,
      //   isPasswordValid: true,
      // });
      const isEmailValid = computed(() => emailRegex.test(email.value));
      const isPasswordValid = computed(() => passwordRegex.test(password.value));

   
      const login = async () => {
   
        // Custom password validation (at least 8 characters)
   
        if (isEmailValid.value && isPasswordValid.value) {
          // Continue with login logic
          try {
            const userCredentials = {
              username: email.value,
              password: password.value,
            };
   
            // Call your backend API for authentication
            const token = await authStore.loginUser(userCredentials);
   
            // Check if the token is received
            if (token) {
              sessionStorage.setItem("jwtToken", token.token);
              sessionStorage.setItem("userId", token.userId);
              authStore.userJWT = token.token;
              alert("Login successful!");
              isLoggedIn.value = true;
              router.push('/');
              // Redirect to another page or perform other actions after successful login
            } else {
              alert("Invalid username or password");
            }
          } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again later.");
          }
        }
      };

      function takeMeToResgistraion(){
        router.push("/register")
          }

          
   
      return {
        isEmailValid,
        // isEmailValid,
        isPasswordValid,
        login,
        email,
        password,
        // ...toRefs(state),
        takeMeToResgistraion
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
  border-radius: 7px;
}
.password-input{
  border-radius: 7px;
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
.new-user{
  margin-top: 150px;
    margin-left: -245px;
}

.error-message{
  color:red;
  
}
.button1{
  border-radius: 10px;
  cursor: pointer;
}
.regbutton :hover{
   background-color: black;
   color: white;
}

.button {
  border-radius: 50px;
  background-color: #696766;
  border: none;
  color: #ffffff;
  text-align: center;
  font-size: 20px;
  padding: 5px;
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