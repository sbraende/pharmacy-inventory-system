# Pharmacy Inventory Management System

The **Pharmacy Inventory Management System** is a class-based web application for managing a medicine inventory. This project practices Object-Oriented Programming principles using vanilla JavaScript and is one of the assigments at Høyskolen Kristinia.

## Features

- **Medicine Inventory Table**: View all registered medicine entries in a structured and responsive table.
- **Add/Edit/Delete**: Input, modify, or remove medicine records.
- **OOP with Inheritance**: Implements a `Medicine` class with inheritance for different types (e.g., oral, injectable, topical).
- **Local Storage Support**: Data persists even after page refresh.
- **Form Validation**: Ensures fields are completed before submission.
- **Responsive UI**: Designed for both desktop and mobile.

**Live site:** [https://sbraende-inventory-system.netlify.app/](https://sbraende-inventory-system.netlify.app/)

![Screenshot](/public/assets/images/screenshots/screenshot.png)

## Medicine Data Structure

Each medicine entry contains the following:

- **Name** (e.g., Paracetamol)
- **Manufacturer**
- **Expiration Date** (stored in ISO 8601 format)
- **Quantity**
- **Unique Product ID** (generated automatically)
- **Category-specific details** (e.g., absorption rate, injection site, residue type)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/sbraende/pharmacy-inventory-system
```

2. Navigate into the source directory:

```bash
cd pharmacy-inventory-system
```

3. Install dependencies.

```bash
npm install
```

3. Run local server.

```bash
npm run dev
```

## References

HTML table styling inspiration:

- **dcode** at https://www.youtube.com/watch?v=biI9OFH6Nmg

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it under the license terms.
