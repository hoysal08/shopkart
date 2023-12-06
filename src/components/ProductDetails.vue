<template>
  <div class="container">
    <div class="left-column">
      <img :src="Product?.productImageURL?.[0]" alt="" />
    </div>

    <div class="right-column">
      <div class="product-description">
        <h2>{{ Product?.productName }}</h2>
        <h2>Rs. {{ selectedOption?.price }}</h2>
        <h3>
          Hurry up! only {{ totalStock || 0 }} product left in stock!
        </h3>
        <h3>Rating : {{ review }} / 5</h3>
      </div>
      <div>
        <hr />
      </div>

      <div class="product-configuration">

        <div class="brand">
          <span>Brand :</span>

          <div>{{ Product.attribute?.brand }}</div>
        </div>
        <div class="color">
          <span>Color :</span>

          <div>{{ Product.attribute?.color }}</div>
        </div>
        <div class="description">
          <span>Description :</span>
          <p>{{ Product?.description }}</p>
        </div>
        <div>
          <label>Select an option:</label>
          <div v-for="(option, index) in skus" :key="index">
            <input type="radio" :id="`option${index}`" :value="option" v-model="selectedOption" name="options" />
            <label :for="`option${index}`">{{ option.price }} by {{ `merchant-${index + 1}` }} {{ ` (${reviews[index]}/5)`
            }}</label>
          </div>
        </div>
      </div>
      <div>
        <hr />
      </div>
      <div>
        <a @click="addToCart" class="cart-btn-add">Add to cart</a>
        <a @click="buyNow" class="cart-btn-buy">Buy it Now</a>
      <div class="cart-div">
        <a href="#" class="cart-btn-add">Add to cart</a>
        <a href="#" class="cart-btn-buy">Buy it Now</a>
      </div>
    </div>
 
  <div class="review-container">
    <h2>Customer review</h2>
    <p>No review Yet</p>
    <!-- <div>
      <input placeholder="Write a review" type="text" class="reviewInput">
      <button class="review-submit">Submit</button>
    </div> -->
  </div>
</div>
</template>



<script>
import { computed, defineComponent, ref, watch } from "vue";
import { useRoute } from "vue-router";
import useProductRootStore from "@/store/ProductStore";
import useAuthStore from "@/store/auth-store.js";
import { useRouter } from 'vue-router'
import useCartStore from '@/store/cart-store';
import useOrderService from "@/store/order-store";

export default defineComponent({
  setup() {
    const rootStore = useProductRootStore();
    const authStore = useAuthStore();
    const orderStore = useOrderService();
    const route = useRoute();
    const router = useRouter();
    const cartStore = useCartStore();

    const id = ref(0);
    id.value = route.params.id;

    rootStore.FETCH_PRODUCT_BY_ID(id.value)
    const Product = computed(() => rootStore.LastesProductById.value);
    const totalStock = computed(() => Product.value.skus?.reduce((total, sku) => total + sku.stock, 0));
    const skus = computed(() => Product.value.skus);
    const review = computed(() => getRandomNumberWithTwoDecimals());
    const reviews = computed(() => {
      return skus.value.map(() => getRandomNumberWithTwoDecimals())
    })
    const selectedOption = ref(null)
    const getRandomNumberWithTwoDecimals = () => {
      const min = 3;
      const max = 5;
      const randomNumber = Math.random() * (max - min) + min;
      const roundedNumber = Math.round(randomNumber * 100) / 100;
      return roundedNumber;
    }

    const addToCart = async () => {
      if (authStore.userJWT.length > 0) {
        try {
          const cartItemDTO = {
            productId: id.value,
            merchantId: selectedOption.value.mid,
            quantity: 1,
            price: selectedOption.value.price
          }
          await cartStore.CREATE_OR_ADD_TO_CART_POST(cartItemDTO, authStore.userID)
          alert("Succefully, added cart")
        }
        catch (e) {
          console.log(e);
        }
      }
      else {
        router.push("/login")
      }

    }

    const buyNow = async () => {
      if (authStore.userJWT.length > 0) {
        const OrderItemDTO = {
          merchantId: selectedOption.value.mid,
          productId: id.value,
          userId: authStore.userID,
          oStatus: "Ordered",
          quantity: 1,
          totalPrice: selectedOption.value.price
        }
        const payload = [OrderItemDTO]
        await orderStore.ADD_ORDER(payload);
        alert("Order Place succefully")
      }
      else {
        router.push("/login")
      }
    }

    watch(skus, () => {
      if (selectedOption.value === null) {
        console.log(Product)
        selectedOption.value = skus?.value?.[0]
      }
    })

    return {
      Product,
      totalStock,
      getRandomNumberWithTwoDecimals,
      skus,
      selectedOption,
      review,
      reviews,
      addToCart,
      buyNow
    };
  },
});
</script>
   
<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  margin-top: 90px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;

}

.reviewInput {
  width: 85%;
  padding: 1rem;
  border-radius: 1rem;
}

.review-submit {
  width: 10%;
  margin: auto 0.2rem;
  display: inline-block;
  background-color: #010101;
  border-radius: 20px;
  font-size: 16px;
  color: #ffffff;
  text-decoration: none;
  padding: 12px 30px;
  transition: all 0.5s;
  cursor: pointer;
}

.left-column {
  width: 300px;
  height: 400px;
  margin-right: 100px;
}

.right-column {
  width: 360px;
  height: 400px;
  text-align: justify;
}

.left-column img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  top: 10%;
  object-fit: contain;

  margin: auto;
  border-radius: 25px;
  border: 2px solid #8e918e;
  padding: 20px;
}

.product-description {
  margin-bottom: 20px;
}

.brand div {
  display: inline-block;
  margin-left: 5%;
}

.color div {
  margin-top: 5%;
  display: inline-block;
  margin-left: 5%;
}

.color-choose input[type="radio"]+label span {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin: -1px 4px 0 0;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.33);
}

.color-choose input[type="radio"]#red+label span {
  background-color: #c91524;
}

.color-choose input[type="radio"]#blue+label span {
  background-color: #314780;
}

.color-choose input[type="radio"]#black+label span {
  background-color: #323232;
}

.color-choose input[type="radio"]:checked+label span {
  background-repeat: no-repeat;
  background-position: center;
}

.description {
  margin-top: 5%;
}

.cart-btn-add {
  display: inline-block;
  background-color: #010101;
  border-radius: 20px;
  font-size: 16px;
  color: #ffffff;
  text-decoration: none;
  padding: 12px 30px;
  transition: all 0.5s;
  cursor: pointer;
  text-align: center;
}

.cart-btn-buy {
  display: inline-block;
  background-color: #6f6f6f;
  border-radius: 20px;
  font-size: 16px;
  color: #ffffff;
  text-decoration: none;
  padding: 12px 30px;
  transition: all 0.5s;
  margin-left: 10%;
  cursor: pointer;
  text-align: center;
}

.cart-btn-add:hover {
  background-color: #737373;
  color: #010101;
}

.cart-btn-buy:hover {
  background-color: #926868;
  color: #010101;
}

.review-container {
  margin-top: 15%;
  border-radius: 25px;
  border: 2px solid #8e918e;
  padding: 20px;
  width: 80%;
  margin-left: 10%;
  margin-bottom: 30px;
  text-align: justify;
}

@media screen and (min-width: 360px) and (max-width: 900px) {
  .container {
    display: flex;
   margin-bottom: 5%;
    flex-direction: column;
    align-items: center;
    margin-bottom: 25px;
    
  }

  .left-column {
    margin-top: 10%;

    width: 300px;
    height: 400px;
    margin-left: 8px;
  }

  .right-column {
    margin-top: 20%;

    width: 300px;
    height: 400px;
    margin-left: 8px;
  }

  .review-container {
    margin-top: 85%;

    border-radius: 25px;
    border: 2px solid #8e918e;
    margin-left: -15px;
    padding: 20px;
    /* margin-left: 8px; */
    width: 261px;
  }
  .cart-div{
    display: flex;
    flex-direction: column;
    align-items: stretch;
   
  }
  .cart-btn-add {
  margin-top: 10px;
  width: 200px;
}

.cart-btn-buy {
  margin-top: 10px;
  width: 200px;
  margin-left: 0;
}
}
</style>
   

  