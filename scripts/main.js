document.addEventListener('DOMContentLoaded', () => {
  const removeItemBtns = document.querySelectorAll('.remove-item-btn')

  removeItemBtns.forEach(btn => {
    btn.addEventListener('click', setRemoveItemBtn)
  })

  const inputs = document.querySelectorAll('.cart .quantity')
  inputs.forEach(input => {
    input.addEventListener('change', setQuantity)
  })

  const addItems = document.querySelectorAll('.items .add-item')
  addItems.forEach(addItem => {
    addItem.addEventListener('click', setAddItemBtn)
  })

})

function setRemoveItemBtn(e) {
  const row = e.currentTarget.parentElement.parentElement
  // e.target 被按到的是誰 可能是icon 可能是icon外包的button
  // e.currentTarget 監聽誰  誰就回應我 相對比較精準
  row.remove()

  updateCart()
}

function updateCart() {
  const cartItems = document.querySelectorAll('.cart .cart-item')

  let total = 0
  cartItems.forEach(item => {
    const quantity = item.querySelector('.quantity').value
    const price = item.querySelector('.price').innerText.replace('$', '')
    total = total + (quantity * price)
    console.log(price);
  })

  document.querySelector('.total-price').innerText = `$${total}`
}

function setQuantity (e) {
  const input = e.target
  let quantity = e.target.value
  if (quantity <= 0) {
    quantity = 1
    e.target.value = quantity
  }
  const cartItem = input.parentElement.parentElement
  const price = cartItem.querySelector('.price').innerText.replace('$', '')
  cartItem.querySelector('.subtotal').innerText = `$${quantity * price}`
  updateCart()
  // console.log('hi');
}

function setAddItemBtn(e){
  const product = e.currentTarget.parentElement.parentElement
  const productName = product.querySelector('.product').innerText
  const price = product.querySelector('.price').innerText.replace('$', '')
  console.log(productName)
  console.log(price)
}