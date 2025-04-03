import MedicineManager from "./medicineManager";

class UI {
  static addModal = document.querySelector(".add-modal");
  static formElement = document.querySelector(".form");

  static renderMedicineList(medicineList) {
    // Get list element
    const medicineListElement = document.querySelector(".medicine-list");
    medicineListElement.innerHTML = "";

    medicineList.forEach((medicine) => {
      const li = document.createElement("li");
      li.classList.add("medicine");

      const detailsDiv = document.createElement("div");
      detailsDiv.classList.add("medicine__details");

      const nameHeading = document.createElement("h3");
      nameHeading.classList.add("medicine__name");
      nameHeading.textContent = medicine.name;

      // Function to create detail containers
      function createDetail(labelText, valueText, valueClass) {
        const container = document.createElement("div");
        container.classList.add("medicine__detail-container");

        const label = document.createElement("span");
        label.classList.add("medicine__detail-label");
        label.textContent = labelText;

        const value = document.createElement("span");
        value.classList.add(valueClass);
        value.textContent = valueText;

        container.append(label, value);
        return container;
      }

      // Create all details
      const manufacturer = createDetail(
        "Manufacturer:",
        medicine.manufacturer,
        "medicine__manufacturer"
      );
      const expirationDate = createDetail(
        "Expiration date:",
        medicine.expirationDate,
        "medicine__expiration-date"
      );
      const quantity = createDetail("Quantity:", medicine.quantity, "medicine__quantity");
      const category = createDetail("Medicine category:", medicine.category, "medicine__category");

      detailsDiv.append(nameHeading, manufacturer, expirationDate, quantity, category);

      // Create edit/delete buttons container
      const editDeleteDiv = document.createElement("div");
      editDeleteDiv.classList.add("medicine__editDelete");

      const editButton = document.createElement("button");
      editButton.classList.add("medicine__edit");
      editButton.textContent = "🖋️";

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("medicine__delete");
      deleteButton.textContent = "🗑️";

      editDeleteDiv.append(editButton, deleteButton);
      li.append(detailsDiv, editDeleteDiv);
      medicineListElement.append(li);
    });
  }

  static openFormModal() {
    this.addModal.classList.add("show-flex");
  }

  static closeFormModal() {
    this.addModal.classList.remove("show-flex");
  }

  static initFormModal() {
    const addMedicineButton = document.querySelector(".add-button");
    const formCancelButton = document.querySelector(".form__cancel-button");

    addMedicineButton.addEventListener("click", () => {
      this.openFormModal();
    });

    formCancelButton.addEventListener("click", () => {
      this.closeFormModal();
    });

    this.formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      // Get selection
      const nameInput = document.querySelector(".form__name-input");
      const manufacturerInput = document.querySelector(".form__manufacturer-input");
      const expirationDateInput = document.querySelector(".form__expiration-date-input");
      const quantityInput = document.querySelector(".form__quantity-input");
      const medicineCategorySelect = document.querySelector(".form__medicine-category");

      MedicineManager.addMedicine(
        nameInput,
        manufacturerInput,
        expirationDateInput,
        quantityInput,
        medicineCategorySelect
      );
      console.log("Form submitted!");
    });
  }

  static init() {
    this.renderMedicineList(MedicineManager.getMedicine());
    this.initFormModal();
  }
}

export default UI;
