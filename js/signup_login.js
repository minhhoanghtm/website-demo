//Đăng ký
function signup() {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("pass").value;
    const pass2 = document.getElementById("pass2").value;

    // Kiểm tra nếu thông tin nhập vào còn thiếu
    if (!user || !pass || !pass2) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!user || user.length < 3 || user.length > 20 || !usernameRegex.test(user)) {
        alert("Tên người dùng không hợp lệ!");
        return false;
    }
    // Kiểm tra mật khẩu có đủ độ dài và chứa cả chữ và số
    if (pass.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự.");
        return;
    }
    // Kiểm tra hai mật khẩu có khớp không
    if (pass !== pass2) {
        alert("Mật khẩu không trùng khớp!");
        return;
    }

    // Lấy danh sách người dùng từ localStorage
    let users = JSON.parse(localStorage.getItem("users")) || {};

    // Kiểm tra nếu tài khoản đã tồn tại
    if (users[user]) {
        alert("Tài khoản đã tồn tại!");
        return;
    }

    // Thêm tài khoản mới vào localStorage
    users[user] = pass;
    localStorage.setItem("users", JSON.stringify(users));

    alert("Tạo tài khoản thành công!");
    window.location.href = "login.html";
}


//Đăng nhập
function login() {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("pass").value;

    if (!user || !pass) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[user] && users[user] == pass) {
        alert("Đăng nhập thành công!");
        window.location.href = "../index.html";
    } else {
        alert("Tài khoản hoặc mật khẩu không đúng!");
    }
}