<template>
    <h1 class="category-cnt">{{ category }} </h1>
    <div class="hero-card-cnt">
        <HomeProductCard v-for="(item, index) in products" :key="index" :product="item" />
    </div>
</template>
<script>
import { defineComponent, computed } from 'vue'
import { useProductRootStore } from "@/store/ProductStore"
import HomeProductCard from "@/components/HomeProductCard.vue"
export default defineComponent({
    props: {
        category: {
            type: String,
            required: true
        }
    },
    components: {
        HomeProductCard
    },
    setup(props) {
        const productStore = useProductRootStore();
        let productsOg = [];
        const products = computed(() => productsOg.value.slice(0, 3))
        switch (props.category) {
            case 'electronics': productStore.FETCH_ELECRONICS_PRODUCTS()
                productsOg = computed(() => productStore.productsOfElectronics);
                break;
            case 'fashion': productStore.FETCH_FASHION_PRODUCTS()
                productsOg = computed(() => productStore.productsOfFashion);
                break;
            case 'book': productStore.FETCH_BOOKS_PRODUCTS()
                productsOg = computed(() => productStore.productsOfBooks);
                break;
        }

        // watch(productsOg, () => {
        //     if (products.value.length > 3) {
        //         console.log("called")
        //         products.value = products.value.slice(0, 3)
        //     }
        // })
        return {
            products
        }
    },
})
</script>
<style scoped>
.category-cnt {
    margin-top: 5rem;
    margin-bottom: 1rem;
    text-transform: capitalize;
}

.hero-card-cnt {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-top: 1rem;
}
@media screen and (min-width: 300px) and (max-width: 900px) {
   
   .hero-card-cnt {
       display: flex;
   margin-top: 1rem;
   flex-direction: column;
   flex-wrap: wrap;
   align-content: center;
}
}
</style>