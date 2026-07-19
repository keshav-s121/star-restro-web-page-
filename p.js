
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


const darkBtn = document.getElementById("darkBtn");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    darkBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

darkBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        darkBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        localStorage.setItem("theme", "light");
        darkBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }

});



let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const cartCount = document.getElementById("cart-count");

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<h3>Your cart is empty.</h3>";
    }

    cart.forEach((item, index) => {

        total += item.price;

        const div = document.createElement("div");

        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.alignItems = "center";
        div.style.padding = "12px";
        div.style.margin = "10px 0";
        div.style.background = "#f5f5f5";
        div.style.borderRadius = "10px";

        if(document.body.classList.contains("dark")){
            div.style.background="#333";
        }

        div.innerHTML = `
            <span>${item.name}</span>

            <span>₹${item.price}</span>

            <button onclick="removeItem(${index})"
            style="
            background:red;
            color:white;
            border:none;
            padding:6px 12px;
            border-radius:6px;
            cursor:pointer;
            ">
            Remove
            </button>
        `;

        cartItems.appendChild(div);

    });

    totalPrice.innerText = total;

    cartCount.innerText = cart.length;

    saveCart();

}

window.removeItem = function(index){

    cart.splice(index,1);

    updateCart();

}


const buttons = document.querySelectorAll(".addCart");

buttons.forEach(button=>{

button.addEventListener("click",()=>{

const name=button.dataset.name;

const price=Number(button.dataset.price);

cart.push({

name,

price

});

updateCart();

alert(name+" added to cart!");

});

});



const paymentModal = document.getElementById("paymentModal");
const closeModal = document.getElementById("closeModal");

const onlineBtn = document.getElementById("onlineBtn");
const offlineBtn = document.getElementById("offlineBtn");

const onlineSection = document.getElementById("onlineSection");
const offlineSection = document.getElementById("offlineSection");

const paidBtn = document.getElementById("paidBtn");

const placeOfflineOrder = document.getElementById("placeOfflineOrder");

const successModal = document.getElementById("successModal");
const successOk = document.getElementById("successOk");

const payTotal = document.getElementById("payTotal");



checkout.addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    payTotal.innerText = totalPrice.innerText;

    paymentModal.style.display = "flex";

    onlineSection.style.display = "none";
    offlineSection.style.display = "none";

});



closeModal.onclick = () => {

    paymentModal.style.display = "none";

};



onlineBtn.onclick = () => {

    onlineSection.style.display = "block";
    offlineSection.style.display = "none";

};



offlineBtn.onclick = () => {

    offlineSection.style.display = "block";
    onlineSection.style.display = "none";

};



paidBtn.onclick = () => {

    paymentModal.style.display = "none";

    successModal.style.display = "flex";

    cart = [];

    updateCart();

};



placeOfflineOrder.onclick = () => {

    const name = document.getElementById("customerName").value.trim();

    const mobile = document.getElementById("customerMobile").value.trim();

    const address = document.getElementById("customerAddress").value.trim();

    if (name === "" || mobile === "" || address === "") {

        alert("Please fill all details.");

        return;

    }

    if (mobile.length < 10) {

        alert("Enter a valid mobile number.");

        return;

    }

    paymentModal.style.display = "none";

    successModal.style.display = "flex";

    cart = [];

    updateCart();

    document.getElementById("customerName").value = "";

    document.getElementById("customerMobile").value = "";

    document.getElementById("customerAddress").value = "";

};



successOk.onclick = () => {

    successModal.style.display = "none";

};

window.onclick = function(e){

    if(e.target===paymentModal){

        paymentModal.style.display="none";

    }

    if(e.target===successModal){

        successModal.style.display="none";

    }

};


document.querySelectorAll("a[href^='#']").forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href"))
.scrollIntoView({

behavior:"smooth"

});

});

});



window.addEventListener("scroll",()=>{

const navbar=document.querySelector(".navbar");

if(window.scrollY>50){

navbar.style.background="rgba(0,0,0,0.9)";

}else{

navbar.style.background="rgba(0,0,0,0.6)";

}

});


updateCart();

const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeLogin = document.querySelector(".close-login");

loginBtn.addEventListener("click", () => {
    loginModal.style.display = "flex";
});

closeLogin.addEventListener("click", () => {
    loginModal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = "none";
    }
});
