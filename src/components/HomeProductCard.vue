<template>
    <div class="home-product-card-cnt" @click="routeMeToProduct(product.productId)">
        <div class="img-cnt">
            <img :src="product.productImageURL[0]" class="product-image" />
        </div>
        <div>
            <p>{{ product.productName }}</p>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    props: {
        product: {
            required: true
        }
    },
    setup() {
        const router = useRouter();
        const routeMeToProduct = (productId) => {
            router.push(`/product/${productId}`).then(() => {
                window.scrollTo({top : 0, behavior : "smooth"})
            })
        }

        return {
            routeMeToProduct
        }
    },
})
</script>

<style scoped>
.img-cnt {
    height: 200px;
    width: 400px;
}

.home-product-card-cnt {
    cursor: pointer;
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* animation: move-x-y 2s infinite; */
}

.product-image img {
    width: 5rem;
    height: 5rem;
}

.icon {
    width: 1.2rem;
    margin: 0.3rem;
}

@keyframes move-x-y {
    0% {
        transform: translateX(5px);
    }

    50% {
        transform: translateY(1px);
    }

    100% {
        transform: translateX(5px);
    }
}





</style>
