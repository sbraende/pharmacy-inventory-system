import { v4 as uuidv4 } from "uuid";

class Medicine {
  constructor(name, manufacturer, expirationDate, quantity, category) {
    this.id = uuidv4();
    this.name = name;
    this.manufacturer = manufacturer;
    this.expirationDate = expirationDate;
    this.quantity = quantity;
    this.category = category;
  }
}

class OralMedicine extends Medicine {
  constructor(obsorptionRate, foodInteraction) {
    super();
    this.obsorptionRate = obsorptionRate;
    this.foodInteraction = foodInteraction;
  }
}

export { Medicine, OralMedicine };
