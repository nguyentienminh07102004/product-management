let filterStatus = (query) => {
  let buttons = [
    {
      name: "All",
      status: "",
      active: ""
    },
    {
      name: "Active",
      status: "active",
      active: ""
    },
    {
      name: "Inactive",
      status: "inactive",
      active: ""
    }
  ];
  if (query.status) {
    buttons.find(button => { return button.status === query.status }).active = "active";
  } else {
    buttons.find(button => button.status === "").active = "active";
  }

  return buttons;
}

module.exports = filterStatus;