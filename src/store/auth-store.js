import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const state = reactive({
    registerStatus: { value: {} },
  });
  const userJWT = ref(sessionStorage.getItem("jwtToken") || "");
  const userID = ref(sessionStorage.getItem("userId") || "");
  const userName = ref(sessionStorage.getItem("username" || ""));

  const loginUser = async (userCredentials) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      };

      const res = await fetch(
        "http://10.20.3.164:8051/api/auth/login",
        options
      );

      if (!res.ok) {
        console.error("Error during login:", res.status);
        throw new Error(`Error during login: ${res.status}`);
      }

      const token = await res.json();

      return token;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const registerUser = async (userDto) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDto),
      };

      const res = await fetch(
        "http://10.20.3.164:8051/api/users/register",
        options
      );
      const jsonResult = await res.json();

      state.registerStatus = { ...jsonResult };

      return state.registerStatus;
    } catch (error) {
      console.error("Error during user registration:", error);
      state.registerStatus = {
        error:
          "An error occurred during user registration. Please try again later.",
      };
      return state.registerStatus;
    }
  };

  const getUserNameById = async (userId) => {
    const res = await fetch(
      `http://10.20.3.164:8051/api/users/get-user/${userId}`
    );
    const valueee = await res.text();
    console.log(valueee);
    userName.value = valueee;
    sessionStorage.setItem("username", valueee);
  };

  return {
    registerUser,
    loginUser,
    userJWT,
    userID,
    getUserNameById,
    userName
  };
});

export default useAuthStore;
