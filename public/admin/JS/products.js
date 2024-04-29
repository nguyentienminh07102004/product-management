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