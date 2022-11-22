let btn = document.querySelector(".btn");

let inpName = document.querySelector(".name-input");

let inpEmail = document.querySelector(".email-input");

let inpImageUrl = document.querySelector(".imageUrl-input");

let list = document.querySelector(".task-list");

btn.addEventListener("click", () => {
  if (!inpName.value.trim()) {
    alert("DEBIL NAPISHI CHO NIBYT");
    return;
  } else if (!inpEmail.value.trim()) {
    alert("DEBIL NAPISHI CHO NIBYT");
    return;
  } else if (!inpImageUrl.value.trim()) {
    alert("DEBIL NAPISHI CHO NIBYT");
    return;
  }
  let obj = {
    name: inpName.value,
    email: inpEmail.value,
    imageurl: inpImageUrl.value,
  };
  setItemToStorage(obj);
  createElement();
  inpName.value = "";
  inpEmail.value = "";
  inpImageUrl.value = "";
});

createElement();

function setItemToStorage(task) {
  let data = JSON.parse(localStorage.getItem("tasks-data"));
  data.push(task); 
  localStorage.setItem("tasks-data", JSON.stringify(data));
}

function createElement() {
  list.innerHTML = "";
  if (!localStorage.getItem("tasks-data")) {
    localStorage.setItem("tasks-data", "[]");
  }
  let newData = JSON.parse(localStorage.getItem("tasks-data"));
  newData.forEach((item, index) => {
    let li = document.createElement("li");
    let btnEdit = document.createElement("button");
    let btnDelete = document.createElement("button");

    li.innerHTML = `name:${item.name} email:${item.email} imageUrl:<img src=${item.imageurl}></img> `;
    btnEdit.innerHTML = "Edit";
    btnDelete.innerHTML = "Delete";

    li.append(btnEdit);
    li.appendChild(btnDelete);

    btnDelete.addEventListener("click", () => {
      deleteElement(index);
    });

    btnEdit.addEventListener("click", () => {
      editElement(index, item);
    });

    list.appendChild(li);
    // console.log(li);
  });
}

function deleteElement(index) {
  let data = JSON.parse(localStorage.getItem("tasks-data"));
  data.splice(index, 1);
  localStorage.setItem("tasks-data", JSON.stringify(data));
  createElement();
}

let mainModal = document.querySelector(".main-modal");

let inpEdit = document.querySelector(".inp-edit");

let inpEdit1 = document.querySelector(".inp-edit1");

let inpEdit2 = document.querySelector(".inp-edit2");

let btnCloser = document.querySelector(".btn-closer");

let btnsave = document.querySelector(".btn-save");

function editElement(index, item) {
  mainModal.style.display = "block";

  inpEdit.setAttribute("id", index);
  inpEdit.value = item.name;

  inpEdit1.setAttribute("id", index);
  inpEdit1.value = item.email;

  inpEdit2.setAttribute("id", index);
  inpEdit2.value = item.imageurl;

  btnCloser.addEventListener("click", () => {
    mainModal.style.display = "none";
  });
}

btnsave.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("tasks-data"));
  let index = inpEdit.id;
  let index1 = inpEdit1.id;
  let index2 = inpEdit2.id;
  if (!inpEdit.value.trim()) {
    alert("Ti MHE DEISTBYESH NA NERVIU");
    return;
  }else if (!inpEdit1.value.trim()) {
    alert("Ti MHE DEISTBYESH NA NERVIU");
    return;
  } else if (!inpEdit2.value.trim()) {
    alert("Ti MHE DEISTBYESH NA NERVIU");
    return;
  }
  let newTsak = {
    name: inpEdit.value,
    email: inpEdit1.value,
    imageurl: inpEdit2.value,
  };
  data.splice(index, 1, newTsak);
  localStorage.setItem("tasks-data", JSON.stringify(data));
  mainModal.style.display = "none";
  createElement();
});

// append - принимает строковый формат
// appendChild - принимает в себя элемент, который создан через createElement
