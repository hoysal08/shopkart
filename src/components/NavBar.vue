[10:02] C Mukund Reddy
<template>
    <div class="nav-cnt">
        <div class="nav-left">
            <a @click="takeMeHome">ShopKart</a>
            <!-- <router-link to ="/">ShopKart</router-link> -->
        </div>
 
        <div :class="{ 'search-cnt-loggedin': logedIn, 'search-cnt-loggedout': !logedIn }">
            <input type="text" class="search-input" placeholder="Enter your need!">
            <button class="search-button" @click="takeMeToSearch">Search</button>
        </div>
        <div class="nav-right sub-menu" v-if="!signUp" @click="takeMeToSignup">
            <img :src="userIcon" class="icon-new">
            <p class="login-text">signUp</p>
        </div>
        <div class="nav-right sub-menu" v-if="!logedIn" @click="takeMeToLogin">
            <img :src="userIcon" class="icon-new">
            <p class="login-text">LogIn</p>
        </div>
        <div class="nav-right" v-if="logedIn">
            <div class="sub-menu">
                <p @click="takeMeOrder" class="flex"> <img class="icon" :src="ordericon">Orders</p>
                <p class="flex" @click="takeMeToCart"> <img class="icon" :src="shopingcart">Cart</p>
            </div>
            <!-- <img :src="userIcon" class="icon">
            <p>My Profile</p> -->
            <button class="logoutButton" @click="logout">Logout</button>
        </div>
    </div>
</template>
 
<script>
import { defineComponent, computed } from "vue";
import userIcon from "@/assets/userIcon.svg"
import ordericon from "@/assets/ordericon.svg"
import shopingcart from "@/assets/shopingcart.svg"
import { useRouter } from 'vue-router'
import useAuthStore from "@/store/auth-store.js";
 
export default defineComponent({
    setup() {
        const authStore = useAuthStore();
        const isLoggedIn = computed(() => {
            const token = sessionStorage.getItem("jwtToken");
            return token !== null && token.length !== 0;
        })
        const logout = () => {
            sessionStorage.removeItem("jwtToken");
            isLoggedIn.value = false;
            window.location.reload()
        };
        const takeMeToLogin = () => {
            router.push("/login")
        }
        const takeMeToSignup = () => {
            router.push("/register")
        }
        const takeMeToOrders = () => {
            router.push("/orders")
        }
        const takeMeToSearch = () => {
            router.push("/search")
        }
        const takeMeToCart = () =>{
            router.push("/cart")
        }
        const logedIn = computed(() => authStore.userJWT.length > 0)
        const router = useRouter();
        const takeMeHome = () => {
            router.push("/")
        }
        const takeMeOrder =() =>{
            router.push("/orders")
        }
 
 
        return {
            userIcon,
            ordericon,
            shopingcart,
            isLoggedIn,
            logout,
            takeMeHome,
            takeMeOrder,
            logedIn,
            takeMeToLogin,
            takeMeToSignup,
            takeMeToOrders,
            takeMeToSearch,
            takeMeToCart
        }
    },
})
</script>
<style scoped>
.search-cnt-loggedin {
    flex: 0.8;
    padding: auto;
}
 
.search-cnt-loggedout {
    flex: 1;
    margin-right: 300px;
}
 
.logoutButton {
    height: 40px;
    margin: 5px;
    padding: inherit;
    margin-left: 5px;
    background-color: #fff;
    color: #292D32;
    border: 2px solid #292D32;
    border-radius: 5px;
    padding: 4px 4px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}
 
.logoutButton:hover {
    background-color: #292D32;
    color: #fff;
}
 
.nav-cnt {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFFFFF;
    box-shadow: 0px 2px 5px #F3F3f3;
    position: sticky;
    top: 0px;
    z-index: 999;
    
}
 
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
 
.sub-menu {
    display: flex;
    /* margin-right: 2rem; */
}
 
.login-text {
    margin: auto 0.3rem !important;
}
 
.sub-menu p {
    margin: auto 0.8rem;
}
 
.nav-left {
    display: flex;
    cursor: pointer;
}
 
.nav-right {
    display: flex;
    padding: 0 1rem;
    cursor: pointer;
}
 
.icon {
    width: 1.2rem;
    margin: 0.3rem;
}
 
.icon-new {
    width: 1.2rem;
}
 
.search-cnt {
    flex: 0.7;
}
 
.search-input {
    width: 50%;
    border-radius: 1rem;
    border: none;
    padding: 1rem;
    margin: 0.5rem;
    background-color: #F3F3f3;
    z-index: 5;
}
 
.search-button {
    padding: 0.8rem;
    border-radius: 1rem;
    border: none;
    background-color: #292D32;
    color: #fff;
}
 
.nav-cnt a {
    padding: 0 1rem;
    font-weight: 800;
    font-size: 1.1rem;
}
</style>