// Danh sách sản phẩm
let products = [
    
];

// Danh sách nhân viên
let employees = [
   
];

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
        expectedOut: '0 ngày'
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
        expectedOut: '0 ngày'
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

window.onload = function() {
    showTab('products');
};