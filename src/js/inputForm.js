class InputForm {
  static submitForm(e) {
    e.preventDefault();
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
      const fieldInputError = document.querySelector(`.form__${field.name}-error`);
      const formErrorMessage = document.querySelector(".form__error-message");

      if (!fieldInputElement.value.trim()) {
        fieldInputError.classList.add("form__input-error--show");
        fieldInputError.textContent = field.message;

        formErrorMessage.classList.add("form__error-message--show");
        formErrorMessage.textContent = "Please fill out highlighted fields";
        return;
      } else {
        fieldInputError.classList.remove("form__input-error--show");
        fieldInputError.textContent = "";

        formErrorMessage.classList.remove("form__error-message--show");
        formErrorMessage.textContent = "";
      }
    });
    console.log("Form submitted");
  }
}

export default InputForm;
