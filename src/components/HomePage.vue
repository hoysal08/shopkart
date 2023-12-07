<template>
    <div class="hero">
        <div class="hero-cnt-title-cnt">
            <h2 class="hero-cnt-title">
                One Stop Solution for all your needs!
            </h2>
            <div class="hero-points">
                <p class="flex"> <img class="icon" :src="globe">Wide Product Variety</p>
                <p class="flex"> <img class="icon" :src="shield"> Authentic Products</p>
                <p class="flex"> <img class="icon" :src="money">Value for money</p>
            </div>
        </div>
        <hr class="hr-line">
        <h2>Trending Now!</h2>
        <div class="hero-card-cnt">
            <HomeProductCard v-for="(item, index) in topProducts" :key="index" :product="item" />
        </div>
        <button class="action-btn" @click="routeMeToSearch">Shop Now!</button>
        <div class="hero-2">
            <h2 class="deals">Featured Deals</h2>
            <div class="carousel-holder">
                <CarouselComponent />
            </div>
            <CategoryContainer category="electronics" />
            <CategoryContainer category="fashion" />
            <CategoryContainer category="book" />
        </div>
    </div>
</template>

<style scoped>
.icon {
    width: 1.2rem;
    margin: 0.3rem;
}

.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.hero-points {
    display: flex;
    justify-content: center;
}

.hero-points p {
    margin: 0 2rem;
}

.hero-cnt-title {
    padding: 5rem;
}

.hr-line {
    width: 20%;
    margin-bottom: 4rem;
    margin-top: 4rem;
}

.hero-card-cnt{
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-top: 1rem;
}

.hero {
    margin: 3rem
}

.action-btn {
    padding: 0.8rem 2rem;
    border-radius: 1rem;
    border: none;
    background-color: #292D32;
    color: #fff;
    cursor: pointer;
}

.carousel-holder {
    max-height: 2rem;
    margin-bottom: 20rem;
}

.hero-2 {
    margin-top: 3rem;
}
@media screen and (min-width: 360px) and (max-width: 900px) {
   
    .hero-card-cnt {
        display: flex;
    margin-top: 1rem;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
}



    .hero-cnt-title {
    padding: 2rem;
}
    .hero-points {
        display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
.carousel-holder {
   display: none;
}
.hero-2 {
    margin-top: 2rem;
}
.deals{
    display: none;
}
.hr-line {
    width: 20%;
    margin-bottom: 2rem;
    margin-top: 2rem;
}
}

</style>

<script>
import { computed, defineComponent, watch, ref } from 'vue'
import HomeProductCard from "@/components/HomeProductCard.vue"
import CarouselComponent from "@/components/CarouselComponent"
import CategoryContainer from "@/components/CategoryContainer"
import { useProductRootStore } from "@/store/ProductStore"
import globe from "@/assets/globe.svg"
import shield from "@/assets/shield.svg"
import money from "@/assets/money.svg"
import { useRouter } from 'vue-router'
export default defineComponent({
    components: {
        HomeProductCard,
        CarouselComponent,
        CategoryContainer
    },
    setup() {
        const productStore = useProductRootStore();
        productStore.FETCH_PRODUCTS();
        const products = computed(() => productStore.products);
        const router = useRouter();

        let topProducts = ref([]);
        let laterProducts = [];
        watch(products, () => {
            if (products.value && topProducts.value?.length === 0) {
                topProducts.value.push(products.value[0])
                topProducts.value.push(products.value[1])
                topProducts.value.push(products.value[2])
                laterProducts = computed(() => products.value.slice(2));
            }

        })
        const routeMeToSearch = () => {
            
            router.push("/search")
        }
        return {
            products,
            topProducts,
            laterProducts,
            globe,
            shield,
            money,
            routeMeToSearch
        }
    },
})
</script>
