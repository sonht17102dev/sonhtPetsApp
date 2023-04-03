"use strict";

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

const healthybtn = document.getElementById("healthy-btn");

const KEY_PETS = "petArray";
let petArr = JSON.parse(getFromStorage(KEY_PETS)) ?? [];
const KEY_BREED = "breedArray";
let breedArr = JSON.parse(getFromStorage(KEY_BREED)) ?? [];

let healthyCheck = false;
let healthyPetArr = [];
let data;

const sideBarbtn = document.getElementById("sidebar");

// Bổ sung Animation cho Sidebar
sideBarbtn.addEventListener("click", function (sb) {
  sideBarbtn.classList.toggle("active");
});
// dung function them du lieu
function inputingData() {
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
  };
}
// Xoa thu cung
const deletePet = function () {
  if (confirm("Are You Sure?")) {
    let row = this.parentNode.parentNode;
    let petId = row.getElementsByTagName("th")[0].textContent;
    console.log(petId);
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === petId) {
        petArr.splice(i, 1);
      }
    }

    if (!healthyCheck) renderTableData(petArr);
    else renderTableData(healthyPetArr);
  }
  // save danh sách mới vào storage khi một pet bị xóa
  saveToStorage(KEY_PETS, JSON.stringify(petArr));
};

const calHelthyPets = function () {
  // dung ham filter xac dinh pet khoe manh
  healthyPetArr = petArr.filter(
    (pet) => pet.vaccinated && pet.dewormed && pet.sterilized
  );
};
// tao reset form
const clearForm = function () {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = null;
  typeInput.value = "Select Type";
  weightInput.value = null;
  lengthInput.value = null;
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};
// Hiển thị danh sách thú cưng
function renderTableData(petArr) {
  let tableBodyEl = document.getElementById("tbody");
  tableBodyEl.innerHTML = "";

  petArr.forEach((element) => {
    const row = document.createElement("tr");
    //truyền vào đoạn HTML cho thẻ tr tương ứng với dữ liệu cho thú cưng tương ứng.
    row.innerHTML = `
    <th scope="row">${element.id}</th>
    <td>${element.name}</td>
    <td>${element.age}</td>
    <td>${element.type}</td>
    <td>${element.weight} kg</td>
    <td>${element.length} cm</td>
    <td>${element.breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${element.color}"></i>
    </td>
    <td><i class="bi ${
      element.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      element.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      element.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td>${new Date(element.date).toLocaleDateString("en-US")}</td>

    <td><button type="button" class="btn btn-danger" son="${
      element.id
    }">Delete</button>
    </td>
    `;

    tableBodyEl.appendChild(row);
    // Xóa các dữ liệu vừa nhập trên Form
  });
  document
    .querySelectorAll(".btn-danger")
    .forEach((del) => del.addEventListener("click", deletePet));
}

function renderBreed() {
  // console.log(breedArr);
  let typeInput = document.getElementById("input-type").value;
  // console.log(typeInput);
  let breedFil = breedArr.filter((item) => item.type === typeInput);
  // console.log(breedFil);

  breedInput.innerHTML = "<option>Select Breed</option>";
  breedFil.forEach((item) => {
    const option = document.createElement("option");
    option.innerHTML = `<option>${item.breed}</option`;
    breedInput.appendChild(option);
  });
}
// Tạo option breed tương ứng với type là Dog hay Cat
typeInput.addEventListener("change", renderBreed);

// Validate dữ liệu hợp lệ
const checkPet = function (data) {
  let contentAlert = "";
  // Kiem tra id
  if (data.id.trim() === "" || !data.id) {
    contentAlert += "Please input id!\n";
  } else {
    let check = false;
    for (let index = 0; index < petArr.length; index++) {
      const element = petArr[index];
      if (element.id.localeCompare(data.id) === 0) {
        check = true;
        break;
      }
    }
    if (check === true) contentAlert += "ID must be unique\n";
  }
  if (data.name.trim() === "" || !data.name) {
    contentAlert += "Please input name!\n";
  }
  // Check Age
  if (isNaN(data.age)) {
    contentAlert += "Please input age!\n";
  } else {
    if (data.age < 1 || data.age > 15)
      contentAlert += "Age must be between 1 and 15!\n";
  }
  // Check Weight
  if (isNaN(data.weight)) {
    contentAlert += "Please input weight!\n";
  } else {
    if (data.weight < 1 || data.weight > 15)
      contentAlert += "Weight must be between 1 and 15!\n";
  }
  // Check Length
  if (isNaN(data.length)) {
    contentAlert += "Please input length!\n";
  } else {
    if (data.length < 1 || data.length > 100)
      contentAlert += "Length must be between 1 and 100!\n";
  }
  // Check Type Input
  if (typeInput.options[0].value.localeCompare(data.type) == 0) {
    contentAlert += "Please select Type!\n";
  }
  // Check breek input
  if (breedInput.options[0].value.localeCompare(data.breed) == 0) {
    contentAlert += "Please select Breed!\n";
  }
  return contentAlert;
};

submitBtn.addEventListener("click", function (e) {
  inputingData();
  //  Thêm thú cưng vào danh sách
  let contentAlert = checkPet(data);
  if (contentAlert.localeCompare("") === 0) {
    petArr.push(data);
    if (!healthyCheck) renderTableData(petArr);
    else {
      calHelthyPets();
      renderTableData(healthyPetArr);
    }
    clearForm();
  } else {
    alert(contentAlert);
  }
  // luu du lieu vao storage khi bam vao submid
  saveToStorage(KEY_PETS, JSON.stringify(petArr));
});

healthybtn.addEventListener("click", function (e) {
  if (!healthyCheck) {
    healthyCheck = true;
    // switch to show healthy pets
    healthybtn.textContent = "Show All Pets";
    calHelthyPets();
    renderTableData(healthyPetArr);
  } else {
    healthyCheck = false;
    // Switch to show all pets
    healthybtn.textContent = "Show Healthy Pets";
    renderTableData(petArr);
  }
});

// khi mở lại ứng dụng thì hiển thị dữ liệu
renderTableData(petArr);
