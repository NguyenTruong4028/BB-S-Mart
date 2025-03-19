// Danh sách sản phẩm
let products = [];

// Danh sách nhân viên
let employees = [];

// Thêm hàm xóa sản phẩm
function deleteProduct(index) {
  if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
    products.splice(index, 1);
    displayProducts();
  }
}

// Cập nhật hàm hiển thị sản phẩm để thêm nút sửa và xóa
function displayProducts(filteredProducts = products) {
  const productList = document.getElementById("productList");
  if (!productList) return;
  productList.innerHTML = "";
  filteredProducts.forEach((product, index) => {
    const row = document.createElement("tr");
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
            <td class="table-cell">
                <div style="display: flex; justify-content: flex-start;">
                    <button class="action-btn btn-edit" onclick="openModal('edit', ${index})"><i class="fas fa-edit"></i></button>
                    <button class="action-btn btn-delete" onclick="deleteProduct(${index})"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;
    productList.appendChild(row);
  });
}

// Hiển thị danh sách nhân viên
function displayEmployees(filteredEmployees = employees) {
  const employeeList = document.getElementById("employeeList");
  if (!employeeList) return;
  employeeList.innerHTML = "";
  filteredEmployees.forEach((employee, index) => {
    const row = document.createElement("tr");
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
  const modal = document.getElementById("modal");
  const form = document.getElementById("productForm");
  const title = document.getElementById("modalTitle");

  modal.classList.remove("hidden");
  form.reset();
  if (type === "add") {
    title.textContent = "Thêm hàng";
    form.onsubmit = (e) => addProduct(e);
  } else if (type === "edit" && index !== null) {
    title.textContent = "Sửa hàng";
    const product = products[index];
    document.getElementById("productCode").value = product.code;
    document.getElementById("productBarcode").value = product.barcode;
    document.getElementById("productName").value = product.name;
    document.getElementById("productCategory").value = product.category;
    document.getElementById("productBrand").value = product.brand;
    document.getElementById("location").value = product.location;
    document.getElementById("costPrice").value = product.costPrice;
    document.getElementById("sellingPrice").value = product.sellingPrice;
    document.getElementById("quantity").value = product.quantity;
    document.getElementById("weight").value = product.weight;
    document.getElementById("weightUnit").value = product.weightUnit;
    document.getElementById("directSell").checked = product.directSell;
    form.onsubmit = (e) => updateProduct(e, index);
  }
}

// Đóng modal sản phẩm
function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

// Thêm sản phẩm
function addProduct(e) {
  e.preventDefault();
  const product = {
    code: document.getElementById("productCode").value || `SP${Date.now()}`,
    name: document.getElementById("productName").value,
    barcode: document.getElementById("productBarcode").value,
    category: document.getElementById("productCategory").value,
    brand: document.getElementById("productBrand").value,
    location: document.getElementById("location").value,
    costPrice: parseInt(document.getElementById("costPrice").value) || 0,
    sellingPrice: parseInt(document.getElementById("sellingPrice").value) || 0,
    quantity: parseInt(document.getElementById("quantity").value) || 0,
    weight: parseInt(document.getElementById("weight").value) || 0,
    weightUnit: document.getElementById("weightUnit").value,
    directSell: document.getElementById("directSell").checked,
    createdAt: new Date().toLocaleString(),
    expectedOut: "0 ngày",
  };
  products.push(product);
  displayProducts();
  closeModal();
}

// Sửa sản phẩm
function updateProduct(e, index) {
  e.preventDefault();
  products[index] = {
    code: document.getElementById("productCode").value,
    name: document.getElementById("productName").value,
    barcode: document.getElementById("productBarcode").value,
    category: document.getElementById("productCategory").value,
    brand: document.getElementById("productBrand").value,
    location: document.getElementById("location").value,
    costPrice: parseInt(document.getElementById("costPrice").value) || 0,
    sellingPrice: parseInt(document.getElementById("sellingPrice").value) || 0,
    quantity: parseInt(document.getElementById("quantity").value) || 0,
    weight: parseInt(document.getElementById("weight").value) || 0,
    weightUnit: document.getElementById("weightUnit").value,
    directSell: document.getElementById("directSell").checked,
    createdAt: products[index].createdAt,
    expectedOut: "0 ngày",
  };
  displayProducts();
  closeModal();
}

// Các chức năng lưu và điều hướng sản phẩm
function saveAndLink() {
  addProduct(event);
  openModal("add");
}
function saveAndAddNew() {
  addProduct(event);
  openModal("add");
}
function saveAndCopy() {
  addProduct(event);
  openModal("add");
}

// Mở modal thêm/sửa nhân viên
function openEmployeeModal(type, index = null) {
  const modal = document.getElementById("employeeModal");
  const form = document.getElementById("employeeForm");
  const title = document.getElementById("employeeModalTitle");

  modal.classList.remove("hidden");
  form.reset();
  if (type === "add") {
    title.textContent = "Thêm nhân viên";
    form.onsubmit = (e) => addEmployee(e);
  } else if (type === "edit" && index !== null) {
    title.textContent = "Sửa nhân viên";
    const employee = employees[index];
    document.getElementById("employeeCode").value = employee.id;
    document.getElementById("employeeName").value = employee.name;
    document.getElementById("employeePhone").value = employee.phone;
    document.getElementById("employeeEmail").value = employee.email;
    document.getElementById("employeeRole").value = employee.role;
    form.onsubmit = (e) => updateEmployee(e, index);
  }
}

// Đóng modal nhân viên
function closeEmployeeModal() {
  document.getElementById("employeeModal").classList.add("hidden");
}

// Thêm nhân viên
function addEmployee(e) {
  e.preventDefault();
  const employee = {
    id: `NV${Date.now()}`,
    name: document.getElementById("employeeName").value,
    phone: document.getElementById("employeePhone").value,
    email: document.getElementById("employeeEmail").value,
    role: document.getElementById("employeeRole").value,
    permissions: {
      viewProducts: false,
      editProducts: false,
      viewSales: false,
      manageEmployees: false,
    },
    createdAt: new Date().toLocaleString(),
  };
  employees.push(employee);
  displayEmployees();
  closeEmployeeModal();
}

// Sửa nhân viên
function updateEmployee(e, index) {
  e.preventDefault();
  employees[index] = {
    id: document.getElementById("employeeCode").value,
    name: document.getElementById("employeeName").value,
    phone: document.getElementById("employeePhone").value,
    email: document.getElementById("employeeEmail").value,
    role: document.getElementById("employeeRole").value,
    permissions: employees[index].permissions,
    createdAt: employees[index].createdAt,
  };
  displayEmployees();
  closeEmployeeModal();
}

// Xóa nhân viên
function deleteEmployee(index) {
  if (confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
    employees.splice(index, 1);
    displayEmployees();
  }
}

// Mở modal phân quyền
function openPermissionModal(index) {
  const modal = document.getElementById("permissionModal");
  const form = document.getElementById("permissionForm");
  const employee = employees[index];

  document.getElementById("employeeNameDisplay").textContent = employee.name;
  document.getElementById("viewProducts").checked =
    employee.permissions.viewProducts;
  document.getElementById("editProducts").checked =
    employee.permissions.editProducts;
  document.getElementById("viewSales").checked = employee.permissions.viewSales;
  document.getElementById("manageEmployees").checked =
    employee.permissions.manageEmployees;

  form.onsubmit = (e) => updatePermissions(e, index);
  modal.classList.remove("hidden");
}

// Đóng modal phân quyền
function closePermissionModal() {
  document.getElementById("permissionModal").classList.add("hidden");
}

// Cập nhật quyền nhân viên
function updatePermissions(e, index) {
  e.preventDefault();
  employees[index].permissions = {
    viewProducts: document.getElementById("viewProducts").checked,
    editProducts: document.getElementById("editProducts").checked,
    viewSales: document.getElementById("viewSales").checked,
    manageEmployees: document.getElementById("manageEmployees").checked,
  };
  closePermissionModal();
}

// Chuyển tab
function showTab(tabName) {
  // Kiểm tra quyền truy cập nếu là tab nhân viên
  if (tabName === "employees" && !hasEmployeeAccess()) {
    alert("Bạn không có quyền truy cập vào mục nhân viên!");
    return;
  }

  const tabs = document.getElementsByClassName("tab-content");
  for (let tab of tabs) {
    tab.classList.add("hidden");
  }
  document.getElementById("sidebar").classList.add("hidden");

  const selectedTab = document.getElementById(`${tabName}-tab`);
  if (selectedTab) {
    selectedTab.classList.remove("hidden");
  }

  if (tabName === "products") {
    document.getElementById("sidebar").classList.remove("hidden");
    displayProducts();
  } else if (tabName === "employees") {
    displayEmployees();
  } else if (tabName === "customers") {
    displayCustomers();
  } else if (tabName === "purchaseHistory") {
    displayOrders();
  }

  const navItems = document.getElementsByClassName("nav-item");
  for (let item of navItems) {
    item.classList.remove("active");
  }
  if (event && event.target) {
    event.target.classList.add("active");
  }
}

// Tìm kiếm sản phẩm
function searchProducts() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const filteredProducts = products.filter(
    (product) =>
      product.code.toLowerCase().includes(searchTerm) ||
      product.name.toLowerCase().includes(searchTerm)
  );
  displayProducts(filteredProducts);
}

// Tìm kiếm nhân viên
function searchEmployees() {
  const searchTerm = document
    .getElementById("employeeSearchInput")
    .value.toLowerCase();
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.id.toLowerCase().includes(searchTerm) ||
      employee.name.toLowerCase().includes(searchTerm) ||
      employee.phone.toLowerCase().includes(searchTerm) ||
      employee.email.toLowerCase().includes(searchTerm)
  );
  displayEmployees(filteredEmployees);
}
window.onload = function () {
  showTab("products");
};

// khach hang va lich su

// Danh sách khách hàng
let customers = [];

// Hiển thị danh sách khách hàng
function displayCustomers(filteredCustomers = customers) {
  const customerList = document.getElementById("customerList");
  if (!customerList) return;

  customerList.innerHTML = "";
  filteredCustomers.forEach((customer, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td class="table-cell"><input type="checkbox"></td>
            <td class="table-cell">${customer.code}</td>
            <td class="table-cell">${customer.name}</td>
            <td class="table-cell">${customer.phone}</td>
            <td class="table-cell">${customer.email}</td>
            <td class="table-cell">${customer.address}</td>
            <td class="table-cell">${customer.createdAt}</td>
             <td class="table-cell">${customer.points}</td>
             <td class="table-cell" style="width: fit-content;">
              <button  onclick="showTab('purchaseHistory')" style="display: flex;" >
              <i class="fas fa-history nav-icon"></i> <span>Lịch sử</span>
              </button>
            </td>
            <td class="table-cell" style="display: flex">
                <button class="action-btn btn-edit" onclick="openCustomerModal('edit', ${index})"><i class="fas fa-edit"></i></button>
                <button class="action-btn btn-delete" onclick="deleteCustomer(${index})"><i class="fas fa-trash"></i></button>
            </td>
        `;
    customerList.appendChild(row);
  });
}

// Mở modal thêm/sửa khách hàng
function openCustomerModal(type, index = null) {
  const modal = document.getElementById("customerModal");
  const form = document.getElementById("customerForm");
  const title = document.getElementById("customerModalTitle");

  modal.classList.remove("hidden");
  form.reset();

  if (type === "add") {
    title.textContent = "Thêm khách hàng";
    form.onsubmit = (e) => addCustomer(e);
  } else if (type === "edit" && index !== null) {
    title.textContent = "Sửa khách hàng";
    const customer = customers[index];

    document.getElementById("customerCode").value = customer.code;
    document.getElementById("customerName").value = customer.name;
    document.getElementById("customerPhone").value = customer.phone;
    document.getElementById("customerEmail").value = customer.email;
    document.getElementById("customerAddress").value = customer.address;
    document.getElementById("customerNote").value = customer.note;

    form.onsubmit = (e) => updateCustomer(e, index);
  }
}

// Đóng modal khách hàng
function closeCustomerModal() {
  console.log("helllo");
  document.querySelector(".exitModal").classList.toggle("active");
  document.querySelector("#confirmExit").addEventListener("click", () => {
    document.querySelector(".exitModal").classList.remove("active");
    document.getElementById("customerModal").classList.add("hidden");
  });
  document.querySelector("#cancelExit").addEventListener("click", () => {
    document.querySelector(".exitModal").classList.remove("active");
  });
}

// Thêm khách hàng mới
function addCustomer(e) {
  e.preventDefault();

  const customer = {
    code: `KH${Date.now()}`,
    name: document.getElementById("customerName").value,
    phone: document.getElementById("customerPhone").value,
    email: document.getElementById("customerEmail").value,
    address: document.getElementById("customerAddress").value,
    note: document.getElementById("customerNote").value,
    points: 0,
    createdAt: new Date().toLocaleString(),
  };

  customers.push(customer);
  displayCustomers();
  closeCustomerModal();
}

// Cập nhật thông tin khách hàng
function updateCustomer(e, index) {
  e.preventDefault();

  customers[index] = {
    code: document.getElementById("customerCode").value,
    name: document.getElementById("customerName").value,
    phone: document.getElementById("customerPhone").value,
    email: document.getElementById("customerEmail").value,
    address: document.getElementById("customerAddress").value,
    note: document.getElementById("customerNote").value,
    points: customers[index].points,
    createdAt: customers[index].createdAt,
  };
  console.log(customers[index]);

  displayCustomers();
  closeCustomerModal();
}

// Xóa khách hàng
function deleteCustomer(index) {
  if (confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
    customers.splice(index, 1);
    displayCustomers();
  }
}

// Tìm kiếm khách hàng
function searchCustomers() {
  const searchTerm = document
    .getElementById("customerSearchInput")
    .value.toLowerCase();

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.code.toLowerCase().includes(searchTerm) ||
      customer.phone.toLowerCase().includes(searchTerm)
    //customer.email.toLowerCase().includes(searchTerm) ||
    //customer.address.toLowerCase().includes(searchTerm)
  );

  displayCustomers(filteredCustomers);
}

// Lưu và thêm mới khách hàng
function saveAndAddNewCustomer() {
  addCustomer(event);
  openCustomerModal("add");
}

// Cập nhật hàm showTab để hiển thị tab khách hàng
function showTab(tabName) {
  const tabs = document.getElementsByClassName("tab-content");
  for (let tab of tabs) {
    tab.classList.add("hidden");
  }
  document.getElementById("sidebar").classList.add("hidden");

  const selectedTab = document.getElementById(`${tabName}-tab`);
  if (selectedTab) {
    selectedTab.classList.remove("hidden");
  }

  if (tabName === "products") {
    document.getElementById("sidebar").classList.remove("hidden");
    displayProducts();
  } else if (tabName === "employees") {
    displayEmployees();
  } else if (tabName === "customers") {
    displayCustomers();
  }

  const navItems = document.getElementsByClassName("nav-item");
  for (let item of navItems) {
    item.classList.remove("active");
  }
  event.target.classList.add("active");
}

// Thêm dữ liệu mẫu cho khách hàng
customers = [
  {
    code: "KH001",
    name: "Nguyễn Văn A",
    phone: "0987654321",
    email: "nguyenvana@example.com",
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    group: "retail",
    note: "",
    points: "175",
    createdAt: "14/03/2025 09:00:00",
  },
  {
    code: "KH002",
    name: "Trần Thị B",
    phone: "0123456789",
    email: "tranthib@example.com",
    address: "456 Đường Nguyễn Huệ, Quận 3, TP.HCM",
    group: "wholesale",
    note: "Khách hàng thường xuyên",
    points: "175",
    createdAt: "14/03/2025 10:15:00",
  },
  {
    code: "KH003",
    name: "Lê Văn C",
    phone: "0909123456",
    email: "levanc@example.com",
    address: "789 Đường Võ Văn Tần, Quận 10, TP.HCM",
    group: "vip",
    note: "Khách hàng VIP",
    points: "175",
    createdAt: "14/03/2025 11:30:00",
  },
];

// Cập nhật hàm onload để hiển thị danh sách khách hàng nếu cần
window.onload = function () {
  showTab("products");
};
const orders = [
  {
    orderId: "001",
    orderDate: "01/01/2023",
    status: "Đã hoàn thành",
    products: [
      {
        productId: "P001",
        productName: "Sản phẩm A",
        quantity: 2,
        price: 100000,
      },
      {
        productId: "P002",
        productName: "Sản phẩm B",
        quantity: 1,
        price: 150000,
      },
    ],
  },
  {
    orderId: "002",
    orderDate: "02/01/2023",
    status: "Đang xử lý",
    products: [
      {
        productId: "P003",
        productName: "Sản phẩm C",
        quantity: 3,
        price: 200000,
      },
    ],
  },

  {
    orderId: "003",
    orderDate: "02/01/2023",

    products: [
      {
        productId: "P003",
        productName: "Sản phẩm C",
        quantity: 3,
        price: 200000,
      },
      {
        productId: "P005",
        productName: "Sản phẩm D",
        quantity: 3,
        price: 300000,
      },
    ],
  },
  {
    orderId: "003",
    orderDate: "02/01/2024",

    products: [
      {
        productId: "P003",
        productName: "Sản phẩm C",
        quantity: 3,
        price: 200000,
      },
      {
        productId: "P005",
        productName: "Sản phẩm D",
        quantity: 3,
        price: 300000,
      },
    ],
  },
  {
    orderId: "003",
    orderDate: "02/01/2025",
    products: [
      {
        productId: "P003",
        productName: "Sản phẩm C",
        quantity: 3,
        price: 200000,
      },
      {
        productId: "P005",
        productName: "Sản phẩm D",
        quantity: 3,
        price: 300000,
      },
    ],
  },
  {
    orderId: "003",
    orderDate: "01/01/2025",
    products: [
      {
        productId: "P003",
        productName: "Sản phẩm C",
        quantity: 3,
        price: 200000,
      },
      {
        productId: "P005",
        productName: "Sản phẩm D",
        quantity: 3,
        price: 300000,
      },
    ],
  },
  // Thêm các đơn hàng khác nếu cần
];
var filteredOrders = [];
var foundOrders = [];
function displayOrders() {
  const purchaseHistoryList = document.getElementById("purchaseHistoryList");
  purchaseHistoryList.innerHTML = ""; // Xóa nội dung cũ

  console.log(filteredOrders);
  var array = [];
  if (filteredOrders.length > 0) {
    array = filteredOrders;
  } else array = orders;
  if (foundOrders.length > 0) {
    array = foundOrders;
  } else array = orders;
  array.forEach((order) => {
    // Tạo phần tử cho đơn hàng
    const orderDiv = document.createElement("div");
    orderDiv.className = "order";

    // Tiêu đề đơn hàng
    const orderTitle = document.createElement("h3");
    orderTitle.className = "order-title";
    orderTitle.textContent = `Đơn hàng #${order.orderId}`;
    orderDiv.appendChild(orderTitle);

    // Tạo bảng cho sản phẩm
    const table = document.createElement("table");
    table.className = "product-table";

    // Tạo tiêu đề bảng
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
      <th class="table-cell">Mã sản phẩm</th>
      <th class="table-cell">Tên sản phẩm</th>
      <th class="table-cell">Số lượng</th>
      <th class="table-cell">Giá</th>
    `;
    headerRow.className = "table-header";
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Tạo thân bảng
    const tbody = document.createElement("tbody");
    order.products.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="table-cell">${product.productId}</td>
        <td class="table-cell">${product.productName}</td>
        <td class="table-cell">${product.quantity}</td>
        <td class="table-cell">${product.price.toLocaleString()} VNĐ</td>
      `;
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    orderDiv.appendChild(table);

    // Thêm thông tin tổng tiền, ngày mua và trạng thái
    const total = order.products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    orderDiv.innerHTML += `
      <p class="order-total">Tổng tiền: ${total.toLocaleString()} VNĐ</p>
      <p class="order-date">Ngày mua: ${order.orderDate}</p>
    `;

    // Thêm đơn hàng vào danh sách
    purchaseHistoryList.appendChild(orderDiv);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  displayOrders();
});

//
function filterOrdersByDateRange() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  // Chuyển đổi ngày bắt đầu và ngày kết thúc thành đối tượng Date
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Lọc các đơn hàng có ngày nằm trong khoảng đã chọn
  filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.orderDate); // Chuyển đổi chuỗi ngày thành đối tượng Date
    console.log(orderDate); // In ra ngày của đơn hàng để kiểm tra
    return orderDate >= start && orderDate <= end; // Kiểm tra xem ngày đơn hàng nằm trong khoảng đã chọn
  });
  console.log(start, end);
  console.log(filteredOrders);
  // Hiển thị các đơn hàng đã lọc
  displayOrders(filteredOrders);

  if (filteredOrders.length === 0) alert("không tìm thấy hóa đơn nào ");
}

// Hàm xóa lọc
function clearFilter() {
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";
  filteredOrders = [];
  displayOrders(orders); // Hiển thị tất cả đơn hàng
}
function searchOrderById() {
  const orderId = document.getElementById("purchaseSearchInput").value.trim(); // Lấy giá trị ID từ trường nhập liệu

  // Tìm kiếm đơn hàng theo ID
  foundOrders = orders.filter((order) => order.orderId === orderId);
  console.log(foundOrders);
  // Hiển thị các đơn hàng đã tìm thấy
  displayOrders();

  // Hiển thị thông báo nếu không tìm thấy đơn hàng nào
  if (foundOrders.length === 0) {
    alert("Không tìm thấy hóa đơn nào.");
  }
}

// Lưu trữ thông tin nhân viên
let users = [
  {
    username: "Truong123",
    password: "Truong123",
    fullName: "Nguyễn Hồng Trường",
    phone: "0365282067",
    email: "truong.nh.0428@gmail.com",
    address: "Thiên đường",
    role: "owner",
    joinDate: "15/01/2025",
    permissions: {
      viewProducts: true,
      editProducts: true,
      viewSales: true,
      manageEmployees: true,
    },
  },
  {
    username: "staff",
    password: "staff123",
    fullName: "Lê Văn Nhân",
    phone: "0987654323",
    email: "staff@example.com",
    address:
      "789 Đường Phạm Ngũ Lão, Phường Phạm Ngũ Lão, Quận 1, TP. Hồ Chí Minh",
    role: "staff",
    joinDate: "15/02/2025",
    permissions: {
      viewProducts: true,
      editProducts: true,
      viewSales: true,
      manageEmployees: false,
    },
  },
  {
    username: "staff2",
    password: "staff456",
    fullName: "Trần Thị Bình",
    phone: "0987654324",
    email: "staff2@example.com",
    address: "456 Đường Hai Bà Trưng, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    role: "staff",
    joinDate: "01/03/2025",
    permissions: {
      viewProducts: true,
      editProducts: true,
      viewSales: true,
      manageEmployees: false,
    },
  },
];

// Người dùng hiện tại
let currentUser = null; // Mặc định chưa đăng nhập

// Hiển thị modal đăng nhập
function showLoginModal() {
  document.getElementById("loginModal").classList.remove("hidden");
}

// Đóng modal đăng nhập
function closeLoginModal() {
  document.getElementById("loginModal").classList.add("hidden");
}

// Hiển thị modal thông tin cá nhân
function showProfileModal() {
  // Cập nhật thông tin người dùng vào modal
  document.getElementById("profileName").textContent = currentUser.fullName;

  const roleElement = document.getElementById("profileRole");
  roleElement.textContent = getRoleDisplayName(currentUser.role);
  roleElement.dataset.role = currentUser.role;

  document.getElementById("profileUsername").textContent = currentUser.username;
  document.getElementById("profilePhone").textContent = currentUser.phone;
  document.getElementById("profileEmail").textContent = currentUser.email;
  document.getElementById("profileAddress").textContent = currentUser.address;
  document.getElementById("profileJoinDate").textContent = currentUser.joinDate;

  document.getElementById("profileModal").classList.remove("hidden");
}

// Đóng modal thông tin cá nhân
function closeProfileModal() {
  document.getElementById("profileModal").classList.add("hidden");
}

// Hiển thị modal chỉnh sửa thông tin
function showEditProfileModal() {
  // Điền thông tin hiện tại vào form
  document.getElementById("editFullName").value = currentUser.fullName;
  document.getElementById("editPhone").value = currentUser.phone;
  document.getElementById("editEmail").value = currentUser.email;
  document.getElementById("editAddress").value = currentUser.address;
  document.getElementById("editPassword").value = "";

  // Hiển thị modal
  closeProfileModal();
  document.getElementById("editProfileModal").classList.remove("hidden");
}

// Đóng modal chỉnh sửa thông tin
function closeEditProfileModal() {
  document.getElementById("editProfileModal").classList.add("hidden");
}

// Chuyển đổi mã cấp bậc sang tên hiển thị
function getRoleDisplayName(role) {
  switch (role) {
    case "owner":
      return "Chủ cửa hàng";
    case "staff":
      return "Nhân viên";
    default:
      return "Không xác định";
  }
}

// Xử lý đăng nhập
function handleLogin(e) {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    currentUser = user;
    updateProfileDisplay();
    updateUIBasedOnPermissions(); // Cập nhật giao diện dựa trên quyền
    closeLoginModal();
    alert("Đăng nhập thành công!");
  } else {
    alert("Tên đăng nhập hoặc mật khẩu không đúng!");
  }
}

// Xử lý chỉnh sửa thông tin
function handleEditProfile(e) {
  e.preventDefault();

  // Cập nhật thông tin người dùng
  currentUser.fullName = document.getElementById("editFullName").value;
  currentUser.phone = document.getElementById("editPhone").value;
  currentUser.email = document.getElementById("editEmail").value;
  currentUser.address = document.getElementById("editAddress").value;

  // Cập nhật mật khẩu nếu được cung cấp
  const newPassword = document.getElementById("editPassword").value;
  if (newPassword.trim() !== "") {
    currentUser.password = newPassword;
  }

  // Cập nhật thông tin trong mảng users
  const userIndex = users.findIndex((u) => u.username === currentUser.username);
  if (userIndex !== -1) {
    users[userIndex] = currentUser;
  }

  // Cập nhật hiển thị
  updateProfileDisplay();
  closeEditProfileModal();
  showProfileModal();
  alert("Cập nhật thông tin thành công!");
}

// Xử lý đăng xuất
function logout() {
  currentUser = null;
  updateProfileDisplay();
  updateUIBasedOnPermissions(); // Cập nhật giao diện dựa trên quyền
  closeProfileModal();
  showLoginModal();

  // Đảm bảo chuyển về tab sản phẩm khi đăng xuất
  showTab("products");
}

// Khởi tạo khi trang được tải
document.addEventListener("DOMContentLoaded", function () {
  // Thiết lập xử lý form đăng nhập
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  // Thiết lập xử lý form chỉnh sửa thông tin
  const editProfileForm = document.getElementById("editProfileForm");
  if (editProfileForm) {
    editProfileForm.addEventListener("submit", handleEditProfile);
  }

  // Cập nhật hiển thị thông tin người dùng
  updateProfileDisplay();

  // Cập nhật giao diện dựa trên quyền
  updateUIBasedOnPermissions();

  // Hiển thị form đăng nhập khi trang được tải
  showLoginModal();
});

// Cập nhật hiển thị thông tin người dùng
function updateProfileDisplay() {
  const userProfileElement = document.querySelector(".user-profile");

  if (currentUser) {
    const roleName = getRoleDisplayName(currentUser.role);
    userProfileElement.innerHTML = `
      ${currentUser.fullName} (${roleName}) <i class="fas fa-user-circle user-icon"></i>
    `;
    userProfileElement.onclick = showProfileModal;
  } else {
    userProfileElement.innerHTML = `
      Đăng nhập <i class="fas fa-sign-in-alt user-icon"></i>
    `;
    userProfileElement.onclick = showLoginModal;
  }
}

// Khởi tạo khi trang được tải
document.addEventListener("DOMContentLoaded", function () {
  // Thiết lập xử lý form đăng nhập
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  // Thiết lập xử lý form chỉnh sửa thông tin
  const editProfileForm = document.getElementById("editProfileForm");
  if (editProfileForm) {
    editProfileForm.addEventListener("submit", handleEditProfile);
  }

  // Cập nhật hiển thị thông tin người dùng
  updateProfileDisplay();

  // Hiển thị form đăng nhập khi trang được tải
  showLoginModal();
});

// Hàm kiểm tra quyền truy cập vào mục nhân viên
function hasEmployeeAccess() {
  // Nếu chưa đăng nhập hoặc không phải chủ cửa hàng, không có quyền
  if (!currentUser) {
    return false;
  }

  // Chỉ cho phép người dùng có role là "owner" hoặc có quyền manageEmployees
  return (
    currentUser.role === "owner" ||
    (currentUser.permissions && currentUser.permissions.manageEmployees)
  );
}

function updateUIBasedOnPermissions() {
  const employeesNavItem = document.querySelector(
    "[onclick=\"showTab('employees')\"]"
  );

  if (employeesNavItem) {
    if (hasEmployeeAccess()) {
      employeesNavItem.classList.remove("hidden");
      employeesNavItem.removeAttribute("disabled");
    } else {
      employeesNavItem.classList.add("hidden");
      employeesNavItem.setAttribute("disabled", "true");
    }
  }
}
