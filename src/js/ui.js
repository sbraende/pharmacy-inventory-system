import appState from "./appState";
import MedicineManager from "./medicineManager";
import Validation from "./validation";

class UI {
  static addModal = document.querySelector(".add-modal");
  static formElement = document.querySelector(".form");
  static formSubmitButton = document.querySelector(".form__submit-button");

  static renderDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString("en-GB", { dateStyle: "medium" });
  }

  static ISODateToNormalizedDate(timestamp) {
    const date = new Date(timestamp);
    return date.toISOString().split("T")[0];
  }

  static openFormModal() {
    UI.addModal.classList.add("show-flex");
  }

  static closeFormModal() {
    UI.addModal.classList.remove("show-flex");
    UI.formSubmitButton.textContent = "Submit";
    UI.formElement.reset();
  }

  static initFormModal() {
    const addMedicineButton = document.querySelector(".inventory__add-new-product-button");
    const formCancelButton = document.querySelector(".form__cancel-button");

    addMedicineButton.addEventListener("click", () => {
      UI.openFormModal();
    });

    formCancelButton.addEventListener("click", () => {
      UI.closeFormModal();
    });

    UI.formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      // Get selection
      const nameInput = document.querySelector(".form__name-input");
      const manufacturerInput = document.querySelector(".form__manufacturer-input");
      const expirationDateInput = document.querySelector(".form__expiration-date-input");
      const quantityInput = document.querySelector(".form__quantity-input");
      const medicineCategorySelect = document.querySelector(".form__medicine-category");

      if (!Validation.validateForm()) {
        return;
      }

      if (!appState.editState) {
        // Add mode
        MedicineManager.addMedicine(
          nameInput,
          manufacturerInput,
          expirationDateInput,
          quantityInput,
          medicineCategorySelect
        );
      } else {
        // Edit mode
        MedicineManager.editMedicineData(
          appState.editState,
          nameInput,
          manufacturerInput,
          expirationDateInput,
          quantityInput,
          medicineCategorySelect
        );
      }
      UI.closeFormModal();
      UI.renderProducts(MedicineManager.getMedicine());
    });
  }

  static editMedicine(id) {
    const nameInput = document.querySelector(".form__name-input");
    const manufacturerInput = document.querySelector(".form__manufacturer-input");
    const expirationDateInput = document.querySelector(".form__expiration-date-input");
    const quantityInput = document.querySelector(".form__quantity-input");
    const medicineCategorySelect = document.querySelector(".form__medicine-category");

    UI.openFormModal();
    UI.formSubmitButton.textContent = "Confirm Edit";

    UI.populateInputFields(
      id,
      nameInput,
      manufacturerInput,
      expirationDateInput,
      quantityInput,
      medicineCategorySelect
    );
    appState.editState = id;
  }

  static populateInputFields(
    id,
    nameInput,
    manufacturerInput,
    expirationDateInput,
    quantityInput,
    medicineCategorySelect
  ) {
    const medicineList = MedicineManager.getMedicine();
    const currentMedicine = medicineList.find((medicine) => medicine.id === id);

    nameInput.value = currentMedicine.name;
    manufacturerInput.value = currentMedicine.manufacturer;
    expirationDateInput.value = UI.ISODateToNormalizedDate(currentMedicine.expirationDate);
    quantityInput.value = currentMedicine.quantity;
    medicineCategorySelect.value = currentMedicine.category;
  }

  static renderProducts(medicineList) {
    const productTableBody = document.querySelector(".product-table__body");
    productTableBody.innerHTML = "";

    medicineList.forEach((medicine) => {
      const row = document.createElement("tr");

      const createCell = (text) => {
        const cell = document.createElement("td");
        cell.textContent = text;
        return cell;
      };

      row.append(
        createCell(medicine.name),
        createCell(medicine.manufacturer),
        createCell(UI.renderDate(Date.parse(medicine.expirationDate))), // ISO to timestamp
        createCell(medicine.quantity),
        createCell(medicine.category),
        createCell(medicine.remarks || "N/A") // TODO: Figure out details rendering
      );

      // Create edit/delete buttons container
      const editDeleteCell = document.createElement("td");
      editDeleteCell.classList.add("product-table__edit-container");

      const editButton = document.createElement("button");
      editButton.classList.add("product-table__edit-buttons");

      const editIcon = document.createElement("img");
      editIcon.src = "/assets/icons/edit.svg";
      editIcon.alt = "Edit icon";
      editButton.append(editIcon);

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("product-table__edit-buttons");

      const deleteIcon = document.createElement("img");
      deleteIcon.src = "/assets/icons/delete.svg";
      deleteIcon.alt = "Delete icon";
      deleteButton.append(deleteIcon);

      editDeleteCell.append(editButton, deleteButton);
      row.append(editDeleteCell);

      productTableBody.append(row);

      editButton.addEventListener("click", () => {
        UI.editMedicine(medicine.id);
      });

      deleteButton.addEventListener("click", () => {
        MedicineManager.removeMedicine(medicine.id);
        UI.renderProducts(MedicineManager.medicineList);
      });
    });
  }

  static init() {
    UI.renderProducts(MedicineManager.getMedicine());
    UI.initFormModal();
  }
}

export default UI;
