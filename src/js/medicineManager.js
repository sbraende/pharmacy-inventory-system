import { v4 as uuidv4 } from "uuid";

class MedicineManager {
  static medicineList = JSON.parse(localStorage.getItem("medicineList")) || [];

  static addMedicine(
    nameInput,
    manufacturerInput,
    expirationDateInput,
    quantityInput,
    categorySelect
  ) {
    const medicine = {
      productName: "productName",
      productId: uuidv4(),
      manufacturer: "manufacturerName",
      expirationDate: new Date("2025-03-20").toISOString(),
      quantity: 0,
    };
    localStorage.setItem("medicineList", JSON.stringify(medicine));
    console.log("item added:", medicine);
  }
}

export default MedicineManager;
