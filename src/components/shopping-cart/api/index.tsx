import { ShoppingCart } from "../types";

const BASE_URL = "http://localhost:8080/shopping-cart";

async function getById(userId: string): Promise<ShoppingCart> {
  const response = await fetch(`${BASE_URL}/${userId}`, {
    method: "GET",
  });

  return await response.json();
}

type UpdateShoppingCartRequest = {
  bookId: string;
  quantity: number;
};

type UpdateShoppingCartResponse = {
  shoppingCart: ShoppingCart;
};

async function updateShoppingCart(
  userId: string,
  request: UpdateShoppingCartRequest
): Promise<UpdateShoppingCartResponse> {
  const response = await fetch(`${BASE_URL}/${userId}`, {
    method: "PUT",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

async function createShoppingCartElement(
  userId: string,
  request: UpdateShoppingCartRequest
): Promise<UpdateShoppingCartResponse> {
  const response = await fetch(`${BASE_URL}/${userId}`, {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

const client = {
  getById,
  updateShoppingCart,
  createShoppingCartElement,
};

export default client;
