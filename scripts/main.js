document.addEventListener("DOMContentLoaded", function(){
  let removeBtns = document.querySelectorAll('.remove-item-btn')
  removeBtns.forEach(removeBtn => {
    removeBtn.addEventListener('click', removeItem)
  })

  let quantityInputs = document.querySelectorAll('.quantity')
  quantityInputs.forEach(quantityInput => {
    quantityInput.addEventListener('change', calcCart)
  })
  let emptyCartBtn = document.querySelector('.empty-cart-btn')
  emptyCartBtn.addEventListener('click', emptyCart)

  let addItems = document.querySelectorAll('.add-item-btn')
  addItems.forEach(addItem => {
    addItem.addEventListener('click', addItemToCart)
  })

});

function removeItem(e){
  e.currentTarget.parentElement.parentElement.remove()
  calcCart()
}

function calcCart(e){
  let cartItems = document.querySelectorAll('.cart-item')
  let totalPrice = document.querySelector('.total-price')
  let total = 0 
  cartItems.forEach(cartItem => {
    let quantity = cartItem.querySelector('.quantity').value
    let price = cartItem.querySelector('.price').innerText.replace('$', '')
    cartItem.querySelector('.sub-total').innerText = `$${price * quantity}`
    total = total + (quantity*price)
  })
  totalPrice.innerText = `$${total}`
}

function emptyCart(e) {
  document.querySelector('tbody').innerHTML = ''
  calcCart()
}

function addItemToCart(e){
  productName = e.currentTarget.parentElement.querySelector('.title').innerText
  const items = document.querySelectorAll('.cart-item')
  for (let i = 0; i < items.length ; i++){
    let item = items[i]
    const cartItemName = item.querySelector('.product-name').innerText
    if (cartItemName == productName){
      item.querySelector('.quantity').value = Number(item.querySelector('.quantity').value) + 1
      calcCart()
      return
    }
  }

  itemList = document.querySelector('.item-list')

  const price = e.currentTarget.parentElement.querySelector('.price').innerText.replace('$', '')
  const row = document.createElement('tr')
  row.classList.add('cart-item')

  row.innerHTML = `
    <td class='product-name'>${productName}</td>
    <td><input class="quantity" min="1" type="number" value="1"></td>
    <td class="price">$${price}</td>
    <td class="sub-total">$${price}</td>
    <td><button class="remove-item-btn btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td>
  `
  itemList.appendChild(row)
  calcCart()
  row.querySelector('.quantity').addEventListener('click', calcCart)
  row.querySelector('.remove-item-btn').addEventListener('click', removeItem)
}