import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useProductRootStore = defineStore("productRoot", () => {
  const products = ref([]);
  const LastesProductById = reactive({ value: {} });
  const productsOfElectronics = ref([]);
  const productsOfBooks = ref([]);
  const productsOfFashion = ref([]);

  const FETCH_PRODUCTS = async () => {
    const res = await fetch("http://localhost:8099/api/products/all");
    const jsonnew = await res.json();
    products.value = jsonnew;
  };
  const FETCH_ELECRONICS_PRODUCTS = async () => {
    const res = await fetch(
      "http://localhost:8099/api/products/by-category/Electronics"
    );
    const jsonnew = await res.json();
    productsOfElectronics.value = jsonnew;
  };
  const FETCH_BOOKS_PRODUCTS = async () => {
    const res = await fetch(
      "http://localhost:8099/api/products/by-category/Books"
    );
    const jsonnew = await res.json();
    productsOfBooks.value = jsonnew;
  };
  const FETCH_FASHION_PRODUCTS = async () => {
    const res = await fetch(
      "http://localhost:8099/api/products/by-category/Fashion"
    );
    const jsonnew = await res.json();
    productsOfFashion.value = jsonnew;
  };

  const FETCH_PRODUCT_BY_ID = async (productId) => {
    const res = await fetch(`http://localhost:8099/api/products/${productId}`);
    const jsonnew = await res.json();
    LastesProductById.value = { ...jsonnew };
  };

  return {
    products,
    FETCH_PRODUCT_BY_ID,
    FETCH_PRODUCTS,
    LastesProductById,
    FETCH_BOOKS_PRODUCTS,
    FETCH_ELECRONICS_PRODUCTS,
    FETCH_FASHION_PRODUCTS,
    productsOfBooks,
    productsOfElectronics,
    productsOfFashion,
  };

  // const ADD_PRODUCT_REVIEWS = async (review, userId) => {
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(OrderItem),
  //   };

  //   const res = await fetch(
  //     `http://localhost:8099/api/products/${productId}/add-review`
  //   );
  // };
});
export default useProductRootStore;
