'use strict';

const submitBtn = document.getElementById("submit-btn");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");

let data;
const KEY_BREED = 'breedArray';
let breedArr = JSON.parse(getFromStorage(KEY_BREED)) ??[];
const sideBarbtn = document.getElementById('sidebar');

// Bổ sung Animation cho Sidebar
sideBarbtn.addEventListener('click', function(sb){
  sideBarbtn.classList.toggle('active');
});
// dung function them du lieu
function inputingData (){
  data = {
    breed: breedInput.value,
    type: typeInput.value,
  }
};
// tao reset form
const clearForm = function(){
  typeInput.value = 'Select Type';
  breedInput.value = '';
};

// Validate dữ liệu hợp lệ
const checkpet = function(data){
  let contentAlert = '';
  // Check breek input
  if (data.breed.trim() === '' || !data.breed){
    contentAlert += 'Please input Breed!\n';
  }
  // Check Type Input
  if (typeInput.options[0].value.localeCompare(data.type) == 0){
    contentAlert += 'Please select Type!\n';
  }
  return contentAlert;
};
// Tạo hàm xóa breed
const deleteBreed = function(){
  if (confirm('Are You Sure?')){
    let id = parseInt(this.parentNode.parentNode.getElementsByTagName('th')[0].textContent) - 1;
    // console.log(id);
    breedArr.splice(id,1);  
    // console.log(breedArr);
    // Luu du lieu vao storage ve dang string khi xoa Breed
    saveToStorage(KEY_BREED, JSON.stringify(breedArr));
    renderTableData(breedArr);
  }

};
// Hàm hiển thị breed lên table
function renderTableData(breedArr){
  
  let tableBodyEl = document.getElementById('tbody');
  tableBodyEl.innerHTML = '';
  // console.log(breedArr.length);
 breedArr.forEach((element, i) => {
    const row = document.createElement('tr');
//truyền vào đoạn HTML cho thẻ tr tương ứng với dữ liệu cho thú cưng tương ứng.   
    row.innerHTML = `
    <th scope="row">${i+1}</th>
    <td>${element.breed}</td>
    <td>${element.type}</td>
    <td><button type="button" class="btn btn-danger">Delete</button>
    </td>
    `;

    tableBodyEl.appendChild(row);
    
    // Xóa các breed thú cưng vừa nhập trên Form
    document
    .querySelectorAll('.btn-danger')
    .forEach(del => del.addEventListener('click', deleteBreed));    
  });
};
submitBtn.addEventListener('click', function(e){
  inputingData();
  let contentAlert = checkpet(data);
  if (contentAlert.localeCompare('') === 0){
    //  Thêm breed thú cưng vào danh sách
    breedArr.push(data);
    
    // luu du lieu vao storage khi bam vao submid
    saveToStorage(KEY_BREED, JSON.stringify(breedArr));
    clearForm();
    renderTableData(breedArr);
  } else {
    alert(contentAlert);
  }
})
// khi mở lại ứng dụng thì hiển thị dữ liệu breed
renderTableData(breedArr);

