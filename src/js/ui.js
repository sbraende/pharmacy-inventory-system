import MedicineManager from "./medicineManager";
import appState from "./appState";
import Validation from "./validation";
import Utility from "./utility";
import DetailsModal from "./detailsModal";

class UI {
  static addModal = document.querySelector(".add-modal");
  static formElement = document.querySelector(".form");
  static formSubmitButton = document.querySelector(".form__submit-button");
  static deleteModal = document.querySelector(".delete-modal");
  static errorModal = document.querySelector(".error-modal");
  static errorModalMessage = document.querySelector(".error-modal__message");

  // Modal control
  static openFormModal() {
    const medicineCategorySelect = document.querySelector(
      ".form__medicine-category"
    );
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

  static openErrorModal(message) {
    UI.errorModalMessage.textContent = message;
    UI.errorModal.classList.add("error-modal--active");
  }

  static closeErrorModal() {
    UI.errorModalMessage.textContent = "";
    UI.errorModal.classList.remove("error-modal--active");
  }

  // Event handlers helpers
  static renderFormCategories(category) {
    UI.resetFormCategories();

    switch (category) {
      case "oral":
        document
          .querySelector(".form__oral-medicaiton")
          .classList.add("form__category--show");
        break;
      case "injectable":
        document
          .querySelector(".form__injectable-medication")
          .classList.add("form__category--show");
        break;
      case "topical":
        document
          .querySelector(".form__topical-medicaiton")
          .classList.add("form__category--show");
        break;
    }
  }

  static performDelete(id) {
    MedicineManager.removeMedicine(id);
    UI.renderProducts(MedicineManager.medicineList);
  }

  static handleConfirmDeleteButton(id) {
    const deleteModalConfirmDeleteButton = document.querySelector(
      ".delete-modal__confirm"
    );

    if (appState.deleteState) {
      deleteModalConfirmDeleteButton.removeEventListener(
        "click",
        appState.deleteState
      );
    }

    appState.deleteState = () => {
      UI.performDelete(id);
      UI.closeDeleteModal();
      appState.deleteState = null;
    };

    deleteModalConfirmDeleteButton.addEventListener(
      "click",
      appState.deleteState
    );
  }

  static getMedicineInputs() {
    return {
      nameInput: document.querySelector(".form__name-input"),
      manufacturerInput: document.querySelector(".form__manufacturer-input"),
      expirationDateInput: document.querySelector(
        ".form__expiration-date-input"
      ),
      quantityInput: document.querySelector(".form__quantity-input"),
      medicineCategorySelect: document.querySelector(
        ".form__medicine-category"
      ),

      absorptionRateInput: document.querySelector(
        ".form__absorption-rate-input"
      ),
      foodInteractionInput: document.querySelector(
        ".form__food-interaction-input"
      ),

      injectionSiteInput: document.querySelector(".form__injection-site-input"),
      onsetTimeInput: document.querySelector(".form__onset-time-input"),

      absorptionLevelInput: document.querySelector(
        ".form__absorption-level-input"
      ),
      residueTypeInput: document.querySelector(".form__residue-type-input"),
    };
  }

  // Form/modal setup
  static initFormModal() {
    const addMedicineButton = document.querySelector(
      ".inventory__add-new-product-button"
    );
    const formCancelButton = document.querySelector(".form__cancel-button");

    addMedicineButton.addEventListener("click", () => {
      UI.openFormModal();
    });

    formCancelButton.addEventListener("click", () => {
      UI.closeFormModal();
    });

    UI.formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const medicineInputs = UI.getMedicineInputs();

      if (!Validation.validateForm()) {
        return;
      }

      if (!appState.editState) {
        // Add mode
        MedicineManager.addMedicine(medicineInputs);
      } else {
        // Edit mode
        MedicineManager.editMedicineData(appState.editState, medicineInputs);
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
  static populateInputFields(id, medicineInputs) {
    const medicineList = MedicineManager.getMedicine();
    const currentMedicine = medicineList.find((medicine) => medicine.id === id);

    medicineInputs.nameInput.value = currentMedicine.name;
    medicineInputs.manufacturerInput.value = currentMedicine.manufacturer;
    medicineInputs.expirationDateInput.value = Utility.ISODateToNormalizedDate(
      currentMedicine.expirationDate
    );
    medicineInputs.quantityInput.value = currentMedicine.quantity;
    medicineInputs.medicineCategorySelect.value = currentMedicine.category;

    medicineInputs.absorptionRateInput.value =
      currentMedicine.absorptionRate || "";
    medicineInputs.foodInteractionInput.value =
      currentMedicine.foodInteraction || "";
    medicineInputs.injectionSiteInput.value =
      currentMedicine.injectionSite || "";
    medicineInputs.onsetTimeInput.value = currentMedicine.onsetTime || "";
    medicineInputs.absorptionLevelInput.value =
      currentMedicine.absorptionLevel || "";
    medicineInputs.residueTypeInput.value = currentMedicine.residueType || "";

    UI.renderFormCategories(medicineInputs.medicineCategorySelect.value);
  }

  static editMedicine(id) {
    const medicineInputs = UI.getMedicineInputs();

    UI.openFormModal();
    UI.formSubmitButton.textContent = "Confirm Edit";

    UI.populateInputFields(id, medicineInputs);
    appState.editState = id;
  }

  // Render logic
  static renderProducts(medicineList) {
    const productTableBody = document.querySelector(".product-table__body");
    productTableBody.innerHTML = "";

    if (medicineList.length === 0) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 7;
      cell.textContent = "Click '+' button to add medicine";
      cell.style.textAlign = "center";

      row.append(cell);
      productTableBody.append(row);
    } else {
      medicineList.forEach((medicine) => {
        const row = document.createElement("tr");

        const createCell = (text) => {
          const cell = document.createElement("td");
          cell.textContent = text;
          return cell;
        };

        const createDetailsCell = () => {
          const cell = document.createElement("td");
          cell.classList.add("product-table__details-cell");

          const infoIconButton = document.createElement("button");
          infoIconButton.classList.add("product-table__details-button");
          cell.append(infoIconButton);

          const infoIcon = document.createElement("img");
          infoIcon.src = "/assets/icons/info-circle-solid.svg";
          infoIcon.alt = "Info icon";
          infoIcon.classList.add("product-table__details-icon");
          infoIconButton.append(infoIcon);
          let isDetailsShown = false;

          // Handle show details modal
          infoIconButton.addEventListener("click", (e) => {
            if (!isDetailsShown) {
              // dispay info
              DetailsModal.renderDetailsModal(
                e.currentTarget,
                MedicineManager.getMedicineDetails(medicine)
              );
              infoIcon.src = "/assets/icons/info-circle.svg";
              isDetailsShown = true;
            } else {
              // hide info
              infoIconButton.innerHTML = "";
              infoIconButton.append(infoIcon); // reappend infoIcon
              infoIcon.src = "/assets/icons/info-circle-solid.svg";
              isDetailsShown = false;
            }
          });

          return cell;
        };

        const createEditCell = () => {
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

          editButton.addEventListener("click", () => {
            UI.editMedicine(medicine.id);
          });

          deleteButton.addEventListener("click", () => {
            UI.openDeleteModal(medicine.name);
            UI.handleConfirmDeleteButton(medicine.id);
          });

          return editDeleteCell;
        };

        row.append(
          createCell(medicine.name),
          createCell(medicine.manufacturer),
          createCell(
            Utility.TimestampToDisplayDate(Date.parse(medicine.expirationDate))
          ), // ISODate to Dateobject to Render Date
          createCell(medicine.quantity),
          createCell(medicine.category),
          createDetailsCell(),
          createEditCell()
        );

        productTableBody.append(row);
      });
    }
  }

  // App bootstrap
  static init() {
    UI.renderProducts(MedicineManager.getMedicine());
    UI.initFormModal();
    UI.initDeleteModal();
  }
}

export default UI;
