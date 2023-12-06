import { defineStore } from "pinia";
import { ref, computed } from "vue";
import useProductRootStore from "./ProductStore";

export const useOrderService = defineStore("OrderrOOT", () => {
  const order = ref([]);
  const userOrders = ref([]);
  const useProduct = useProductRootStore();
  const allProducts = computed(() => useProduct.products);

  const FETCH_ORDER = async (userId) => {
    const res = await fetch(
      `http://localhost:8095/api/orders/byUserId/${userId}`
    );
    const jsonnew = await res.json();
    userOrders.value = jsonnew;
    let orderHistoryKeyMap = {};
    userOrders.value.forEach((obj) => {
      orderHistoryKeyMap[obj.productId] = {
        ...obj,
      };
    });
    const orderHistory = allProducts.value
      ?.filter((product) => !!orderHistoryKeyMap[product.productId])
      .map((product) => ({
        ...product,
        ...orderHistoryKeyMap[product.productId],
      }));
    order.value = orderHistory;
  };

  const ADD_ORDER = async (OrderItem) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(OrderItem),
    };

    const urlWithUserId = `http://localhost:8095/api/orders/add`;
    const res = await fetch(urlWithUserId, options);
    console.log(res)
  };

  return {
    order,
    FETCH_ORDER,
    ADD_ORDER,
  };
});
export default useOrderService;
