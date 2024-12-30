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

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const productCard = button.parentElement; // 獲取當前商品卡片
    const product = {
      id: productCard.dataset.id,
      name: productCard.dataset.name,
      price: parseInt(productCard.dataset.price)
    };

    // 從 localStorage 獲取現有的購物車資料
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // 將商品新增到購物車
    cart.push(product);

    // 將更新後的購物車資料存回 localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // 顯示通知
    const notification = document.getElementById("notification");
    notification.style.display = "block";

    // 3 秒後自動隱藏通知
    setTimeout(() => {
      notification.style.display = "none";
    }, 3000);
  });
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountElement = document.getElementById("cart-count");
  cartCountElement.textContent = cart.length;
}

// 初次載入時更新購物車數量
updateCartCount();


