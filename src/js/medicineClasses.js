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
  constructor(
    name,
    manufacturer,
    expirationDate,
    quantity,
    category,
    absorptionRate,
    foodInteraction
  ) {
    super(name, manufacturer, expirationDate, quantity, category);
    this.absorptionRate = absorptionRate;
    this.foodInteraction = foodInteraction;
  }
}

class InjectableMedicine extends Medicine {
  constructor(name, manufacturer, expirationDate, quantity, category, injectionSite, onsetTime) {
    super(name, manufacturer, expirationDate, quantity, category);
    this.injectionSite = injectionSite;
    this.onsetTime = onsetTime;
  }
}

class TopicalMedicine extends Medicine {
  constructor(
    name,
    manufacturer,
    expirationDate,
    quantity,
    category,
    absorptionLevel,
    residueType
  ) {
    super(name, manufacturer, expirationDate, quantity, category);
    this.absorptionLevel = absorptionLevel;
    this.residueType = residueType;
  }
}

export { Medicine, OralMedicine, InjectableMedicine, TopicalMedicine };
