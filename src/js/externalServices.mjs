const baseURL = `${import.meta.env.VITE_SERVER_URL.replace(/\/$/, "")}/`;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
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
