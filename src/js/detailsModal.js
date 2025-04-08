class DetailsModal {
  static renderDetailsModal(parent, medicineDetails) {
    const detailsModal = document.createElement("div");

    // Group details 1
    const modalGroup1 = document.createElement("div");
    detailsModal.append(modalGroup1);

    const header1Element = document.createElement("span");
    header1Element.className = "details-modal__heading details-modal__heading1";
    header1Element.textContent = medicineDetails.header1;

    const text1Element = document.createElement("span");
    text1Element.className = "details-modal__text details-modal__text1";
    text1Element.textContent = medicineDetails.text1;

    modalGroup1.append(header1Element, text1Element);

    // Group details 2
    const modalGroup2 = document.createElement("div");
    detailsModal.append(modalGroup2);

    const header2Element = document.createElement("span");
    header2Element.className = "details-modal__heading details-modal__heading2";
    header2Element.textContent = medicineDetails.header2;

    const text2Element = document.createElement("span");
    text2Element.className = "details-modal__text details-modal__text2";
    text2Element.textContent = medicineDetails.text2;

    modalGroup2.append(header2Element, text2Element);

    parent.append(detailsModal);
  }
}

export default DetailsModal;
