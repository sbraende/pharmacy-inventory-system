import appState from "./appState";
import { Medicine } from "./medicineClasses";
import Validation from "./validation";

class MedicineManager {
  static medicineList = [];

  static getMedicine() {
    return JSON.parse(localStorage.getItem("medicineList")) || [];
  }

  static storeMedicines() {
    localStorage.setItem("medicineList", JSON.stringify(MedicineManager.medicineList));
  }

  static addMedicine(
    nameInput,
    manufacturerInput,
    expirationDateInput,
    quantityInput,
    categorySelect
  ) {
    MedicineManager.medicineList = MedicineManager.getMedicine();
    const medicine = new Medicine(
      nameInput.value.trim(),
      manufacturerInput.value.trim(),
      new Date(expirationDateInput.value).toISOString(),
      quantityInput.value,
      categorySelect.value
    );
    MedicineManager.medicineList.push(medicine);
    MedicineManager.storeMedicines();
  }

  static editMedicineData(
    id,
    nameInput,
    manufacturerInput,
    expirationDateInput,
    quantityInput,
    medicineCategorySelect
  ) {
    MedicineManager.medicineList = MedicineManager.getMedicine();
    const medicineIndex = MedicineManager.medicineList.findIndex((medicine) => medicine.id === id);

    if (medicineIndex !== -1) {
      MedicineManager.medicineList[medicineIndex] = {
        id,
        name: nameInput.value.trim(),
        manufacturer: manufacturerInput.value.trim(),
        expirationDate: expirationDateInput.value,
        quantity: quantityInput.value.trim(),
        category: medicineCategorySelect.value.trim(),
      };
    }
    MedicineManager.storeMedicines();
  }

  static removeMedicine(id) {
    MedicineManager.medicineList = MedicineManager.getMedicine();
    MedicineManager.medicineList = MedicineManager.medicineList.filter(
      (medicine) => id !== medicine.id
    );
    MedicineManager.storeMedicines();
  }
}

export default MedicineManager;
