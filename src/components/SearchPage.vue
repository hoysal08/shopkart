<template>
  <div class="card-container">
    <div v-for="product in products" class="card" :key="product.productId" @click="routeMeTo(product.productId)">
      <img :src="product.productImageURL[0]" alt="Image 1" />
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
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import useProductRootStore from "@/store/ProductStore";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const rootStore = useProductRootStore()
    const route = useRoute()
    rootStore.FETCH_PRODUCTS()
    const safeProduct = computed(() => rootStore.products)
    const searchInput = ref("")
    const routeMeTo = (productId) => {
      router.push(`/product/${productId}`).then(() => {
        window.scrollTo({top : 0, behavior : "smooth"})
      });
    };

    watch(route, () => {
      if (route.query?.searchInput) {
        searchInput.value = route.query.searchInput
      }
    })
    const products = computed(() => {
      if (searchInput.value?.length > 0) {
        const res = searchObjects(safeProduct.value, searchInput.value)
        return res
      } else {
        return safeProduct.value
      }
    })

    function getRandomNumberWithTwoDecimals() {
      const min = 3;
      const max = 5;
      const randomNumber = Math.random() * (max - min) + min;
      const roundedNumber = Math.round(randomNumber * 100) / 100;
      return roundedNumber;
    }

    function searchObjects(arrayOfObjects, searchText) {
      const searchTextLc = searchText?.toLowerCase();
      return arrayOfObjects.filter((obj) => {
        return obj.productName?.toLowerCase()?.includes(searchTextLc) ||
          obj.description?.toLowerCase()?.includes(searchTextLc);
      });
    }

    onMounted(() => {
      searchInput.value = route.query.searchInput
    })

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

