// Change Status
const buttonsChangeStatus = window.document.querySelectorAll("[button-change-status]");
if(buttonsChangeStatus.length > 0){
  let formChangeStatus = document.querySelector("#form-change-status");
  let path = formChangeStatus.getAttribute("data-path");

  buttonsChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      let statusCurrent = button.getAttribute("button-data-status");
      let id = button.getAttribute("button-data-id");

      let statusChange = statusCurrent === "active" ? "inactive" : "active";

      let action = path + `/${statusChange}/${id}?_method=PATCH`;
      
      formChangeStatus.action = action;
      
      formChangeStatus.submit();
    });
  });
} 
// End change status

// Delete item
const buttonDelete = window.document.querySelectorAll("[button-delete]");
if(buttonDelete.length > 0){
  buttonDelete.forEach(button => {
    const formDelete = document.querySelector('#form-delete-product');
    const path = formDelete.getAttribute('data-path');
    button.addEventListener("click", () => {
      const isConfirm = window.confirm("Do you want to delete this product ?");
      if(isConfirm){
        const id = button.getAttribute("data-id");
        const action = path + "/" + id + "?_method=DELETE";
        formDelete.action = action;
        formDelete.submit();
      }
    });
  })
}
// End delete item


// sort Select
const SortSelect = document.querySelector('[sort]');
if(SortSelect){
  let url = new URL(window.location.href);
  const sortSelect = SortSelect.querySelector('[sort-select]');
  const sortClear = SortSelect.querySelector('[sort-clear]');
  sortSelect.addEventListener('change', (evt) => { 
    const [sortKey, sortValue] = evt.target.value.split('-');
    url.searchParams.set('sortKey', sortKey);
    url.searchParams.set('sortValue', sortValue);
    console.log(url.href);
    window.location.href = url.href;
  });

  sortClear.addEventListener('click', (evt) => {
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");
    window.location.href = url.href;
  });

  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");

  // Check nếu có tồn tại sortKey và sortValue 
  if(sortKey && sortValue){
    // Tìm ra option chứa value tương ứng
    let optionSelected = sortSelect.querySelector(`option[value='${sortKey}-${sortValue}']`);
    // Gán giá trị true cho selected
    optionSelected.selected = true;
  }
}

// End sort Select