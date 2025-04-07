import MedicineManager from "./medicineManager";
import appState from "./appState";
import Validation from "./validation";
import Utility from "./utility";

class UI {
  static addModal = document.querySelector(".add-modal");
  static formElement = document.querySelector(".form");
  static formSubmitButton = document.querySelector(".form__submit-button");
  static deleteModal = document.querySelector(".delete-modal");

  // Modal control
  static openFormModal() {
    const medicineCategorySelect = document.querySelector(".form__medicine-category");
    UI.addModal.classList.add("show-flex");

    medicineCategorySelect.addEventListener("change", (e) => {
      UI.renderFormCategories(e.target.value);
    });
  }

  static closeFormModal() {
    UI.addModal.classList.remove("show-flex");
    UI.formSubmitButton.textContent = "Submit";
    UI.formElement.reset();
    UI.resetFormCategories();
    appState.editState = null;
  }

  static openDeleteModal(medicineName) {
    const deleteModalText = document.querySelector(".delete-modal__text");

    UI.deleteModal.classList.add("show-flex");
    deleteModalText.textContent = `Are you sure you want to delete '${medicineName}'`;
  }

  static closeDeleteModal() {
    UI.deleteModal.classList.remove("show-flex");
  }

  static resetFormCategories() {
    const formCategory = document.querySelectorAll(".form__category");
    formCategory.forEach((element) => {
      element.classList.remove("form__category--show");
    });
  }

  // Event handlers helpers
  static renderFormCategories(category) {
    UI.resetFormCategories();

    switch (category) {
      case "oral":
        document.querySelector(".form__oral-medicaiton").classList.add("form__category--show");
        break;
      case "injectable":
        document
          .querySelector(".form__injectable-medication")
          .classList.add("form__category--show");
        break;
      case "topical":
        document.querySelector(".form__topical-medicaiton").classList.add("form__category--show");
        break;
    }
  }

  static performDelete(id) {
    MedicineManager.removeMedicine(id);
    UI.renderProducts(MedicineManager.medicineList);
  }

  static handleConfirmDeleteButton(id) {
    const deleteModalConfirmDeleteButton = document.querySelector(".delete-modal__confirm");

    if (appState.deleteState) {
      deleteModalConfirmDeleteButton.removeEventListener("click", appState.deleteState);
    }

    appState.deleteState = () => {
      UI.performDelete(id);
      UI.closeDeleteModal();
      appState.deleteState = null;
    };

    deleteModalConfirmDeleteButton.addEventListener("click", appState.deleteState);
  }

  // Form/modal setup
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
      UI.resetFormCategories();
      UI.renderProducts(MedicineManager.getMedicine());
    });
  }

  static initDeleteModal() {
    const deleteModalCancel = document.querySelector(".delete-modal__cancel");

    deleteModalCancel.addEventListener("click", () => {
      UI.deleteModal.classList.remove("show-flex");
    });
  }

  // Form helpers
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
    expirationDateInput.value = Utility.ISODateToNormalizedDate(currentMedicine.expirationDate);
    quantityInput.value = currentMedicine.quantity;
    medicineCategorySelect.value = currentMedicine.category;

    UI.renderFormCategories(medicineCategorySelect.value);
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

  // Render logic
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
        createCell(Utility.renderDate(Date.parse(medicine.expirationDate))), // ISO to timestamp
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
        UI.openDeleteModal(medicine.name);
        UI.handleConfirmDeleteButton(medicine.id);
      });
    });
  }

  // App bootstrap
  static init() {
    UI.renderProducts(MedicineManager.getMedicine());
    UI.initFormModal();
    UI.initDeleteModal();
  }
}

export default UI;
