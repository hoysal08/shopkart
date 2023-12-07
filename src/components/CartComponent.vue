<template>
    <div class="cart-page min-h ">
        <h2>Your Shopping Cart</h2>
        <!-- {{ cartitems }} heyy -->
        <!-- {{ filteredList }} -->
        <!-- {{ prododListaccCart }} -->
        <div v-if="cartItem.length === 0" class="empty-cart">
            <p>Your cart is empty. Start shopping!</p>
            <button>
                <a href="/">Shop Now</a>
            </button>
        </div>

        <div v-else>
            <div class="main ">
                <h2>Your Cart Items</h2>

                <div v-for="(item, index) in productsAtCart" :key="index" class="containerItem">
                    <div>
                        <div>{{ item?.productName }}</div>
                    </div>
                    <img class="img" :src="item?.productImageURL[0]" alt="">
                    <div>
                        <button @click="decreaseQuantity(item.productId)" class="quantity-button">-</button>
                        <span class="quantity">{{ cartPriceMapping[item.productId].quantity }}</span>
                        <button @click="increaseQuantity(item.productId)" class="quantity-button">+</button>
                    </div>

                    <div>Price: {{ cartPriceMapping[item.productId].price }}</div>
                </div>

            </div>

            <div class="cart-summary">
                <div class="summary-text">
                    <p>Total Items: {{ totalItems }}</p>
                    <p>Total Price: Rs{{ totalPrice.toFixed(2) }}</p>
                </div>
                <button @click="placeOrder" class="checkout-button">Proceed to Checkout</button>
            </div>
        </div>
    </div>
</template>
  
<script>
import { computed, ref, onBeforeMount, onMounted, watch } from 'vue';
import useCartStore from '@/store/cart-store';
import useProductRootStore from '@/store/ProductStore';
import useOrderService from '@/store/order-store'
export default {
    setup() {
        const cartStore = useCartStore();
        const userId = sessionStorage.getItem("userId");
        const cartItem = ref([]);
        const products = ref([]);
        const productStore = useProductRootStore();
        const email = ref("");
        const orderStore = useOrderService();

        const productsAtCart = computed(() => cartStore.getProduct)
        const cartPriceMapping = computed(() => cartStore.cartMap);
        watch(productsAtCart, () => {
            console.log(productsAtCart)
        })
        onMounted(() => {
            cartItem.value.sort((a, b) => {
                return a.productId.localeCompare(b.productId);
            });
        })

        const prododListaccCart = computed(() => cartStore.getProductsId);
        const cartitems = computed(() => cartStore.getCartById);
        cartStore.GET_CAR_BY_ID(userId);
        productStore.FETCH_PRODUCTS();
        onBeforeMount(async () => {
            await cartStore.GET_CAR_BY_ID(userId);
            cartItem.value = cartStore.getCartById;
            products.value = productStore.products;
            console.log(products.value);
            console.log(cartItem.value);

        });

        watch(cartItem, () => {
            console.log(cartItem)
        })

        console.log(orderStore);
        onBeforeMount(() => {
            cartStore.GET_CAR_BY_ID__(userId)
        })

        let cartItemDto = {};
        const totalPrice = computed(() => {
            return cartItem.value.reduce((total, item) => total + item.price * item.quantity, 0);
        });

        const totalItems = computed(() => {
            return cartItem.value.reduce((total, item) => total + item.quantity, 0);
        });

        var orderItemDto = []

        const placeOrder = (() => {
            for (let i = 0; i < cartitems.value.length; i++) {
                const orderItem = {
                    merchantId: cartitems.value[i].merchantId,
                    ostatus: "Ordered",
                    productId: cartitems.value[i].productId,
                    quantity: cartitems.value[i].quantity,
                    totalPrice: cartitems.value[i].quantity * cartitems.value[i].price,
                    userId: userId,
                };

                orderItemDto.push(orderItem);
            }
            console.log(orderItemDto);

            orderStore.ADD_ORDER(orderItemDto)
        })

        const removeItem = (index) => {
            console.log(userId);
            console.log(cartItem.value[index].cartId);
            cartStore.deleteCart(userId, cartItem.value[index].cartId);

        };

        const increaseQuantity = (productId) => {
            cartPriceMapping.value[productId].quantity++;

            cartItemDto = [{
                cartId: cartPriceMapping.value[productId].cartId,
                productId: cartPriceMapping.value[productId].productId,
                merchantId: cartPriceMapping.value[productId].merchantId,
                quantity: cartPriceMapping.value[productId].quantity,
                price: cartPriceMapping.value[productId].price
            }
            ]
            cartStore.UPDATE_CART(cartItemDto, userId);

        };

        const decreaseQuantity = (productId) => {
            if (cartPriceMapping.value[productId].quantity > 1) {
                cartPriceMapping.value[productId].quantity--;
                cartItemDto = [{
                    cartId: cartPriceMapping.value[productId].cartId,
                    productId: cartPriceMapping.value[productId].productId,
                    merchantId: cartPriceMapping.value[productId].merchantId,
                    quantity: cartPriceMapping.value[productId].quantity,
                    price: cartPriceMapping.value[productId].price
                }
                ]
                cartStore.UPDATE_CART(cartItemDto, userId);
            }

        };
        return {
            totalItems,
            totalPrice,
            cartItem,
            cartitems,
            removeItem,
            increaseQuantity,
            decreaseQuantity,
            prododListaccCart,
            placeOrder,
            email,
            productsAtCart,
            cartPriceMapping

        }
    }
};
</script>
  
<style scoped>
.cart-page {
    margin: auto;
    margin-top: 90px;
    max-width: 800px;

    padding: 20px;
}

.empty-cart {
    text-align: center;
    padding: 20px;
}

.empty-cart p {
    font-size: 1.2em;
    margin-bottom: 10px;
}

.containerItem {
    display: flex;
    justify-content: space-between;
    border-style: solid;
    border-width: 2px;
    padding: 10px;
    margin-bottom: 10px;
    flex-direction: row;
    align-items: center;
}

.min-h {
    min-height: 65vh;
}

.empty-cart button {
    background-color: #007BFF;
    color: #fff;
    padding: 10px 20px;
    text-decoration: none;
    border: none;
    font-size: 1em;
    cursor: pointer;
}

.empty-cart button:hover {
    background-color: #0056b3;
}

.cart-page h2 {
    font-size: 1.5em;
    margin-bottom: 20px;
}

.img {
    height: 100px;
    width: 100px;
}

/* 
ul {
    list-style-type: none;
    padding: 0;
}

li {
    border-bottom: 1px solid #ddd;
    padding: 20px;
    display: flex;
    align-items: baseline;
    left: 0;
}

li img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 20px;
}

li div {
    flex-grow: 1;
} */

.quantity-button {
    background-color: #28a745;
    color: #fff;
    border: none;
    padding: 8px 12px;
    font-size: 1em;
    cursor: pointer;
}

.quantity {
    margin: 0 10px;
    font-size: 1.2em;
}

.cart-summary {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}

.checkout-button {
    background-color: #dc3545;
    color: #fff;
    padding: 10px 20px;
    text-decoration: none;
    border: none;
    font-size: 1em;
    cursor: pointer;
}

.checkout-button:hover {
    background-color: #c82333;
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
    color: #27AE27
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


@media screen and (min-width: 360px) and (max-width: 900px) {


    .containerItem {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-content: center;
        gap: 20px;
    }

}
</style>