import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

checkoutProcess.init("so-cart", ".checkout-summary");

// Listen for zip code entry to calculate shipping and tax, review solution
const zipInput = document.querySelector("#zip");
if (zipInput) {
    zipInput.addEventListener("change", () => {
        // Only calculate if there's a value entered
        if (zipInput.value.trim() !== "") {
            checkoutProcess.calculateOrdertotal();
        }
    });
    // Also calculate on blur for better UX
    zipInput.addEventListener("blur", () => {
        if (zipInput.value.trim() !== "") {
            checkoutProcess.calculateOrdertotal();
        }
    });
}

// Handle form submission, review solution
const form = document.querySelector("#checkout-form");
if (form) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        try {
            const response = await checkoutProcess.checkout(form);
            console.log("Order submitted successfully:", response);
            // For now, we just log the response as required by the activity instructions
        } catch (err) {
            console.error("Order submission error:", err);
        }
    });
}
