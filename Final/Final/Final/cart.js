const menuIcon = document.getElementById('menuIcon');
const dropdownList = document.getElementById('dropdownList');

// 狀態變數控制顯示或隱藏
let isDropdownVisible = false;

// 點擊漢堡選單，切換顯示/隱藏下拉選單
menuIcon.addEventListener('click', () => {
  isDropdownVisible = !isDropdownVisible;
  dropdownList.style.display = isDropdownVisible ? 'block' : 'none';
});

// 當滑鼠移出下拉選單範圍時，隱藏選單
dropdownList.addEventListener('mouseleave', () => {
  isDropdownVisible = false;
  dropdownList.style.display = 'none';
});
    
    document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
    addToCartButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const productCard = event.target.closest('.product-card');
        const productId = productCard.dataset.id;
        const productName = productCard.dataset.name;
        const productPrice = parseFloat(productCard.dataset.price);
        const productImage = productCard.querySelector('img').src;
  
        const existingProductIndex = cartItems.findIndex(item => item.id === productId);
  
        if (existingProductIndex !== -1) {
          // 商品已存在，更新數量
          cartItems[existingProductIndex].quantity += 1;
        } else {
          // 新商品，新增進購物車
          cartItems.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
          });
        }
  
        // 更新 localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
        // 顯示已加入購物車的提示
        alert(`${productName} 已加入購物車！`);
      });
    });
  });
  
    // 更新購物車顯示
    function updateCartDisplay() {
      cartItemsContainer.innerHTML = ''; // 清空容器
      let subtotal = 0;
  
      if (cartItems.length === 0) {
        // 顯示空購物車訊息
        emptyCartMessage.style.display = 'block';
        checkoutButton.style.display = 'none';
        summaryItems[0].textContent = '$0'; // 小計
        summaryItems[2].textContent = '$0'; // 總計
        return;
      }
  
      emptyCartMessage.style.display = 'none'; // 隱藏空購物車訊息
      checkoutButton.style.display = 'block'; // 顯示結帳按鈕
  
      cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
  
        itemElement.innerHTML = `
          <div class="item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="item-details">
            <h3 class="cart-item-name">${item.name}</h3>
            <p class="cart-item-price">NT$ ${item.price}</p>
            <input type="number" class="cart-item-quantity" value="${item.quantity}" min="1" data-index="${index}">
          </div>
          <div class="item-right">
            <p class="item-total">小計：NT$ ${(item.price * item.quantity).toFixed(2)}</p>
            <button class="remove-item" data-index="${index}">移除</button>
          </div>
        `;
  
        cartItemsContainer.appendChild(itemElement);
        subtotal += item.price * item.quantity; // 累計總金額
      });
  
      // 更新小計與總計
      updateSummary(subtotal);
    }
  
    // 更新小計與總計
    function updateSummary(subtotal) {
      const shipping = 0; // 固定運費，可自行修改
      const total = subtotal + shipping;
  
      summaryItems[0].textContent = `$${subtotal.toFixed(2)}`; // 小計
      summaryItems[2].textContent = `$${total.toFixed(2)}`; // 總計
    }
  
    // 監聽數量變更
    cartItemsContainer.addEventListener('input', (e) => {
      if (e.target.classList.contains('cart-item-quantity')) {
        const index = e.target.dataset.index;
        const newQuantity = parseInt(e.target.value, 10);
  
        if (newQuantity < 1) {
          e.target.value = 1; // 限制數量最小值
          return;
        }
  
        cartItems[index].quantity = newQuantity;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartDisplay();
      }
    });
  
    // 監聽移除商品按鈕
    cartItemsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-item')) {
        const index = e.target.dataset.index;
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartDisplay();
      }
    });
  
    updateCartDisplay(); // 初始化顯示
  