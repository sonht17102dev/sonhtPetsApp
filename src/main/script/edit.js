'use strict';
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const openEdit = document.getElementById('container-form');

const KEY_PETS = 'petArray';
let petArr = JSON.parse(getFromStorage(KEY_PETS)) ?? [];
const KEY_BREED = 'breedArray';
let breedArr = JSON.parse(getFromStorage(KEY_BREED)) ?? [];
let data;

// Bổ sung Animation cho Sidebar
const sideBarbtn = document.getElementById('sidebar');

sideBarbtn.addEventListener('click', function(sb){
  sideBarbtn.classList.toggle('active');
});
// 
function renderBreed(){
  // console.log(breedArr);
  let typeInput = document.getElementById('input-type').value;
  // console.log(typeInput);
  let breedFil = breedArr.filter((item) => item.type === typeInput);
  // console.log(breedFil);

  breedInput.innerHTML = '<option>Select Breed</option>';
  breedFil.forEach((item) => {
    const option = document.createElement('option');
    option.innerHTML = `<option>${item.breed}</option`;
    breedInput.appendChild(option);
  });
};
// Tạo option breed tương ứng với type là Dog hay Cat 
typeInput.addEventListener('change', renderBreed);

// Khi nhấn nút Edit, giá trị trên Form sẽ là các thông tin hiện tại của thú cưng đó.
const inputForm = function(btn){
  const row = btn.parentNode.parentNode;
  let petId = row.getElementsByTagName('th')[0].textContent;
  let petName = row.getElementsByTagName('td')[0].textContent;
  let petAge = row.getElementsByTagName('td')[1].textContent;
  let petType = row.getElementsByTagName('td')[2].textContent;
  let petWeight = row.getElementsByTagName('td')[3].textContent;
  let petLength = row.getElementsByTagName('td')[4].textContent;
  let petBreed = row.getElementsByTagName('td')[5].textContent;
  let petColor = row.getElementsByTagName('td')[6].attributes['data-color'].value;
  let petVaccinated = row.getElementsByTagName('td')[7].attributes['data-vaccinated'].value;
  let petDewormed = row.getElementsByTagName('td')[8].attributes['data-dewormed'].value;
  let petSterilized = row.getElementsByTagName('td')[9].attributes['data-sterilized'].value;
  console.log(petBreed);

  idInput.value = petId;
  nameInput.value = petName;
  ageInput.value = parseInt(petAge);
  typeInput.value = petType;
  renderBreed();
  weightInput.value = parseInt(petWeight);
  lengthInput.value = parseInt(petLength);
  colorInput.value = petColor;
   breedInput.value = petBreed;
  console.log(breedInput.value);

  if (petVaccinated==="bi-check-circle-fill") petVaccinated=true;
  if(petVaccinated===true)
  vaccinatedInput.checked = true;
  else vaccinatedInput.checked = false;

  if (petDewormed === "bi-check-circle-fill") petDewormed=true;
  if(petDewormed===true)
  dewormedInput.checked = true;
  else dewormedInput.checked = false;

  if (petSterilized === "bi-check-circle-fill") petSterilized=true;
  if(petSterilized===true)
  sterilizedInput.checked = true;
  else sterilizedInput.checked = false;
};

// Ham hien thi form khi click vao Edit
const editPet = function(){
  openEdit.classList.remove('hide');
  inputForm(this);     
};


// Ham hien thi danh sach thu cung duoc nhap tu index.html
function renderTableData(petArr){
 
  let tableBodyEl = document.getElementById('tbody');
  tableBodyEl.innerHTML = '';

 petArr.forEach((element) => {
    const row = document.createElement('tr');
//truyền vào đoạn HTML cho thẻ tr tương ứng với dữ liệu cho thú cưng tương ứng.   
    row.innerHTML = `
    <th scope="row">${element.id}</th>
    <td>${element.name}</td>
    <td>${element.age}</td>
    <td>${element.type}</td>
    <td>${element.weight} kg</td>
    <td>${element.length} cm</td>
    <td>${element.breed}</td>
    <td data-color="${element.color}">
      <i class="bi bi-square-fill" style="color: ${element.color}"></i>
    </td>
    <td data-vaccinated="${element.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"}"><i class="bi ${
      element.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td data-dewormed="${element.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"}"><i class="bi ${
      element.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td data-sterilized="${element.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"}"><i class="bi ${
      element.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td>${(new Date(element.date)).toLocaleDateString("en-US")}</td>

    <td><button type="button" class="btn btn-edit" style="background-color: yellow">Edit</button>
    </td>
    `;
//////////////////
    tableBodyEl.appendChild(row);
});
const editsBtn = document.querySelectorAll('.btn-edit');
editsBtn.forEach(ed => ed.addEventListener('click', editPet))
};

// dung function them du lieu (clean code)
function inputingData (){
  data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  }
};
// Validate dữ liệu
const checkpet = function(data){
  let contentAlert = '';
  
  if (data.name.trim() === '' || !data.name){
    contentAlert += 'Please input name!\n';
  }
  // Check Age
  if (isNaN(data.age)){
    contentAlert += 'Please input age!\n';
  } else {
    if (data.age < 1 || data.age > 15) contentAlert += 'Age must be between 1 and 15!\n';
  }
  // Check Weight
  if (isNaN(data.weight)){
    contentAlert += 'Please input weight!\n';
  } else {
    if (data.weight < 1 || data.weight > 15)
    contentAlert += 'Weight must be between 1 and 15!\n';
  }
  // Check Length
  if (isNaN(data.length)){
    contentAlert += 'Please input length!\n';
  } else {
    if (data.length < 1 || data.length > 100)
    contentAlert += 'Length must be between 1 and 100!\n';
  }
  // Check Type Input
  if (typeInput.options[0].value.localeCompare(data.type) == 0){
    contentAlert += 'Please select Type!\n';
  }
  // Check breek input
  if (breedInput.options[0].value.localeCompare(data.breed) == 0){
    contentAlert += 'Please select Breed!\n';

  }
  return contentAlert;
};


submitBtn.addEventListener('click', function(e){
  // console.log(petArr);
  inputingData();
  let contentAlert = checkpet(data);
  let petID = idInput.value;
  let index;
  if (contentAlert.localeCompare('') === 0){
    for (let i= 0; i< petArr.length; i++){
      if (petID === petArr[i].id){
       index = i;
       break;
     }
   }
   console.log(index);
   // ghi de gia tri tu input vao mang
   petArr[index].name = nameInput.value;
   petArr[index].age = parseInt(ageInput.value);
   petArr[index].type = typeInput.value;
   petArr[index].weight = parseInt(weightInput.value);
   petArr[index].type = typeInput.value;
   petArr[index].length = parseInt(lengthInput.value);
   petArr[index].breed = breedInput.value;
   petArr[index].color = colorInput.value;
   petArr[index].vaccinated = vaccinatedInput.checked;
   petArr[index].dewormed = dewormedInput.checked;
   petArr[index].sterilized = sterilizedInput.checked;
  
  } else {
    alert(contentAlert);
  }
  console.log(petID);
  // hien thi lai table khi da chinh sua
  renderTableData(petArr); 
  // lưu lại vào storage
  saveToStorage(KEY_PETS, JSON.stringify(petArr));
});
// hiển thị table khi mở lại trang
renderTableData(petArr);
// console.log(petArr);




