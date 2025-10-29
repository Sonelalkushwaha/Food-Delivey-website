// var swiper = new Swiper(".mySwiper", {
//       loop:true,
//       navigation: {
//         nextEl: "#prev",
//         prevEl: "#next",
//       },
//     });





// const carticonEl = document.querySelector(".cart-icon");
// const cartTabEl = document.querySelector(".cart-tab");
// const closebtnEl = document.querySelector(".close-btn")
// const cardListEl = document.querySelector(".card-list")
// const cartListEl = document.querySelector(".cart-list")
// const cartTotalEl = document.querySelector(".cart-total")

// carticonEl.addEventListener("click" , () => {
//     cartTabEl.classList.add("cart-tab-active")
// })

// closebtnEl.addEventListener("click" , () => {
//     cartTabEl.classList.remove("cart-tab-active")
// })



// let productList = [];
// let cartProduct = [];


// const updateTotals = () =>{
//   let totalPrice = 0;
  
//   document.querySelectorAll(".item").forEach(item =>{
//     const price = item.querySelector("item-total").textContent.replace("₹", "");

//     totalPrice += price;
//   })
//   cartTotalEl.textContent = `₹${totalPrice}`
// }

// const showCards = () =>{

//     productList.forEach(product =>{

//         const orderCard = document.createElement("div")
//         orderCard.classList.add("order-card");

//         orderCard.innerHTML = `<div class="card-image">
//                                   <img src="${product.image}" alt="">
//                                 </div>
//                                    <h4>
//                                       ${product.name}
//                                     </h4>
//                                     <h4 class="price">${product.price}</h4>
//                                     <a href="#" class="btn card-btn">Add to Cart</a>`; 
//       cardListEl.appendChild(orderCard);

//       const cardBtnEl = orderCard.querySelector(".card-btn");
//       cardBtnEl.addEventListener("click", (e) => {
//         e.preventDefault()
//         addToCart(product);
//       })
                                  
//     })
// }

// const addToCart = (product)=>{

//       const existingProduct = cartProduct.find(item => item.id === product.id)
//         if(existingProduct){

//           alert("Item already in your cart")
//           return;
//         }

//         cartProduct.push(product);

//         let quantity = 1; 
//         let price = parseFloat(product.price.replace("₹",""))

//       const cartItemEl = document.createElement("div")
//       cartItemEl.classList.add("item");
//       cartItemEl.innerHTML = ` <div class="item-image">
//                                     <img src="${product.image}">
//                                 </div>
//                                 <div class="detail">
//                                     <h4>${product.name}</h4>
//                                     <h4 class="item-total">${product.price}</h4>
//                                 </div>
//                                 <div class="flex">
//                                     <a href="#" class="quantity-btn minus">
//                                         <i class="fa-solid fa-minus"></i>
//                                     </a>
//                                     <h4 class="quantity-value">${quantity}</h4>
//                                     <a href="#" class="quantity-btn plus">
//                                         <i class="fa-solid fa-plus"></i>
//                                     </a>
//                                 </div>`
//       cartListEl.appendChild(cartItemEl);
//       updateTotals();
      
//       const plusBtn = cartItemEl.querySelector(".plus");
//       const quantityValue = cartItemEl.querySelector(".quantity-value");
//       const itmeTotal = cartItemEl.querySelector(".item-total")
//       const minusBtn = cartItemEl.querySelector(".minus");

//       plusBtn.addEventListener("click", (e) => {
//           e.preventDefault()
//           quantity++
//           quantityValue.textContent = quantity;
//           itmeTotal.textContent = `₹${(price * quantity)}`
//       })

//       minusBtn.addEventListener("click" , (e) =>{
//         e.preventDefault()
//         if(quantity > 1){

//           quantity--
//           quantityValue.textContent = quantity;
//           itmeTotal.textContent = `₹${(price * quantity)}`
//         }
//         else{
//           cartItemEl.remove();
//           cartProduct = cartProduct.filter(item => item.id !== product.id);
//         }
//       })
// } 


// const intiApp = () =>{

//   fetch("product.json").then
//   (response => response.json()).then
//   (data =>{
//     productList = data;
//    showCards();
//   })

// }
// intiApp()






// 🌀 Swiper setup
var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: "#next", // swapped — make sure your HTML IDs match
    prevEl: "#prev",
  },
});

// 🛒 Cart functionality
const carticonEl = document.querySelector(".cart-icon");
const cartTabEl = document.querySelector(".cart-tab");
const closebtnEl = document.querySelector(".close-btn");
const cardListEl = document.querySelector(".card-list");
const cartListEl = document.querySelector(".cart-list");
const cartTotalEl = document.querySelector(".cart-total");
const cartValueEl = document.querySelector(".cart-value");
const hamburgerEl = document.querySelector(".hamburger");
const mobileMenuEl = document.querySelector(".mobile-menu");
const barsEl = document.querySelector(".fa-bars");

carticonEl.addEventListener("click", () => {
  cartTabEl.classList.add("cart-tab-active");
});

closebtnEl.addEventListener("click", () => {
  cartTabEl.classList.remove("cart-tab-active");

});

hamburgerEl.addEventListener("click" , ()=>{
  mobileMenuEl.classList.toggle("mobile-menu-active");
})

hamburgerEl.addEventListener("click" , ()=>{
  barsEl.classList.toggle("fa-xmark");
})



let productList = [];
let cartProduct = [];

// ✅ Corrected: function to calculate total price
const updateTotals = () => {
  let totalPrice = 0;
  let totalQuantity = 0;

  document.querySelectorAll(".item").forEach((item) => {
    
       const quantity = parseInt(item.querySelector(".quantity-value").textContent);

    const priceText = item.querySelector(".item-total").textContent.replace("₹", "").trim();

    const price = parseFloat(priceText);

    if (!isNaN(price)) totalPrice += price;

    if (!isNaN(quantity)) totalQuantity += quantity;
  });

  cartTotalEl.textContent = `₹${totalPrice.toFixed(2)}`;
  cartValueEl.textContent = totalQuantity;
};

// ✅ Display all products
const showCards = () => {
  productList.forEach((product) => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("order-card");

    orderCard.innerHTML = `
      <div class="card-image">
        <img src="${product.image}" alt="">
      </div>
      <h4>${product.name}</h4>
      <h4 class="price">${product.price}</h4>
      <a href="#" class="btnn card-btn">Add to Cart</a>
    `;

    cardListEl.appendChild(orderCard);

    const cardBtnEl = orderCard.querySelector(".card-btn");
    cardBtnEl.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(product);
    });
  });
};

// ✅ Add product to cart
const addToCart = (product) => {
  const existingProduct = cartProduct.find((item) => item.id === product.id);
  if (existingProduct) {
    alert("Item already in your cart");
    return;
  }

  cartProduct.push(product);

  let quantity = 1;
  let price = parseFloat(product.price.replace("₹", ""));

  const cartItemEl = document.createElement("div");
  cartItemEl.classList.add("item");
  cartItemEl.innerHTML = `
    <div class="item-image">
      <img src="${product.image}">
    </div>
    <div class="detail">
      <h4>${product.name}</h4>
      <h4 class="item-total">₹${price}</h4>
    </div>
    <div class="flex">
      <a href="#" class="quantity-btn minus">
        <i class="fa-solid fa-minus"></i>
      </a>
      <h4 class="quantity-value">${quantity}</h4>
      <a href="#" class="quantity-btn plus">
        <i class="fa-solid fa-plus"></i>
      </a>
    </div>
  `;

  cartListEl.appendChild(cartItemEl);
  updateTotals();

  const plusBtn = cartItemEl.querySelector(".plus");
  const quantityValue = cartItemEl.querySelector(".quantity-value");
  const itemTotal = cartItemEl.querySelector(".item-total");
  const minusBtn = cartItemEl.querySelector(".minus");

  // ✅ Quantity increase
  plusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    quantity++;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `₹${(price * quantity).toFixed(2)}`;
    updateTotals();
  });

  // ✅ Quantity decrease / remove
  minusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;
      itemTotal.textContent = `₹${(price * quantity).toFixed(2)}`;
      updateTotals();
    } else {
      cartItemEl.remove();
      cartProduct = cartProduct.filter((item) => item.id !== product.id);
      updateTotals();
    }
  });
};

// ✅ Initialize app
const intiApp = () => {
  fetch("product.json")
    .then((response) => response.json())
    .then((data) => {
      productList = data;
      showCards();
    })
    .catch((err) => console.error("Error loading products:", err));
};

intiApp();
