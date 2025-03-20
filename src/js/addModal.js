import InputForm from "./inputForm";

class AddModal {
  static addModalElement = document.querySelector(".add-modal");

  static init() {
    // Select elements
    const addButton = document.querySelector(".add-button");
    const cancelButton = document.querySelector(".form__cancel-button");
    const formElement = document.querySelector(".form");

    // Add event listeners
    addButton.addEventListener("click", () => {
      this.showAddModal();
    });
    formElement.addEventListener("submit", (e) => {
      InputForm.submitForm(e);
    });
    cancelButton.addEventListener("click", () => {
      this.hideAddModal();
    });
  }

  static showAddModal() {
    this.addModalElement.classList.add("show-flex");
  }

  static hideAddModal() {
    this.addModalElement.classList.remove("show-flex");
  }
}

export default AddModal;
