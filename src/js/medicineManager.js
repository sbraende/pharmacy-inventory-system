import { Medicine } from "./medicineClasses";
import Validation from "./validation";

class MedicineManager {
  static medicineList = this.getMedicine();

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
    // render interface
  }
}

export default MedicineManager;
