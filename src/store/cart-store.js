import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import useProductRootStore from "./ProductStore";

export const useCartStore = defineStore("cart", () => {
  const cartObjectUpdated = reactive({ value: {} });
  const productStore = useProductRootStore();
  const allProducts = computed(() => productStore.products);
  const UPDATE_CART = async (cartItemsDto, userId) => {
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItemsDto),
      };

      const urlWithUserId = `http://localhost:8095/api/carts/update?userId=${userId}`;
      const res = await fetch(urlWithUserId, options);
      console.log(res);
      const jsonRes = await res.json();
      cartObjectUpdated.value = { ...jsonRes };
    } catch (error) {
      console.error("Error During resgistration");
    }
  };

  const createCart = reactive({ value: {} });
  const CREATE_CART_POST = async (cartItemsDto, userId) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItemsDto),
    };

    const urlWithUserId = `http://localhost:8095/api/carts/create?userId=${userId}`;
    const res = await fetch(urlWithUserId, options);
    const jsonRes = await res.json();
    createCart.value = { ...jsonRes };
  };

  const getCartById = ref({ value: [] });
  const getProductsId = ref({ value: [] });
  const GET_CAR_BY_ID = async (userId) => {
    const urlWithUserId = `http://localhost:8095/api/carts/${userId}`;
    const res = await fetch(urlWithUserId);
    const jsonRes = await res.json();
    getCartById.value = jsonRes;
    console.log("api done   ");
    const cartProdId = getCartById.value.map((obj) => obj.productId);
    getProductsId.value = allProducts.value?.filter((product) =>
      cartProdId.includes(product.productId)
    );
    // console.log(getCartById);
  };
  const CREATE_OR_ADD_TO_CART_POST = async (cartItemsDto, userId) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItemsDto),
    };

    const urlWithUserId = `http://localhost:8095/api/carts/createOrUpdate?userId=${userId}`;
    const res = await fetch(urlWithUserId, options);
    console.log(res);
  };

  const deleteCart = async (userId, cartId) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const urlWithCartId = `http://localhost:8095/api/carts/${userId}/${cartId}`;
      const res = await fetch(urlWithCartId, options);

      if (res.ok) {
        console.log(`Cart with ID ${cartId} deleted successfully`);
      } else {
        console.error(
          `Error deleting cart with ID ${cartId}: ${res.statusText}`
        );
      }
    } catch (error) {
      console.error("Error during delete request:", error);
    }
  };

  return {
    cartObjectUpdated,
    UPDATE_CART,
    createCart,
    CREATE_CART_POST,
    getCartById,
    GET_CAR_BY_ID,
    deleteCart,
    getProductsId,
    CREATE_OR_ADD_TO_CART_POST,
  };
});

export default useCartStore;
