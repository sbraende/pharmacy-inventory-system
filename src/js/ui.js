import MedicineManager from "./medicineManager";

class UI {
  static addModal = document.querySelector(".add-modal");
  static formElement = document.querySelector(".form");

  static renderDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString("en-GB", { dateStyle: "medium" });
  }

  static renderMedicineList(medicineList) {
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
        createCell(this.renderDate(Date.parse(medicine.expirationDate))), // ISO to timestamp
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
    });
  }

  static openFormModal() {
    this.addModal.classList.add("show-flex");
  }

  static closeFormModal() {
    this.addModal.classList.remove("show-flex");
  }

  static initFormModal() {
    const addMedicineButton = document.querySelector(".inventory__add-new-product-button");
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
