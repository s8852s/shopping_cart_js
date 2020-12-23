document.addEventListener('DOMContentLoaded', () => {
  const removeBtns = document.querySelectorAll('.remove-btn')
  // for(let btns of removeBtns) {
  //   btns.addEventListener('click', function() {

  //   })
  // }
  removeBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      let row = e.currentTarget.parentElement.parentElement
      // btn.remove()
      row.remove()
    })
  })
})