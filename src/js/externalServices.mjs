const baseURL = `${import.meta.env.VITE_SERVER_URL.replace(/\/$/, "")}/`;

async function convertToJson(res) {
  const jsonResponse = await res.json();

  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  if (!id) {
    throw new Error("No product id provided");
  }
  const response = await fetch(baseURL + `product/${id}`);
  const data = await convertToJson(response);
  return data.Result || data;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "checkout", options).then(convertToJson);
}

export async function loginRequest(user) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  const response = await fetch(baseURL + "login", options).then(convertToJson);
  //console.log("login response", response["accessToken"]);
  return response.accessToken;
}

export async function getOrders(token) {
  //console.log("getting orders with token", token);
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return await fetch(baseURL + "orders", options).then(convertToJson);
}
