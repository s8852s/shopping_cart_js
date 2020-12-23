document.addEventListener("DOMContentLoaded", () => {
  new Vue({
    el: '#app',
    data: {
      cartItems: [
        { productName: '老大', quantity: 1, price: 20 },
        { productName: '胖胖', quantity: 1, price: 8.5 },
        { productName: '黑臉', quantity: 1, price: 12.5 }
      ]
    }
  })
})