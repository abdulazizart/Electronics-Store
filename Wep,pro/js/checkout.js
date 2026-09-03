
/* ================= GET CART ================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;


/* ================= LOAD CHECKOUT ================= */

function loadCheckout() {

    const checkoutItems = document.getElementById("checkoutItems");

    checkoutItems.innerHTML = "";

    total = 0;

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p style="color:#aaa;">
                Your cart is empty.
            </p>
        `;

        updateTotal();

        return;
    }


    cart.forEach((item) => {

        /*
            Different cart projects may use
            different property names.
        */

        const name = item.name || item.title || "Product";

        const price = Number(item.price) || 0;

        const quantity = Number(item.quantity) || 1;

        const image = item.image || item.img || "";


        const itemTotal = price * quantity;

        total += itemTotal;


        checkoutItems.innerHTML += `

            <div class="checkout-item">

                <img src="${image}" alt="${name}">

                <div class="checkout-item-info">

                    <h4>${name}</h4>

                    <p>
                        Quantity: ${quantity}
                    </p>

                </div>

                <div class="checkout-item-price">

                    $${itemTotal.toFixed(2)}

                </div>

            </div>

        `;

    });


    updateTotal();

    updateCartCount();
}


/* ================= UPDATE TOTAL ================= */

function updateTotal() {

    document.getElementById("subtotal").textContent =
        "$" + total.toFixed(2);

    document.getElementById("total").textContent =
        "$" + total.toFixed(2);

    document.getElementById("payButton").innerHTML = `

        <i class="fa-solid fa-lock"></i>

        Pay $${total.toFixed(2)}

    `;
}


/* ================= CART COUNT ================= */

function updateCartCount() {

    const cartCount = document.getElementById("cartCount");

    if (!cartCount) return;

    let count = 0;

    cart.forEach(item => {

        count += Number(item.quantity) || 1;

    });

    cartCount.textContent = count;
}


/* ================= SELECT PAYMENT ================= */

function selectPayment(method, button) {

    const cardForm = document.getElementById("cardForm");

    const paypalForm = document.getElementById("paypalForm");

    const buttons =
        document.querySelectorAll(".payment-method");


    buttons.forEach(btn => {

        btn.classList.remove("active");

    });


    button.classList.add("active");


    if (method === "card") {

        cardForm.classList.remove("hidden");

        paypalForm.classList.add("hidden");

    }


    if (method === "paypal") {

        cardForm.classList.add("hidden");

        paypalForm.classList.remove("hidden");

    }

}


/* ================= CARD NUMBER ================= */

document.addEventListener("DOMContentLoaded", function () {

    const cardNumber =
        document.getElementById("cardNumber");


    if (cardNumber) {

        cardNumber.addEventListener("input", function () {

            let value =
                cardNumber.value.replace(/\D/g, "");


            value =
                value.substring(0, 16);


            let formatted = "";


            for (let i = 0; i < value.length; i++) {

                if (i > 0 && i % 4 === 0) {

                    formatted += " ";

                }

                formatted += value[i];

            }


            cardNumber.value = formatted;

        });

    }


    /* ================= EXPIRY DATE ================= */

    const expiry =
        document.getElementById("expiry");


    if (expiry) {

        expiry.addEventListener("input", function () {

            let value =
                expiry.value.replace(/\D/g, "");


            value =
                value.substring(0, 4);


            if (value.length >= 3) {

                value =
                    value.substring(0, 2)
                    + "/"
                    + value.substring(2);

            }


            expiry.value = value;

        });

    }


    loadCheckout();

});


/* ================= PROCESS PAYMENT ================= */

function processPayment() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    const cardForm =
        document.getElementById("cardForm");


    const isCardPayment =
        !cardForm.classList.contains("hidden");


    /* ================= CARD VALIDATION ================= */

    if (isCardPayment) {

        const name =
            document.getElementById("cardName").value.trim();

        const cardNumber =
            document.getElementById("cardNumber").value
            .replace(/\s/g, "");

        const expiry =
            document.getElementById("expiry").value.trim();

        const cvv =
            document.getElementById("cvv").value.trim();


        if (!name) {

            alert("Please enter the cardholder name.");

            return;
        }


        if (cardNumber.length !== 16) {

            alert("Please enter a valid 16-digit card number.");

            return;
        }


        if (expiry.length !== 5) {

            alert("Please enter a valid expiry date.");

            return;
        }


        if (cvv.length !== 3) {

            alert("Please enter a valid CVV.");

            return;
        }

    }


    /* ================= SIMULATE PAYMENT ================= */

    const payButton =
        document.getElementById("payButton");


    payButton.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Processing Payment...
    `;


    payButton.disabled = true;


    /*
        This timeout only simulates
        a real payment process.
    */

    setTimeout(() => {

        showSuccess();

    }, 1500);

}


/* ================= SUCCESS ================= */

function showSuccess() {

    const orderNumber =
        Math.floor(100000 + Math.random() * 900000);


    document.getElementById("orderNumber")
        .textContent = orderNumber;


    document.getElementById("successModal")
        .classList.remove("hidden");


    /*
        Clear cart after successful payment.
    */

    localStorage.removeItem("cart");

}


/* ================= FINISH ORDER ================= */

function finishOrder() {

    window.location.href = "index.html";

}

