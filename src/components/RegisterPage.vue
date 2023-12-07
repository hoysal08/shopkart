
<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register" class="form-div">
      <div>
        <div class="email">
          <label> Email: </label>
          <input class="email-input" v-model="email" type="email" required />
          <div v-if="!isEmailValid && email" class="error-message">Email is not valid</div>
        </div>
        <div class="name">
          <label> Name: </label>
          <input class="name-input" v-model="username" type="text" required />
        </div>
        <div class="password">
          <label>Password:</label>
          <input class="password-input" v-model="password" type="password" required />
          <div v-if="!isPasswordValid && password" class="error-message">Enter a valid password</div>
        </div>
      </div>
      <div>
        <button class="button" type="submit" @click="registerUser"><span>Register </span></button>
      </div>
    </form>
  </div>
</template>
    
<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import useAuthStore from "@/store/auth-store.js";

export default {
  setup() {
    const { registerUser, registerStatus } = useAuthStore();
    const email = ref("");
    const password = ref("");
    const username = ref("");
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const isEmailValid = computed(() => emailRegex.test(email.value));
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

    const isPasswordValid = computed(() => passwordRegex.test(password.value));

    const router = useRouter();
    
    const register = async () => {

if(isEmailValid.value && isPasswordValid.value){
  const userDto = {
  userEmail: email.value,
  password: password.value,
  username: username.value,
};

const result = await registerUser(userDto);

if (result && result.error) {
  alert(result.error);
} else {
  alert("Register successful!");
  //Redirect to another page or perform other actions after successful registration
  router.push('/login')
 }
}
};


    return {
      isPasswordValid,
      isEmailValid,
      register,
      email,
      password,
      username,
      registerStatus,
    };
  },
};
</script>
    
<style scoped>
.email {
  margin-top: 10px;
  margin-bottom: 10px;
}

.name {
  margin-top: 10px;
  margin-bottom: 10px;
}

.name-input {
  margin-left: 20px;
}

.email-input {
  margin-left: 20px;
}

.register {
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

.register h2 {
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