import appState from "./appState";
import { Medicine, OralMedicine, InjectableMedicine, TopicalMedicine } from "./medicineClasses";
import Validation from "./validation";

class MedicineManager {
  static medicineList = [];

  static getMedicine() {
    return JSON.parse(localStorage.getItem("medicineList")) || [];
  }

  static storeMedicines() {
    localStorage.setItem("medicineList", JSON.stringify(MedicineManager.medicineList));
  }

  static addMedicine(medicineInputs) {
    MedicineManager.medicineList = MedicineManager.getMedicine();

    let medicine;
    switch (medicineInputs.medicineCategorySelect.value) {
      case "oral":
        medicine = new OralMedicine(
          medicineInputs.nameInput.value.trim(),
          medicineInputs.manufacturerInput.value.trim(),
          new Date(medicineInputs.expirationDateInput.value).toISOString(),
          medicineInputs.quantityInput.value,
          medicineInputs.medicineCategorySelect.value,
          medicineInputs.absorptionRateInput.value,
          medicineInputs.foodInteractionInput.value
        );
        break;
      case "injectable":
        medicine = new InjectableMedicine(
          medicineInputs.nameInput.value.trim(),
          medicineInputs.manufacturerInput.value.trim(),
          new Date(medicineInputs.expirationDateInput.value).toISOString(),
          medicineInputs.quantityInput.value,
          medicineInputs.medicineCategorySelect.value,
          medicineInputs.injectionSiteInput.value,
          medicineInputs.onsetTimeInput.value
        );
        break;
      case "topical":
        medicine = new TopicalMedicine(
          medicineInputs.nameInput.value.trim(),
          medicineInputs.manufacturerInput.value.trim(),
          new Date(medicineInputs.expirationDateInput.value).toISOString(),
          medicineInputs.quantityInput.value,
          medicineInputs.medicineCategorySelect.value,
          medicineInputs.absorptionLevelInput.value,
          medicineInputs.residueTypeInput.value
        );
        break;
    }

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
