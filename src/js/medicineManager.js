import { Medicine } from "./medicineClasses";
import Validation from "./validation";

class MedicineManager {
  static medicineList = [];

  static getMedicine() {
    return JSON.parse(localStorage.getItem("medicineList")) || [];
  }

  static addMedicine(
    nameInput,
    manufacturerInput,
    expirationDateInput,
    quantityInput,
    categorySelect
  ) {
    if (!Validation.validateForm()) {
      return;
    }

    this.medicineList = this.getMedicine();
    const medicine = new Medicine(
      nameInput.value.trim(),
      manufacturerInput.value.trim(),
      new Date(expirationDateInput.value).toISOString(),
      quantityInput.value,
      categorySelect.value
    );
    this.medicineList.push(medicine);
    localStorage.setItem("medicineList", JSON.stringify(this.medicineList));
  }

  static removeMedicine(id) {
    this.medicineList = this.getMedicine();
    const filteredList = this.medicineList.filter((medicine) => id !== medicine.id);
    localStorage.setItem("medicineList", JSON.stringify(filteredList));
    this.medicineList = filteredList;
  }
}

export default MedicineManager;
