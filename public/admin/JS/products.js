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