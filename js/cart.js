document.addEventListener('DOMContentLoaded', function() {
    const icon = document.getElementById('openCartModal');
    const modalElement = document.getElementById('cartModal');
    const modal = new bootstrap.Modal(modalElement);

    icon.addEventListener('click', function(e) {
        e.preventDefault();
        modal.show(); // Chỉ gọi 1 lần
    });

    modalElement.addEventListener('hidden.bs.modal', function() {
        document.body.classList.remove('modal-open');
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
    });

    // Đảm bảo giỏ hàng được cập nhật từ localStorage khi trang được tải lại
    updateCartModal();
});

// Giỏ hàng (được lưu trữ trong bộ nhớ và localStorage)
var cart = JSON.parse(localStorage.getItem('cartItems')) || [];

// Gắn sự kiện vào tất cả các biểu tượng giỏ hàng
document.querySelectorAll('.cart-icon').forEach(function(cartIcon) {
    cartIcon.addEventListener('click', function() {
        // Lấy thông tin sản phẩm từ thuộc tính data- của phần tử cha
        const productElement = this.closest('.new-product-1');
        const productName = productElement.getAttribute('data-product-name');
        const productPrice = parseInt(productElement.getAttribute('data-product-price'));

        // Gọi hàm addToCart với tên và giá trị của sản phẩm
        addToCart(productName, productPrice);
    });
});

// Thêm sản phẩm vào giỏ hàng
function addToCart(productName, productPrice) {
    // Thêm sản phẩm vào giỏ hàng
    cart.push({ name: productName, price: productPrice });

    // Cập nhật giỏ hàng trong localStorage
    localStorage.setItem('cartItems', JSON.stringify(cart));

    // Cập nhật giỏ hàng trong modal
    updateCartModal();
    alert(productName + ' đã được thêm vào giỏ hàng.');
}

// Cập nhật giỏ hàng trong modal
function updateCartModal() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    // Xóa nội dung cũ trong giỏ hàng
    cartItemsElement.innerHTML = '';

    let totalPrice = 0;
    cart.forEach(product => {
        const productItem = document.createElement('li');
        productItem.classList.add('list-group-item', 'd-flex', 'justify-content-between');
        productItem.innerHTML = `${product.name} <span>${product.price.toLocaleString()}$</span>`;
        cartItemsElement.appendChild(productItem);

        totalPrice += product.price;
    });

    // Cập nhật tổng giá trị
    cartTotalElement.textContent = totalPrice.toLocaleString() + '$';
}

// Hàm mở modal giỏ hàng
function openCartModal() {
    let cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

// Thanh toán
function thanhToan() {
    // Lấy giỏ hàng từ localStorage
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống!");
        return;
    }

    // Xử lý thanh toán (giả lập)
    alert("Thanh toán thành công!");

    // Xoá giỏ hàng trong localStorage sau khi thanh toán
    localStorage.removeItem('cartItems');

    // Cập nhật lại giỏ hàng trong modal sau khi thanh toán
    cart = []; // Giỏ hàng sẽ trở về rỗng sau khi thanh toán
    updateCartModal();

    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = ''; // Xóa tất cả các phần tử trong modal giỏ hàng

    // Cập nhật lại tổng giá trị trong modal
    const cartTotalElement = document.getElementById('cart-total');
    cartTotalElement.textContent = '0$';
}