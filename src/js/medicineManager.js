import {
  OralMedicine,
  InjectableMedicine,
  TopicalMedicine,
} from "./medicineClasses.js";
import UI from "./ui.js";

class MedicineManager {
  static medicineList = [];

  static getMedicine() {
    try {
      MedicineManager.medicineList =
        JSON.parse(localStorage.getItem("medicineList")) || [];
      return MedicineManager.medicineList;
    } catch (error) {
      UI.openErrorModal("Could not get medicine from local storage");
      console.error("Could not get medicine from local storage", error);
    }
  }

  static getMedicineDetails(medicine) {
    const medicineDetails = {
      header1: "",
      text1: "",
      header2: "",
      text2: "",
    };

    switch (medicine.category) {
      case "oral":
        if (medicine.absorptionRate) {
          medicineDetails.header1 = "Absorption Rate:";
          medicineDetails.text1 = medicine.absorptionRate;
        }
        if (medicine.foodInteraction) {
          medicineDetails.header2 = "Food Interaction:";
          medicineDetails.text2 = medicine.foodInteraction;
        }
        return medicineDetails;
      case "injectable":
        if (medicine.injectionSite) {
          medicineDetails.header1 = "Injection Site:";
          medicineDetails.text1 = medicine.injectionSite;
        }

        if (medicine.onsetTime) {
          medicineDetails.header2 = "Onset Time:";
          medicineDetails.text2 = medicine.onsetTime;
        }
        return medicineDetails;
      case "topical":
        if (medicine.absorptionLevel) {
          medicineDetails.header1 = "Absorption Level:";
          medicineDetails.text1 = medicine.absorptionLevel;
        }

        if (medicine.residueType) {
          medicineDetails.header2 = "Residue Type:";
          medicineDetails.text2 = medicine.residueType;
        }
        return medicineDetails;
    }
  }

  static storeMedicines() {
    try {
      localStorage.setItem(
        "medicineList",
        JSON.stringify(MedicineManager.medicineList)
      );
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
          medicineInputs.absorptionRateInput.value.trim(),
          medicineInputs.foodInteractionInput.value.trim()
        );
        break;
      case "injectable":
        medicine = new InjectableMedicine(
          medicineInputs.nameInput.value.trim(),
          medicineInputs.manufacturerInput.value.trim(),
          new Date(medicineInputs.expirationDateInput.value).toISOString(),
          medicineInputs.quantityInput.value,
          medicineInputs.medicineCategorySelect.value,
          medicineInputs.injectionSiteInput.value.trim(),
          medicineInputs.onsetTimeInput.value.trim()
        );
        break;
      case "topical":
        medicine = new TopicalMedicine(
          medicineInputs.nameInput.value.trim(),
          medicineInputs.manufacturerInput.value.trim(),
          new Date(medicineInputs.expirationDateInput.value).toISOString(),
          medicineInputs.quantityInput.value,
          medicineInputs.medicineCategorySelect.value,
          medicineInputs.absorptionLevelInput.value.trim(),
          medicineInputs.residueTypeInput.value.trim()
        );
        break;
    }

    MedicineManager.medicineList.push(medicine);
    MedicineManager.storeMedicines();
  }

  static editMedicineData(id, medicineInputs) {
    MedicineManager.medicineList = MedicineManager.getMedicine();

    const medicineIndex = MedicineManager.medicineList.findIndex(
      (medicine) => medicine.id === id
    );
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
