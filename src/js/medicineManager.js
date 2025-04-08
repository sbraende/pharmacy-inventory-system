import { OralMedicine, InjectableMedicine, TopicalMedicine } from "./medicineClasses";
import UI from "./ui";

class MedicineManager {
  static medicineList = [];

  static getMedicine() {
    try {
      MedicineManager.medicineList = JSON.parse(localStorage.getItem("medicineList")) || [];
      return MedicineManager.medicineList;
    } catch (error) {
      UI.openErrorModal("Could not get medicine from local storage");
      console.error("Could not get medicine from local storage", error);
    }
  }

  static storeMedicines() {
    try {
      localStorage.setItem("medicineList", JSON.stringify(MedicineManager.medicineList));
    } catch (error) {
      UI.openErrorModal("Could not store medicine in local storage");
      console.error("Could not store medicine in local storage", error);
    }
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

  static editMedicineData(id, medicineInputs) {
    MedicineManager.medicineList = MedicineManager.getMedicine();

    const medicineIndex = MedicineManager.medicineList.findIndex((medicine) => medicine.id === id);
    if (medicineIndex === -1) return;

    let updatedMedicine;

    switch (medicineInputs.medicineCategorySelect.value.trim()) {
      case "oral":
        updatedMedicine = new OralMedicine(
          medicineInputs.nameInput.value.trim(),
          medicineInputs.manufacturerInput.value.trim(),
          new Date(medicineInputs.expirationDateInput.value).toISOString(),
          medicineInputs.quantityInput.value.trim(),
          "oral",
          medicineInputs.absorptionRateInput.value.trim(),
          medicineInputs.foodInteractionInput.value.trim()
        );
        break;

      case "injectable":
        updatedMedicine = new InjectableMedicine(
          medicineInputs.nameInput.value.trim(),
          medicineInputs.manufacturerInput.value.trim(),
          new Date(medicineInputs.expirationDateInput.value).toISOString(),
          medicineInputs.quantityInput.value.trim(),
          "injectable",
          medicineInputs.injectionSiteInput.value.trim(),
          medicineInputs.onsetTimeInput.value.trim()
        );
        break;

      case "topical":
        updatedMedicine = new TopicalMedicine(
          medicineInputs.nameInput.value.trim(),
          medicineInputs.manufacturerInput.value.trim(),
          new Date(medicineInputs.expirationDateInput.value).toISOString(),
          medicineInputs.quantityInput.value.trim(),
          "topical",
          medicineInputs.absorptionLevelInput.value.trim(),
          medicineInputs.residueTypeInput.value.trim()
        );
        break;
    }

    updatedMedicine.id = id; // Keep current id
    MedicineManager.medicineList[medicineIndex] = updatedMedicine;
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
