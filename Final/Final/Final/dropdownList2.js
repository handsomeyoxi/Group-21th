document.addEventListener('DOMContentLoaded', () => {
const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
addToCartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
    // 找到對應商品卡片
    const productCard = btn.closest('.product-card');
  
    // 獲取商品數據
    const productId = productCard.dataset.id;
    const productName = productCard.dataset.name;
  
    // 從 localStorage 獲取購物車數據
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // 檢查商品是否已存在於購物車中
    const existingItem = cart.find(item => item.id === productId);
  
    if (existingItem) {
    // 如果存在，數量 +1
    existingItem.quantity += 1;
    } else {
    // 如果不存在，新增商品
        cart.push({
        id: productId,
        name: productName,
        quantity: 1
        });
    }
  
    // 更新購物車數據到 localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    // 顯示通知
    showNotification(`已將「${productName}」加入購物車！`);
    });
});
  
function showNotification(message) {
    // 創建通知元素
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
  
    // 添加到頁面
    document.body.appendChild(notification);
  
    // 使用動畫顯示通知
    setTimeout(() => {
      notification.classList.add('visible');
    }, 100);
  
    // 3 秒後移除通知
    setTimeout(() => {
      notification.classList.remove('visible');
      setTimeout(() => notification.remove(), 500); // 等待動畫結束後移除
    }, 3000);
  }
});  