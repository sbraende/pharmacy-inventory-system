class Validation {
  static validateForm() {
    let isValid = true;
    const fieldsToValidate = [
      {
        name: "name",
        message: "Please enter medicine name",
      },
      {
        name: "manufacturer",
        message: "Please enter manufacturer name",
      },
      {
        name: "expiration-date",
        message: "Please enter expiration date",
      },
      {
        name: "quantity",
        message: "Please enter quantity",
      },
      {
        name: "medicine-category",
        message: "Please choose category",
      },
    ];

    fieldsToValidate.forEach((field) => {
      const fieldInputElement = document.querySelector(`#${field.name}`);
      const fieldInputError = document.querySelector(
        `.form__${field.name}-error`
      );
      const formErrorMessage = document.querySelector(".form__error-message");

      formErrorMessage.classList.remove("form__error-message--show");
      formErrorMessage.textContent = "";

      if (!fieldInputElement.value.trim()) {
        fieldInputError.classList.add("form__input-error--show");
        fieldInputError.textContent = field.message;

        isValid = false;
      } else {
        fieldInputError.classList.remove("form__input-error--show");
        fieldInputError.textContent = "";
      }
    });
    return isValid;
  }
}

export default Validation;
