class AddModal {
  constructor() {
    this.addModalElement = document.querySelector(".add-modal");
    this.addButton = document.querySelector(".add-button");
    this.formCancelButton = document.querySelector(".form__cancel-button");

    this.attachEventListeners();
  }

  attachEventListeners() {
    this.addButton.addEventListener("click", () => this.showAddModal());
    this.formCancelButton.addEventListener("click", () => this.hideAddModal());
  }

  showAddModal() {
    this.addModalElement.classList.add("show-flex");
  }

  hideAddModal() {
    this.addModalElement.classList.remove("show-flex");
  }
}

export default AddModal;
