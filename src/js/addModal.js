import MedicineManager from "./medicineManager";

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
      this.submitForm(e);
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

  static submitForm(e) {
    e.preventDefault();
    const nameInput = document.querySelector(".form__name-input");
    const manufacturerInput = document.querySelector(".form__manufacturer-input");
    const expirationDateInput = document.querySelector(".form__expiration-date-input");
    const quantityInput = document.querySelector(".form__quantity-input");
    const categorySelect = document.querySelector(".form__medicine-category");
    const errorMessage = document.querySelector(".form__error-message");

    const fieldsToValidate = [
      { name: "Name", element: nameInput, message: "Please enter name" },
      {
        name: "Manufacturer",
        element: manufacturerInput,
        message: "Please enter manufacturer name",
      },
    ];

    // Validate input
    const validate = (input, type) => {
      if (!input.value) {
        const label = document.querySelector(`label[for="${input.id}"]`);
        errorMessage.classList.remove("hide");
        errorMessage.textContent = `Please fill out highlighted field: ${label.textContent}`;
        input.classList.add("form__error-field");
        return null;
      }

      switch (type) {
        case "text":
          input.classList.remove("form__error-field");
          errorMessage.classList.add("hide");
          return input.value.trim().toLowerCase();
        case "date":
          input.classList.remove("form__error-field");
          errorMessage.classList.add("hide");
          return input.value;
      }
    };

    const nameInputValue = validate(nameInput, "text");
    if (nameInputValue === null) return;

    const manufacturerInputValue = validate(manufacturerInput, "text");
    if (manufacturerInputValue === null) return;

    const expirationDateInputValue = validate(expirationDateInput, "date");
    if (expirationDateInputValue === null) return;

    // MedicineManager.addMedicine(
    //   nameInput,
    //   manufacturerInput,
    //   expirationDateInput,
    //   quantityInput,
    //   categorySelect
    // );
  }
}

export default AddModal;
