<template>
    <div class="cart-page">
        <h2>Your Shopping Cart</h2>

        <div v-if="cartItem.length === 0" class="empty-cart">
            <p>Your cart is empty. Start shopping!</p>
            <button>
                <a href="/">Shop Now</a>
            </button>
        </div>

        <div v-else>
            <div>
                <h2>Your Cart Items</h2>
                <ul>
                    <li v-for="(item, index) in cartItem" :key="index">
                        <div>Product ID: {{ item.productId }}</div>
                        <div>Merchant ID: {{ item.merchantId }}</div>
                        <button @click="decreaseQuantity(index)" class="quantity-button">-</button>
                        <span class="quantity">{{ item.quantity }}</span>
                        <button @click="increaseQuantity(index)" class="quantity-button">+</button>
                        <div>Price: {{ item.price }}</div>
                    </li>

                </ul>
            </div>

            <div class="cart-summary">
                <div class="summary-text">
                    <p>Total Items: {{ totalItems }}</p>
                    <p>Total Price: ${{ totalPrice.toFixed(2) }}</p>
                </div>
                <button @click="removeItem" class="checkout-button">Proceed to Checkout</button>
            </div>
        </div>
    </div>
</template>
  
<script>
import { computed, ref, onBeforeMount, onMounted } from 'vue';
import useCartStore from '@/store/cart-store';
// import useProductRootStore from '@/store/ProductStore';
export default {
    setup() {


        const cartStore = useCartStore();
        const userId = sessionStorage.getItem("userId");
        const cartItem = ref([]);

        onMounted(() => {
            cartItem.value.sort((a, b) => {
                return a.productId.localeCompare(b.productId);
            });
        })
        onBeforeMount(async () => {
            
            try {
                await cartStore.GET_CAR_BY_ID(userId);
                cartItem.value = cartStore.getCartById;
                console.log(cartItem.value);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        });

        let cartItemDto = {};
        const totalPrice = computed(() => {
            return cartItem.value.reduce((total, item) => total + item.price * item.quantity, 0);
        });

        const totalItems = computed(() => {
            return cartItem.value.reduce((total, item) => total + item.quantity, 0);
        });

        const removeItem = (index) => {
            // cartItem.value.splice(index, 1);
            // cartItem.value.splice(index, 1);
            console.log(userId);
            console.log(cartItem.value[index].cartId);
            // console.log(cartItem.value[index].cartId);
            cartStore.deleteCart(userId,cartItem.value[index].cartId);

        };
        const increaseQuantity = (index) => {
            cartItem.value[index].quantity++;
            cartItemDto = [{
                cartId: cartItem.value[index].cartId,
                productId: cartItem.value[index].productId,
                merchantId: cartItem.value[index].merchantId,
                quantity: cartItem.value[index].quantity,
                price: cartItem.value[index].price
            }
            ]
            cartStore.UPDATE_CART(cartItemDto, userId);

        };

        const decreaseQuantity = (index) => {
            if (cartItem.value[index].quantity > 1) {
                cartItem.value[index].quantity--;
                cartItemDto = [{
                    cartId: cartItem.value[index].cartId,
                    productId: cartItem.value[index].productId,
                    merchantId: cartItem.value[index].merchantId,
                    quantity: cartItem.value[index].quantity,
                    price: cartItem.value[index].price
                }
                ]
                cartStore.UPDATE_CART(cartItemDto, userId);
            }

        };
        return {
            totalItems,
            totalPrice,
            cartItem,
            removeItem,
            increaseQuantity,
            decreaseQuantity
        }
    }
};
</script>
  
<style scoped>
.cart-page {
    margin: auto;
    max-width: 800px;
    margin-top: 85px;
    padding: 20px;
   
}

.empty-cart {
    text-align: center;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.cart-items {
    margin-top: 20px;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    /* transition: transform 0.3s linear; */
}

/* .cart-item:hover {
    transform: translateY(-5px);
} */

.product-details {
    display: flex;
    align-items: center;
}

.product-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 15px;
    border-radius: 8px;
}

.product-info {
    flex-grow: 1;
}

.price {
    font-weight: bold;
    color: #3498db;
}

.quantity-controls {
    display: flex;
    align-items: center;
}

.quantity-button {
    background-color: #3498db;
    color: #fff;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 4px;
}

.quantity {
    margin: 0 10px;
    font-size: 16px;
}

.total-amount {
    font-weight: bold;
    color: #27ae60;
}

.remove-button {
    background-color: #e74c3c;
    color: #fff;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 4px;
}

.cart-summary {
    margin-top: 20px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.summary-text {
    font-size: 16px;
}

.checkout-button {
    background-color: #3498db;
    color: #fff;
    border: none;
    padding: 12px 24px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 4px;
}
</style>