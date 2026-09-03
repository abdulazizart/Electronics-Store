// =====================================================
// ELECTRONICS STORE - SHOPPING CART
// =====================================================


// -----------------------------------------------------
// Get cart from localStorage
// -----------------------------------------------------

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// -----------------------------------------------------
// Save cart
// -----------------------------------------------------

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// -----------------------------------------------------
// Update cart number in Navbar
// -----------------------------------------------------

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) {
        return;
    }


    // Calculate total quantity

    let totalQuantity = 0;

    cart.forEach(function(product) {

        totalQuantity += product.quantity;

    });


    cartCount.textContent = totalQuantity;

}


// -----------------------------------------------------
// Add product to cart
// -----------------------------------------------------

function addToCart(product) {

    // Check if product already exists

    const existingProduct = cart.find(function(item) {

        return item.name === product.name;

    });


    if (existingProduct) {

        // Product already exists
        // Increase quantity

        existingProduct.quantity++;

    }

    else {

        // Product does not exist
        // Add it to cart

        cart.push({

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    // Save changes

    saveCart();


    // Update number in navbar

    updateCartCount();


    // Show message

    alert(
        product.name + " added to cart!"
    );

}


// -----------------------------------------------------
// Add to Cart Buttons
// -----------------------------------------------------

const addButtons =
    document.querySelectorAll(
        ".cart-btn, .btn-contact"
    );


addButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const product = {

                name:
                    button.dataset.name,

                price:
                    Number(button.dataset.price),

                image:
                    button.dataset.image

            };


            addToCart(product);

        }
    );

});


// -----------------------------------------------------
// Display Cart
// -----------------------------------------------------

function displayCart() {

    const cartBody =
        document.getElementById("cartBody");


    // If we are not on cart page
    // stop the function

    if (!cartBody) {

        return;

    }


    const emptyMessage =
        document.getElementById("emptyCartMsg");


    const cartTable =
        document.getElementById("cartTable");


    const totalElement =
        document.getElementById("cartTotalAmount");


    // Clear old rows

    cartBody.innerHTML = "";


    // If cart is empty

    if (cart.length === 0) {

        emptyMessage.style.display = "block";

        cartTable.classList.add(
            "cart-hidden"
        );

        totalElement.textContent =
            "0.00";

        return;

    }


    // Cart has products

    emptyMessage.style.display =
        "none";

    cartTable.classList.remove(
        "cart-hidden"
    );


    let total = 0;


    // Create a row for each product

    cart.forEach(function(product, index) {


        // Calculate product total

        const productTotal =
            product.price *
            product.quantity;


        // Add to total

        total += productTotal;


        // Create table row

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    width="100">

            </td>


            <td>

                ${product.name}

            </td>


            <td>

                <button
                    class="quantity-btn"
                    onclick="decreaseQuantity(${index})">

                    -

                </button>


                <span
                    style="
                    margin: 0 10px;
                    font-weight: bold;
                    ">

                    ${product.quantity}

                </span>


                <button
                    class="quantity-btn"
                    onclick="increaseQuantity(${index})">

                    +

                </button>

            </td>


            <td>

                $${productTotal.toFixed(2)}

            </td>


            <td>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})">

                    Remove

                </button>

            </td>

        `;


        cartBody.appendChild(row);

    });


    // Show final total

    totalElement.textContent =
        total.toFixed(2);

}


// -----------------------------------------------------
// Increase quantity
// -----------------------------------------------------

function increaseQuantity(index) {

    cart[index].quantity++;


    saveCart();


    displayCart();


    updateCartCount();

}


// -----------------------------------------------------
// Decrease quantity
// -----------------------------------------------------

function decreaseQuantity(index) {

    // If quantity is more than 1
    // decrease it

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    }

    else {

        // If quantity is 1
        // remove the product

        cart.splice(index, 1);

    }


    saveCart();


    displayCart();


    updateCartCount();

}


// -----------------------------------------------------
// Remove product
// -----------------------------------------------------

function removeFromCart(index) {

    cart.splice(index, 1);


    saveCart();


    displayCart();


    updateCartCount();

}


// -----------------------------------------------------
// Checkout
// -----------------------------------------------------

const checkoutButton =
    document.getElementById("checkoutBtn");


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function() {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty!"
                );

                return;

            }


            alert(
                "Thank you for your order!"
            );

        }
    );

}


// -----------------------------------------------------
// Start functions
// -----------------------------------------------------

updateCartCount();

displayCart();



// =====================================================
// LOGIN
// =====================================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                ).value;


            const password =
                document.getElementById(
                    "loginPassword"
                ).value;


            // Get registered user

            const savedUser =
                JSON.parse(
                    localStorage.getItem(
                        "user"
                    )
                );


            // Check user

            if (
                savedUser &&
                savedUser.email === email &&
                savedUser.password === password
            ) {

                localStorage.setItem(
                    "loggedIn",
                    "true"
                );


                alert(
                    "Login successful!"
                );


                window.location.href =
                    "index.html";

            }

            else {

                alert(
                    "Email or password is incorrect."
                );

            }

        }
    );

}


// =====================================================
// REGISTER
// =====================================================

const registerForm =
    document.getElementById(
        "registerForm"
    );


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "registerName"
                ).value;


            const email =
                document.getElementById(
                    "registerEmail"
                ).value;


            const password =
                document.getElementById(
                    "registerPassword"
                ).value;


            // Create user object

            const user = {

                name: name,

                email: email,

                password: password

            };


            // Save user

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );


            alert(
                "Account created successfully!"
            );


            // Go to login

            window.location.href =
                "login.html";

        }
    );

}

function goToCheckout() {
    window.location.href = "checkout.html";
}

// -----------------------------------------------------
// Show logged-in user's name
// -----------------------------------------------------
const welcomeUser = document.getElementById("welcomeUser");
const loginLink = document.getElementById("loginLink");
const registerLink = document.getElementById("registerLink");
const logoutBtn = document.getElementById("logoutBtn");

const savedUser = JSON.parse(localStorage.getItem("user"));
const loggedIn = localStorage.getItem("loggedIn");

if (savedUser && loggedIn === "true") {

    welcomeUser.textContent = "Welcome, " + savedUser.name;

    loginLink.style.display = "none";
    registerLink.style.display = "none";

} else {

    welcomeUser.style.display = "none";
    logoutBtn.style.display = "none";
}

// -----------------------------------------------------
// Logout
// -----------------------------------------------------

function logout() {

    // Remove login status
    localStorage.removeItem("loggedIn");

    // Go back to login page
    window.location.href = "login.html";
}