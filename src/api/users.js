import { callApi } from "../components/utils";

export const userLogin = async ({ username, password }) => {
  const data = await callApi({
    method: "POST",
    url: "users/login",
    body: {
      username,
      password,
    },
  });
  return data;
};

export const getAllUsers = async () => {
  const data = await callApi({
    method: "GET",
    url: "users",
  });
  return data;
};

export const getAllCheckoutByUserId = async (userId, token) => {
  const data = await callApi({
    method: 'GET',
    url: `users/${userId}/checkout`,
    token,
  });
  return data;
};
