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
    item.querySelector('.subtotal').innerText = `$${ quantity * price }`

    total += (quantity * price)
  })

  document.querySelector('.total-price').innerText = `$${Math.round(total * 100) / 100 }`
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
  const items = document.querySelectorAll('.cart-item')
  for(let i = 0; i < items.length; i++){
    const item = items[i]
    const title = item.querySelector('.title').innerText
    if (title == productName) {
      item.querySelector('.quantity').value = Number(item.querySelector('.quantity').value) + 1
      updateCart()
      return;
    }
  }
  
  const row = document.createElement('tr')
  row.classList.add('cart-item')
  row.innerHTML = `
  <td class='title'>${productName}</td>
  <td><input type="number" value="1" class="quantity"></td>
  <td class="price">${price}</td>
  <td class="subtotal">${price}</td>
  <td><button class="remove-item-btn btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td>
  `
  const itemList = document.querySelector('.item-list')
  itemList.appendChild(row)

  row.querySelector('.remove-item-btn').addEventListener('click', setRemoveItemBtn)
  row.querySelector('.cart .quantity').addEventListener('change', setQuantity)
  updateCart()
  
}

document.querySelector('.empty-cart-btn').addEventListener('click', emptyCart)

function emptyCart(e){
  document.querySelector('.item-list').innerHTML = ''
  updateCart()
}