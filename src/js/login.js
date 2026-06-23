import { getParam, loadHeaderFooter } from "./utils.mjs";
import { login } from "./auth.mjs";

loadHeaderFooter();

const redirectUrl = getParam("redirect") || "/orders/index.html";

document.querySelector("#loginButton").addEventListener("click", (event) => {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  login({ email, password }, redirectUrl);
});
