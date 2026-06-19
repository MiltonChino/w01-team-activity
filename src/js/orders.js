import { checkLogin } from "../js/auth.mjs";
import currentOrders from "../js/currentOrders.mjs";
import { loadHeaderFooter } from "../js/utils.mjs";

loadHeaderFooter();
const token = checkLogin();
currentOrders("#orders", token);
