'use strict';
// save to storage : key, value deu phai la string
// tạo hàm để lưu vào localstorage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
// lấy dữ liệu từ LocalStorage
function getFromStorage(key) {
  return localStorage.getItem(key);
}