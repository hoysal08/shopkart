import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import useProductRootStore from "./ProductStore";

export const useCartStore = defineStore("cart", () => {
  const cartObjectUpdated = reactive({ value: {} });
  const productStore = useProductRootStore();
  const allProducts = computed(() => productStore.products);
  const cartMap = ref({});
  const UPDATE_CART = async (cartItemsDto, userId) => {
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItemsDto),
      };

      const urlWithUserId = `http://10.20.3.164:8095/api/carts/update?userId=${userId}`;
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

    const urlWithUserId = `http://10.20.3.164:8095/api/carts/create?userId=${userId}`;
    const res = await fetch(urlWithUserId, options);
    const jsonRes = await res.json();
    createCart.value = { ...jsonRes };
  };

  const getProductsId = ref({ value: [] });
  const GET_CAR_BY_ID = async (userId) => {
    const urlWithUserId = `http://10.20.3.164:8095/api/carts/${userId}`;
    const res = await fetch(urlWithUserId);
    const jsonRes = await res.json();
    getCartById.value = jsonRes;
    console.log("api done   ");
    const cartProdId = getCartById.value.map((obj) => obj.productId);
    getProductsId.value = allProducts.value?.filter((product) =>
      cartProdId.includes(product.productId)
    );
    let orderHistoryKeyMap = {};
    getCartById.value.forEach((obj) => {
      orderHistoryKeyMap[obj.productId] = {
        ...obj,
      };
    });
    cartMap.value = orderHistoryKeyMap;
  };

  const CREATE_OR_ADD_TO_CART_POST = async (cartItemsDto, userId) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItemsDto),
    };

    const urlWithUserId = `http://10.20.3.164:8095/api/carts/createOrUpdate?userId=${userId}`;
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

      const urlWithCartId = `http://10.20.3.164:8095/api/carts/${userId}/${cartId}`;
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

  const getProductsinCart = ref();
  const getProduct = computed(() => getProductsinCart.value);
  const getCartById = ref([]);

  const GET_CAR_BY_ID__ = async (userId) => {
    const urlWithUserId = `http://10.20.3.164:8095/api/carts/${userId}`;
    const res = await fetch(urlWithUserId);
    const jsonRes = await res.json();
    getCartById.value = jsonRes;
    console.log("api done  cartDone ");
    console.log(jsonRes);
    let prodIds = [];
    for (let i = 0; i < jsonRes.length; i++) {
      const pid = {
        productId: jsonRes[i].productId,
      };
      prodIds.push(pid);
    }

    console.log(prodIds);
    GET_PROD_IN_CART(prodIds);
  };

  const GET_PROD_IN_CART = async (prodIds) => {
    console.log("prod ids", prodIds);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prodIds),
    };
    const urlToApi = "http://localhost:8095/api/carts/getProbyIds";
    const res = await fetch(urlToApi, options);
    const jsonRes = await res.json();
    console.log("Api done getprodinCart");
    console.log("prod", jsonRes);
    getProductsinCart.value = jsonRes;
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
    GET_CAR_BY_ID__,
    getProduct,
    cartMap,
  };
});

export default useCartStore;
