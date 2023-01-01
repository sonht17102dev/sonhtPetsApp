'use strict';

// Bổ sung Animation cho Sidebar
const sideBarbtn = document.getElementById('sidebar');

sideBarbtn.addEventListener('click', function(sb){
  sideBarbtn.classList.toggle('active');
});
// 1. can chon cac element input va nut find trong html
const findBtn = document.getElementById("find-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");


const KEY_PETS = 'petArray';
let petArr = JSON.parse(getFromStorage(KEY_PETS)) ?? [];

// Hiển thị danh sách thú cưng
function renderTableData(petArr){
  
  let tableBodyEl = document.getElementById('tbody');
  tableBodyEl.innerHTML = '';

 petArr.forEach((element) => {
    const row = document.createElement('tr');
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
    <td>${(new Date(element.date)).toLocaleDateString("en-US")}</td>
    `;

    tableBodyEl.appendChild(row); 
    
  });
};

// 3. khi bam vao find - tao event click
findBtn.addEventListener('click', function(e){
  const findPet = petArr.filter((pet) => {
    if (idInput.value.trim() !== '' && !pet.id.includes(idInput.value.trim()))
      return false;
    if (nameInput.value.trim() !== '' && !pet.name.includes(nameInput.value.trim()))
      return false;
    if (typeInput.options[0].value !== typeInput.value && pet.type !== typeInput.value)
      return false;
    if (breedInput.options[0].value !== breedInput.value && pet.breed !== breedInput.value)
      return false;
    if (vaccinatedInput.checked === true && pet.vaccinated === false) 
      return false;
    if (dewormedInput.checked === true && pet.dewormed === false)
      return false;
    if (sterilizedInput.checked === true && pet.sterilized === false)
      return false;
    
    return true;
  })
  // console.log(findPet);
  
  // 4. hien thi thu cung len table khi thoa man dieu kien ve cac truong 
  renderTableData(findPet);
});
// Hiển thị thú cưng khi người dùng mở lại ứng dụng
renderTableData(petArr);
	

