const buttons = document.querySelectorAll("[button-status]");
if (buttons.length > 0) {
  let url = new URL(window.location.href);
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    })
  });
}

const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const key = evt.target.elements.keyword.value;
    if (key) {
      url.searchParams.set("keyword", key);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href; // câu lệnh này là chuyển hướng thanh url tới trang cần thiết
  });
}

let buttonPagination = document.querySelectorAll("[button-page]");
if(buttonPagination){
  let url = new URL(window.location.href);
  buttonPagination.forEach(button => {
    button.addEventListener("click", () => {
      let page = button.getAttribute("button-page");
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}

// Checkbox multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti){
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputIDs = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener('click', () => {
    if(inputCheckAll.checked){
      inputIDs.forEach(checkbox => {
        checkbox.checked = true;
      });
    }else{
      inputIDs.forEach(checkbox => {
        checkbox.checked = false;
      });
    }
  });

  inputIDs.forEach(input => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
      if(countChecked === inputIDs.length){
        inputCheckAll.checked = true;
      }else{
        inputCheckAll.checked = false;
      }
    });
  });
}
// End checkbox multi

// Form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
  formChangeMulti.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
    let ids = new Array();
    let inputIds = formChangeMulti.querySelector("input[name='ids']");
    
    const typeChange = evt.target.elements.type.value;
    if(typeChange === 'delete-all'){
      const isConfirm = window.confirm("Do you want to delete all ?");
      if(!isConfirm){
        return; // để ngắt không cho chạy nữa
      }
    }

    if(inputChecked.length > 0){

      inputChecked.forEach(input => {
        let id = input.getAttribute('value');

        if(typeChange === 'change-position'){
          const position = input.closest('tr').querySelector("input[name='position']").value;
          id += ('-' + position);
        }
        ids.push(id);
      });

      inputIds.value = ids.join(", ");

      formChangeMulti.submit();
    }else{
      window.alert("Please choose product you want to change status");
    }
    
  });
}
// End form change multi

// Show alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
  const time = parseInt(showAlert.getAttribute('data-time'));
  const closeAlert = showAlert.querySelector('[close-alert]');
  closeAlert.addEventListener('click', () => {
    showAlert.classList.add('alert-hidden');
  });
  setTimeout(() => {
    showAlert.classList.add('alert-hidden');
  }, time);
}
// End show alert


// preview image in createPage
const uploadImage = document.querySelector('[upload-image]');
if(uploadImage){
  const uploadImageInput = uploadImage.querySelector('[upload-image-input]');
  const uploadImagePreview = uploadImage.querySelector('[upload-image-preview]');

  uploadImageInput.addEventListener('change', (evt) => {
    console.log(evt.target.files);
    const file = evt.target.files[0];
    if(file){
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
// End preview image in createPage