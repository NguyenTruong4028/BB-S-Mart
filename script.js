// Danh sách sản phẩm
let products = [
    { 
        code: "SP000001", 
        name: "Dây PE Lá Thông 1M8", 
        sellingPrice: 245000, 
        costPrice: 200000, 
        quantity: 10, 
        createdAt: "2023-10-01", 
        expectedOut: "30 ngày",
        image: "https://via.placeholder.com/150?text=Dây+PE+Lá+Thông"
    },
    { 
        code: "SP000002", 
        name: "Nhánh Thông Lá 5", 
        sellingPrice: 8000, 
        costPrice: 5000, 
        quantity: 50, 
        createdAt: "2023-10-01", 
        expectedOut: "15 ngày",
        image: "https://via.placeholder.com/150?text=Nhánh+Thông"
    },
    { 
        code: "SP000003", 
        name: "Dây PE Lá Bạch 1M8", 
        sellingPrice: 280000, 
        costPrice: 220000, 
        quantity: 8, 
        createdAt: "2023-10-01", 
        expectedOut: "20 ngày",
        image: "https://via.placeholder.com/150?text=Dây+PE+Lá+Bạch"
    },
    { 
        code: "SP000004", 
        name: "Giấy nhún kim tuyến", 
        sellingPrice: 5000, 
        costPrice: 3000, 
        quantity: 100, 
        createdAt: "2023-10-01", 
        expectedOut: "10 ngày",
        image: "https://via.placeholder.com/150?text=Giấy+nhún"
    },
    { 
        code: "SP000005", 
        name: "Dây Thông PE gân", 
        sellingPrice: 280000, 
        costPrice: 230000, 
        quantity: 12, 
        createdAt: "2023-10-01", 
        expectedOut: "25 ngày",
        image: "https://via.placeholder.com/150?text=Dây+Thông+PE"
    },
    { 
        code: "SP000006", 
        name: "Hoa Bông Gòn", 
        sellingPrice: 6000, 
        costPrice: 4000, 
        quantity: 60, 
        createdAt: "2023-10-01", 
        expectedOut: "12 ngày",
        image: "https://via.placeholder.com/150?text=Hoa+Bông+Gòn"
    },
    { 
        code: "SP000007", 
        name: "Giấy gói quà Noel", 
        sellingPrice: 8000, 
        costPrice: 5000, 
        quantity: 80, 
        createdAt: "2023-10-01", 
        expectedOut: "8 ngày",
        image: "https://via.placeholder.com/150?text=Giấy+quà+Noel"
    },
    { 
        code: "SP000008", 
        name: "Cành PE gân Thông", 
        sellingPrice: 60000, 
        costPrice: 45000, 
        quantity: 15, 
        createdAt: "2023-10-01", 
        expectedOut: "18 ngày",
        image: "https://via.placeholder.com/150?text=Cành+PE+Thông"
    }
];

// Danh sách nhân viên
let employees = [];

// Giỏ hàng
let cart = [];

let currentUser = "Ngọc Trinh"; // Placeholder for current user

// Hiển thị danh sách sản phẩm
function displayProducts(filteredProducts = products) {
    const productList = document.getElementById('productList');
    if (!productList) return;
    productList.innerHTML = '';
    filteredProducts.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="table-cell"><input type="checkbox"></td>
            <td class="table-cell">${product.code}</td>
            <td class="table-cell">${product.name}</td>
            <td class="table-cell">${product.sellingPrice.toLocaleString()}</td>
            <td class="table-cell">${product.costPrice.toLocaleString()}</td>
            <td class="table-cell">${product.quantity}</td>
            <td class="table-cell">0</td>
            <td class="table-cell">${product.createdAt}</td>
            <td class="table-cell">${product.expectedOut}</td>
        `;
        productList.appendChild(row);
    });
}

// Hiển thị danh sách nhân viên
function displayEmployees(filteredEmployees = employees) {
    const employeeList = document.getElementById('employeeList');
    if (!employeeList) return;
    employeeList.innerHTML = '';
    filteredEmployees.forEach((employee, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="table-cell"><input type="checkbox"></td>
            <td class="table-cell">${employee.id}</td>
            <td class="table-cell">${employee.name}</td>
            <td class="table-cell">${employee.phone}</td>
            <td class="table-cell">${employee.email}</td>
            <td class="table-cell">${employee.role}</td>
            <td class="table-cell">${employee.createdAt}</td>
            <td class="table-cell">
                <button class="action-btn btn-permission" onclick="openPermissionModal(${index})"><i class="fas fa-shield-alt"></i></button>
                <button class="action-btn btn-edit" onclick="openEmployeeModal('edit', ${index})"><i class="fas fa-edit"></i></button>
                <button class="action-btn btn-delete" onclick="deleteEmployee(${index})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        employeeList.appendChild(row);
    });
}

// Hiển thị sản phẩm trong tab Bán hàng
function displaySalesProducts(filteredProducts = products) {
    const salesProductList = document.getElementById('salesProductList');
    if (!salesProductList) return;
    salesProductList.innerHTML = '';
    filteredProducts.forEach((product, index) => {
        const item = document.createElement('div');
        item.className = 'grid-item';
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="grid-item-image">
            <div class="grid-item-price">${product.sellingPrice.toLocaleString()}</div>
            <div class="grid-item-name">${product.name}</div>
            <button class="btn-add-to-cart" onclick="addToCart(${index})"><i class="fas fa-plus btn-icon"></i></button>
        `;
        salesProductList.appendChild(item);
    });
}

// Hiển thị giỏ hàng
function displayCart() {
    const cartList = document.getElementById('cartList');
    if (!cartList) return;
    cartList.innerHTML = '';
    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="table-cell">${index + 1}</td>
            <td class="table-cell">${item.code}</td>
            <td class="table-cell">${item.name}</td>
            <td class="table-cell">
                <input type="number" min="1" value="${item.quantity}" onchange="updateCartQuantity(${index}, this.value)">
            </td>
            <td class="table-cell">${item.sellingPrice.toLocaleString()}</td>
            <td class="table-cell">${(item.sellingPrice * item.quantity).toLocaleString()}</td>
            <td class="table-cell">
                <button class="action-btn btn-delete" onclick="removeFromCart(${index})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        cartList.appendChild(row);
    });
    updateCartTotal();
}

// Cập nhật tổng tiền giỏ hàng
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + item.sellingPrice * item.quantity, 0);
    document.getElementById('cartTotal').textContent = total.toLocaleString();
    document.getElementById('checkoutTotalAmount').textContent = total.toLocaleString();
    document.getElementById('checkoutAmountToPay').textContent = total.toLocaleString();
    document.getElementById('checkoutTotalItems').textContent = cart.length;
    document.getElementById('checkoutPaidAmount').textContent = total.toLocaleString();
    document.getElementById('checkoutCustomerPayment').value = total;
    updatePaymentOptions(); // Update change when total changes
}

// Thêm vào giỏ hàng
function addToCart(index) {
    const product = products[index];
    const existingItem = cart.find(item => item.code === product.code);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    displayCart();
}

// Cập nhật số lượng trong giỏ hàng
function updateCartQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity);
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    displayCart();
}

// Xóa khỏi giỏ hàng
function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

// Mở modal thanh toán
function openCheckoutModal() {
    if (cart.length === 0) {
        showNotification("Giỏ hàng trống!");
        return;
    }
    updateCartTotal();
    document.getElementById('checkoutModal').classList.remove('hidden');
}

// Đóng modal thanh toán
function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.add('hidden');
}

// Cập nhật tùy chọn thanh toán và tính tiền thừa
function updatePaymentOptions() {
    const customerPayment = parseInt(document.getElementById('checkoutCustomerPayment').value) || 0;
    const amountToPay = parseInt(document.getElementById('checkoutAmountToPay').textContent.replace(/[^0-9]/g, '')) || 0;
    const change = customerPayment - amountToPay;

    document.getElementById('checkoutPaidAmount').textContent = customerPayment.toLocaleString();
    document.getElementById('checkoutChangeAmount').textContent = change >= 0 ? change.toLocaleString() : "0";
}

// Đặt số tiền gợi ý
function setPaymentAmount(amount) {
    document.getElementById('checkoutCustomerPayment').value = amount;
    updatePaymentOptions();
}

// Hiển thị thông báo
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.querySelector('span').textContent = message;
    notification.classList.remove('hidden');
    setTimeout(() => {
        notification.classList.add('hidden');
        if (message === "Hóa đơn được cập nhật thành công") {
            openInvoiceModal();
        }
    }, 3000); // Ẩn sau 3 giây
}

// Xác nhận thanh toán
function confirmCheckout() {
    const customerPayment = parseInt(document.getElementById('checkoutCustomerPayment').value) || 0;
    const amountToPay = parseInt(document.getElementById('checkoutAmountToPay').textContent.replace(/[^0-9]/g, '')) || 0;
    const change = customerPayment - amountToPay;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    if (customerPayment < amountToPay) {
        showNotification("Số tiền khách trả không đủ!");
        return;
    }

    showNotification("Hóa đơn được cập nhật thành công");
    cart = [];
    closeCheckoutModal();
    displayCart();
}

// Mở modal nhập số tiền thực tế
function openActualPaymentModal() {
    const amountToPay = parseInt(document.getElementById('checkoutAmountToPay').textContent.replace(/[^0-9]/g, '')) || 0;
    document.getElementById('actualPaymentInput').value = amountToPay;
    document.getElementById('actualPaymentModal').classList.remove('hidden');
}

// Đóng modal nhập số tiền thực tế
function closeActualPaymentModal() {
    document.getElementById('actualPaymentModal').classList.add('hidden');
}

// Đặt số tiền gợi ý trong modal nhập số tiền thực tế
function setActualPaymentAmount(amount) {
    document.getElementById('actualPaymentInput').value = amount;
}

// Xác nhận số tiền thực tế và cập nhật vào "Khách trả tiền"
function confirmActualPayment() {
    const actualPayment = parseInt(document.getElementById('actualPaymentInput').value) || 0;
    document.getElementById('checkoutCustomerPayment').value = actualPayment;
    updatePaymentOptions();
    closeActualPaymentModal();
}

// Mở modal thêm/sửa sản phẩm
function openModal(type, index = null) {
    const modal = document.getElementById('modal');
    const form = document.getElementById('productForm');
    const title = document.getElementById('modalTitle');

    modal.classList.remove('hidden');
    form.reset();
    if (type === 'add') {
        title.textContent = 'Thêm hàng';
        form.onsubmit = (e) => addProduct(e);
    } else if (type === 'edit' && index !== null) {
        title.textContent = 'Sửa hàng';
        const product = products[index];
        document.getElementById('productCode').value = product.code;
        document.getElementById('productBarcode').value = product.barcode;
        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productBrand').value = product.brand;
        document.getElementById('location').value = product.location;
        document.getElementById('costPrice').value = product.costPrice;
        document.getElementById('sellingPrice').value = product.sellingPrice;
        document.getElementById('quantity').value = product.quantity;
        document.getElementById('weight').value = product.weight;
        document.getElementById('weightUnit').value = product.weightUnit;
        document.getElementById('directSell').checked = product.directSell;
        form.onsubmit = (e) => updateProduct(e, index);
    }
}

// Đóng modal sản phẩm
function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

// Thêm sản phẩm
function addProduct(e) {
    e.preventDefault();
    const product = {
        code: document.getElementById('productCode').value || `SP${Date.now()}`,
        name: document.getElementById('productName').value,
        barcode: document.getElementById('productBarcode').value,
        category: document.getElementById('productCategory').value,
        brand: document.getElementById('productBrand').value,
        location: document.getElementById('location').value,
        costPrice: parseInt(document.getElementById('costPrice').value) || 0,
        sellingPrice: parseInt(document.getElementById('sellingPrice').value) || 0,
        quantity: parseInt(document.getElementById('quantity').value) || 0,
        weight: parseInt(document.getElementById('weight').value) || 0,
        weightUnit: document.getElementById('weightUnit').value,
        directSell: document.getElementById('directSell').checked,
        createdAt: new Date().toLocaleString(),
        expectedOut: '0 ngày',
        image: "https://via.placeholder.com/150?text=" + encodeURIComponent(document.getElementById('productName').value)
    };
    products.push(product);
    displayProducts();
    closeModal();
}

// Sửa sản phẩm
function updateProduct(e, index) {
    e.preventDefault();
    products[index] = {
        code: document.getElementById('productCode').value,
        name: document.getElementById('productName').value,
        barcode: document.getElementById('productBarcode').value,
        category: document.getElementById('productCategory').value,
        brand: document.getElementById('productBrand').value,
        location: document.getElementById('location').value,
        costPrice: parseInt(document.getElementById('costPrice').value) || 0,
        sellingPrice: parseInt(document.getElementById('sellingPrice').value) || 0,
        quantity: parseInt(document.getElementById('quantity').value) || 0,
        weight: parseInt(document.getElementById('weight').value) || 0,
        weightUnit: document.getElementById('weightUnit').value,
        directSell: document.getElementById('directSell').checked,
        createdAt: products[index].createdAt,
        expectedOut: '0 ngày',
        image: products[index].image
    };
    displayProducts();
    closeModal();
}

// Các chức năng lưu và điều hướng sản phẩm
function saveAndLink() {
    addProduct(event);
    openModal('add');
}

function saveAndAddNew() {
    addProduct(event);
    openModal('add');
}

function saveAndCopy() {
    addProduct(event);
    openModal('add');
}

// Mở modal thêm/sửa nhân viên
function openEmployeeModal(type, index = null) {
    const modal = document.getElementById('employeeModal');
    const form = document.getElementById('employeeForm');
    const title = document.getElementById('employeeModalTitle');

    modal.classList.remove('hidden');
    form.reset();
    if (type === 'add') {
        title.textContent = 'Thêm nhân viên';
        form.onsubmit = (e) => addEmployee(e);
    } else if (type === 'edit' && index !== null) {
        title.textContent = 'Sửa nhân viên';
        const employee = employees[index];
        document.getElementById('employeeCode').value = employee.id;
        document.getElementById('employeeName').value = employee.name;
        document.getElementById('employeePhone').value = employee.phone;
        document.getElementById('employeeEmail').value = employee.email;
        document.getElementById('employeeRole').value = employee.role;
        form.onsubmit = (e) => updateEmployee(e, index);
    }
}

// Đóng modal nhân viên
function closeEmployeeModal() {
    document.getElementById('employeeModal').classList.add('hidden');
}

// Thêm nhân viên
function addEmployee(e) {
    e.preventDefault();
    const employee = {
        id: `NV${Date.now()}`,
        name: document.getElementById('employeeName').value,
        phone: document.getElementById('employeePhone').value,
        email: document.getElementById('employeeEmail').value,
        role: document.getElementById('employeeRole').value,
        permissions: { viewProducts: false, editProducts: false, viewSales: false, manageEmployees: false },
        createdAt: new Date().toLocaleString()
    };
    employees.push(employee);
    displayEmployees();
    closeEmployeeModal();
}

// Sửa nhân viên
function updateEmployee(e, index) {
    e.preventDefault();
    employees[index] = {
        id: document.getElementById('employeeCode').value,
        name: document.getElementById('employeeName').value,
        phone: document.getElementById('employeePhone').value,
        email: document.getElementById('employeeEmail').value,
        role: document.getElementById('employeeRole').value,
        permissions: employees[index].permissions,
        createdAt: employees[index].createdAt
    };
    displayEmployees();
    closeEmployeeModal();
}

// Xóa nhân viên
function deleteEmployee(index) {
    if (confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
        employees.splice(index, 1);
        displayEmployees();
    }
}

// Mở modal phân quyền
function openPermissionModal(index) {
    const modal = document.getElementById('permissionModal');
    const form = document.getElementById('permissionForm');
    const employee = employees[index];

    document.getElementById('employeeNameDisplay').textContent = employee.name;
    document.getElementById('viewProducts').checked = employee.permissions.viewProducts;
    document.getElementById('editProducts').checked = employee.permissions.editProducts;
    document.getElementById('viewSales').checked = employee.permissions.viewSales;
    document.getElementById('manageEmployees').checked = employee.permissions.manageEmployees;

    form.onsubmit = (e) => updatePermissions(e, index);
    modal.classList.remove('hidden');
}

// Đóng modal phân quyền
function closePermissionModal() {
    document.getElementById('permissionModal').classList.add('hidden');
}

// Cập nhật quyền nhân viên
function updatePermissions(e, index) {
    e.preventDefault();
    employees[index].permissions = {
        viewProducts: document.getElementById('viewProducts').checked,
        editProducts: document.getElementById('editProducts').checked,
        viewSales: document.getElementById('viewSales').checked,
        manageEmployees: document.getElementById('manageEmployees').checked
    };
    closePermissionModal();
}

// Chuyển tab
function showTab(tabName) {
    const tabs = document.getElementsByClassName('tab-content');
    for (let tab of tabs) {
        tab.classList.add('hidden');
    }
    document.getElementById('sidebar').classList.add('hidden');

    const selectedTab = document.getElementById(`${tabName}-tab`);
    if (selectedTab) {
        selectedTab.classList.remove('hidden');
    }

    if (tabName === 'products') {
        document.getElementById('sidebar').classList.remove('hidden');
        displayProducts();
    } else if (tabName === 'employees') {
        displayEmployees();
    } else if (tabName === 'sales') {
        displaySalesProducts();
        displayCart();
    }

    const navItems = document.getElementsByClassName('nav-item');
    for (let item of navItems) {
        item.classList.remove('active');
    }
    event.target.classList.add('active');
}

// Lọc sản phẩm
function filterProducts() {
    const filterValue = document.querySelector('#sidebar select').value;
    let filteredProducts = products;
    if (filterValue !== 'all') {
        filteredProducts = products.filter(product => {
            if (filterValue === 'product') return true;
            if (filterValue === 'service') return product.unit === 'service';
            if (filterValue === 'combo') return product.unit === 'combo';
            return false;
        });
    }
    displayProducts(filteredProducts);
}

// Tìm kiếm sản phẩm
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.code.toLowerCase().includes(searchTerm) ||
        product.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}

// Tìm kiếm nhân viên
function searchEmployees() {
    const searchTerm = document.getElementById('employeeSearchInput').value.toLowerCase();
    const filteredEmployees = employees.filter(employee =>
        employee.id.toLowerCase().includes(searchTerm) ||
        employee.name.toLowerCase().includes(searchTerm) ||
        employee.phone.toLowerCase().includes(searchTerm) ||
        employee.email.toLowerCase().includes(searchTerm)
    );
    displayEmployees(filteredEmployees);
}

// Tìm kiếm sản phẩm trong tab Bán hàng
function searchSalesProducts() {
    const searchTerm = document.getElementById('salesSearchInput').value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.code.toLowerCase().includes(searchTerm) ||
        product.name.toLowerCase().includes(searchTerm)
    );
    displaySalesProducts(filteredProducts);
}

// Mở modal in hóa đơn
function openInvoiceModal() {
    const invoiceItems = document.getElementById('invoiceItems');
    invoiceItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${(item.sellingPrice * item.quantity).toLocaleString()}</td>
        `;
        invoiceItems.appendChild(row);
        total += item.sellingPrice * item.quantity;
    });

    const customerPayment = parseInt(document.getElementById('checkoutCustomerPayment').value) || 0;
    const change = customerPayment - total;

    document.getElementById('invoiceTotal').textContent = total.toLocaleString();
    document.getElementById('invoiceFinalTotal').textContent = total.toLocaleString();
    document.getElementById('invoicePaid').textContent = customerPayment.toLocaleString();
    document.getElementById('invoiceChange').textContent = change.toLocaleString();

    document.getElementById('invoiceModal').classList.remove('hidden');
}

// Đóng modal in hóa đơn
function closeInvoiceModal() {
    document.getElementById('invoiceModal').classList.add('hidden');
}

// In hóa đơn
function printInvoice() {
    const invoiceContent = document.querySelector('.invoice-preview').innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = `
        <div class="invoice-preview">${invoiceContent}</div>
    `;
    window.print();
    document.body.innerHTML = originalContent;
    closeInvoiceModal();
}

window.onload = function() {
    showTab('products');
};