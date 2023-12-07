<template>
  <div class="card-container">
    <div v-for="product in products" class="card" :key="product.productId" @click="routeMeTo(product.productId)">
      <img :src="product.productImageURL[0]" alt="Image 1" />
      <!-- <img v-for="(img,index) in Product.productImageURL" :src="img" :key="index" > -->

      <div class="card-content">

        <h3 class="oneline">{{ product.productName }}</h3>
        <p class="price">Rs. {{ product?.skus?.[0].price }}</p>

        <h3>Rating : {{ getRandomNumberWithTwoDecimals() }} / 5</h3>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { computed, defineComponent, ref, watch } from "vue";
import useProductRootStore from "@/store/ProductStore";
import { useRoute } from "vue-router";
export default defineComponent({
  setup() {
    const rootStore = useProductRootStore();
    const route = useRoute()
    rootStore.FETCH_PRODUCTS()
    let products = computed(() => rootStore.products);
    const safeProduct = computed(() => rootStore.products);
    const searchInput = ref("")
    searchInput.value = route.query.searchInput
    const routeMeTo = (productId) => {
      router.push(`/product/${productId}`);
    };

    function getRandomNumberWithTwoDecimals() {
      const min = 3;
      const max = 5;
      const randomNumber = Math.random() * (max - min) + min;
      const roundedNumber = Math.round(randomNumber * 100) / 100;
      return roundedNumber;
    }
    watch(searchInput, () => {
      if (searchInput.value != "") {
        products.value = searchObjects(safeProduct, searchInput)
      }
      else {
        products.value = safeProduct
      }
    })

    function searchObjects(arrayOfObjects, searchText) {
      searchText = searchText.toLowerCase(); // Convert search text to lowercase for case-insensitive search

      return arrayOfObjects.filter((obj) => {
        for (const key in obj) {
          if (obj[key] && obj[key].toString().toLowerCase().includes(searchText)) {
            return true; // Object contains a property with a matching value
          }
        }
        return false; // No matching properties found in the object
      });
    }

    return {
      routeMeTo,
      products,
      getRandomNumberWithTwoDecimals
    };
  },
});
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 90px;

}

.oneline {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 240px;
}

.card {
  height: 488px;
  width: 300px;
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
  height: 330px;
  border-radius: 10px;
  object-fit: contain;
}

.card-content {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

  .card-content {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

