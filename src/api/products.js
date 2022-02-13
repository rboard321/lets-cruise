import { callApi } from "../components/utils";

export const getAllProducts = async () => {
  const data = await callApi({
    method: "GET",
    url: `/products`,
  });
  return data;
};

export const createProduct = async ({
  title,
  description,
  price,
  inventory,
  category,
  imgurl,
  instock,
  token,
}) => {
  const data = await callApi({
    method: "POST",
    url: "/products",
    body: {
      title,
      description,
      price,
      inventory,
      instock,
      category,
      imgurl,
    },
    token,
  });
  return data;
};

export const getProductById = async (id) => {
  const data = await callApi({
    method: "GET",
    url: `products/${id}`,
  });

  return data;
};

export const editItem = async (body, token) => {
  const data = await callApi({
    method: "PATCH",
    url: `products/admin`,
    body,
    token,
  });
  return data;
};
