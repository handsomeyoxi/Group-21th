// script.js (商品列表頁面用)
document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 尋找該按鈕所屬商品卡
      const productCard = btn.closest('.product-card');

      // 讀取 data-* 屬性
      const productId = productCard.dataset.id;
      const productName = productCard.dataset.name;
      const productPrice = parseInt(productCard.dataset.price, 10);
      const productImage = productCard.dataset.image;

      // 從 localStorage 取得已有 cart (若無則空陣列)
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // 檢查該商品是否已存在
      const existingItem = cart.find(item => item.id === productId);

      if (existingItem) {
        // 商品已存在 -> 數量 +1
        existingItem.quantity += 1;
      } else {
        // 不存在 -> 新增一筆
        cart.push({
          id: productId,
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1
        });
      }

      // 更新 localStorage
      localStorage.setItem('cart', JSON.stringify(cart));

      // 給個提示
      alert(`已將「${productName}」加入購物車！`);
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartSubtotalElement = document.getElementById('cart-subtotal');
  const cartTotalElement = document.getElementById('cart-total');

  // 取得購物車資料
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // 更新購物車顯示
  function updateCartDisplay() {
    cartItemsContainer.innerHTML = ''; // 清空舊的商品列表
    let subtotal = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>購物車目前是空的。</p>';
      cartSubtotalElement.textContent = 'NT$ 0';
      cartTotalElement.textContent = 'NT$ 0';
      return;
    }

    cart.forEach((item, index) => {
      // 計算小計
      subtotal += item.price * item.quantity;

      // 動態生成商品項目
      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
      itemElement.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <strong>${item.name}</strong>
          <p>單價: NT$ ${item.price}</p>
          <p>數量: 
            <input type="number" class="item-quantity" data-index="${index}" value="${item.quantity}" min="1">
          </p>
        </div>
        <button class="remove-item" data-index="${index}">移除</button>
      `;

      cartItemsContainer.appendChild(itemElement);
    });

    // 更新小計與總計
    cartSubtotalElement.textContent = `NT$ ${subtotal}`;
    cartTotalElement.textContent = `NT$ ${subtotal}`; // 總計目前等於小計
  }

  // 處理商品數量變更
  cartItemsContainer.addEventListener('input', (e) => {
    if (e.target.classList.contains('item-quantity')) {
      const index = e.target.dataset.index;
      const newQuantity = parseInt(e.target.value, 10);

      if (newQuantity < 1) {
        e.target.value = 1; // 避免數量低於 1
        return;
      }

      // 更新購物車資料
      cart[index].quantity = newQuantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartDisplay();
    }
  });

  // 處理移除商品
  cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
      const index = e.target.dataset.index;

      // 移除指定商品
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartDisplay();
    }
  });

  // 初次載入時更新購物車
  updateCartDisplay();
});


  