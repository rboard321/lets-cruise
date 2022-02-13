import { callApi } from "../components/utils";

export const createOrder = async ({
  userId,
  completePurchase,
  productId,
  quantity,
  token,
}) => {
  const data = await callApi({
    method: "POST",
    url: "/orders",
    body: {
      userId,
      completePurchase,
      productId,
      quantity,
    },
    token,
  });
  return data;
};

export const updateQuantity = async (orderId, quantity, token) => {
  const data = await callApi({
    method: "PATCH",

    url: `/orders/${orderId}`,
    body: {
      quantity,
    },
  });
  return data;
};

export const orderDelete = async (orderId, token) => {
  const data = await callApi({
    method: "DELETE",
    url: `/orders/${orderId}`,
    token,
  });
  return data;
};

export const getOrderById = async (userId) => {
  const data = await callApi({
    url: `orders/${userId}`,
  });

  return data;
};

export const fetchAllOrdersByUserId = async (userId, token) => {
  const data = await callApi({
    url: `orders/users/${userId}`,
    token,
  });
  return data;
};

export const getCartByUser = async (userId, token) => {
  const data = await callApi({
    method: "GET",
    url: `/orders/cart/${userId}`,
    token,
  });

  return data;
};

export const destroyCart = async (userId, token) => {
  const data = await callApi({
    method: "DELETE",
    url: `/orders/cart/${userId}`,
    token,
  });

  return data;
};

export const submitCheckout = async (body, token) => {
  const data = await callApi({
    url: `checkout/`,
    method: "POST",
    body,
    token,
  });
  return data;
};
