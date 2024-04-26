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