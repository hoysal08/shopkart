<template>
  <main class="main">
  <h1 class="order">Your Orders</h1>
  <div class="card-container" v-if="isLoggedIn">
    <div v-for="product in products" class="card" :key="product.productId" @click="routeMeTo(product.productId)">
      <img :src="product.productImageURL?.[0]" alt="Image" />
      <div class="card-content">
        <h3 class="oneline">{{ product.productName }}</h3>
        <p class="price">Rs: {{ product.totalPrice }}</p>
        <p>Order Status:{{ product.Ostatus || " Ordered" }}</p>
        <p>Quantity: {{ product.quantity }}</p>
      </div>
    </div>
  </div>
  <div v-else class="min-h">
    <h3>Please login first</h3>
  </div>
</main>
</template>

<script>
import router from "@/router";
import { computed, defineComponent, onBeforeMount, watch } from "vue";
import useProductRootStore from "@/store/ProductStore";
import useAuthStore from "@/store/auth-store.js";
import useOrderService from "@/store/order-store";
export default defineComponent({
  setup() {
    const rootStore = useProductRootStore();
    const authStore = useAuthStore();
    const orderStore = useOrderService();
    rootStore.FETCH_PRODUCTS();
    const allProducts = computed(() => rootStore.products)
    const products = computed(() => orderStore.order)
    const isLoggedIn = computed(() => authStore.userID.length > 0)
    rootStore.FETCH_PRODUCTS()

    watch(allProducts, () => {
      if (isLoggedIn.value && allProducts.value?.length > 0) {
        orderStore.FETCH_ORDER(authStore.userID);
      }
    })
    watch(products, () => {
      console.log(products.value)
    })
    onBeforeMount(() => {
      if (authStore.userID.length > 0) {
        orderStore.FETCH_ORDER(authStore.userID);
      }
    })
    const routeMeTo = (productId) => {
      router.push(`/product/${productId}`);
    };

    return {
      routeMeTo,
      products,
      isLoggedIn
    };
  },
});
</script>

<style scoped>
.main{
  margin-top: 85px;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
 
  margin-top: 20px;

}

.min-h {
  height: 70vh;
}

.oneline {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.card {
  height: 285px;
  width: 190px;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  box-sizing: border-box;
  cursor: pointer;

}

.card img {
  width: 100%;
  height: 70px;
  border-radius: 10px;
  object-fit: contain;
}

.card-content {
  margin-top: 10px;
  text-align: justify;
}

.card-content h3 {
  margin: 5px 0;
}

.price {
  margin: 5px 0;
  font-weight: bold;
}

@media screen and (min-width: 360px) and (max-width: 600px) {
  .card-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 100%;
    background-color: #ffffff;
    border-radius: 15px;
    padding: 15px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    box-sizing: border-box;
    cursor: pointer;
  }
}
</style>

