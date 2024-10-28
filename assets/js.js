let selectedFiles = [];
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(
    ".technest-input, .technest-textarea"
  );

  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      if (this.value) {
        this.classList.add("technest-has-value");
      } else {
        this.classList.remove("technest-has-value");
      }
    });

    if (input.value) {
      input.classList.add("technest-has-value");
    }
  });

  const multipleImageUpload = document.getElementById(
    "multipleImageUpload"
  );
  const imagePreviewContainer = document.getElementById(
    "imagePreviewContainer"
  );

  multipleImageUpload.addEventListener("change", function () {
    selectedFiles = Array.from(this.files);
    this.value = "";
    updateImagePreview();
  });

  function updateImagePreview() {
    imagePreviewContainer.innerHTML = "";
    selectedFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("technest-img-container");

        const imgElement = document.createElement("img");
        imgElement.src = e.target.result;
        imgElement.classList.add("technest-preview-image");

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "حذف";
        deleteBtn.classList.add("technest-delete-btn");
        deleteBtn.addEventListener("click", function () {
          selectedFiles.splice(index, 1);
          updateImagePreview();
        });

        imgContainer.appendChild(imgElement);
        imgContainer.appendChild(deleteBtn);
        imagePreviewContainer.appendChild(imgContainer);
      };
      reader.readAsDataURL(file);
    });
  }
});

const sercalElement = document.querySelector(".technest-sercal");
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");
const openPopupButton = document.getElementById("openPopup");
const closePopupButton = document.getElementById("closePopup");

let scrollTimer;

window.addEventListener("scroll", () => {
  sercalElement.classList.add("technest-scroll-hidden");
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    sercalElement.classList.remove("technest-scroll-hidden");
  }, 1000);
});

openPopupButton.addEventListener("click", () => {
  popup.classList.add("technest-popup-active");
  overlay.classList.add("technest-overlay-active");
});

function closePopup() {
  popup.classList.remove("technest-popup-active");
  overlay.classList.remove("technest-overlay-active");
}

closePopupButton.addEventListener("click", closePopup);
overlay.addEventListener("click", closePopup);

document
  .getElementById("submitBtn")
  .addEventListener("click", function (e) {
    e.preventDefault();

    const nameInput = document.querySelector('input[name="name"]');
    const phoneInput = document.querySelector('input[name="phone"]');
    const emailInput = document.querySelector('input[name="email"]');
    const descriptionInput = document.querySelector(
      "textarea.technest-textarea"
    );
    const erormasge = document.querySelector("#erormasge");

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!name) {
      nameInput.style.borderColor = "var(--redcolor)";
      erormasge.innerHTML = "الرجاء إدخال الاسم";
      return;
    }

    const phoneRegex = /^(0|5)\d{8,9}$/;
    if (!phoneRegex.test(phone)) {
      phoneInput.style.borderColor = "var(--redcolor)";
      erormasge.innerHTML = "الرجاء إدخال رقم صحيح";
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailInput.style.borderColor = "var(--redcolor)";
      erormasge.innerHTML = "الرجاء إدخال بريد إلكتروني صحيح";
      return;
    }

    if (!description) {
      descriptionInput.style.borderColor = "var(--redcolor)";
      erormasge.innerHTML = "الرجاء إدخال الوصف";
      return;
    }
    closePopup();

    lickup();

    const fileInput = document.getElementById("multipleImageUpload");
    const dataTransfer = new DataTransfer();

    selectedFiles.forEach((file) => {
      dataTransfer.items.add(file);
    });

    fileInput.files = dataTransfer.files;

    const formData = new FormData(document.getElementById("form"));

    nameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";
    descriptionInput.value = "";
    imagePreviewContainer.innerHTML = "";
    erormasge.innerHTML = "";
    basic();
  });

function basic() {
  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"];

  confetti({
    particleCount: 300,
    spread: 80,
    origin: { x: 0.5, y: 0.7 },
    colors: colors,
    scalar: 1,
    ticks: 260,
    angle: 90,
    zIndex: 9999,
  });
}
function lickup() {
  let technestboxlike = document.getElementById("technest-box-like");

  technestboxlike.style.opacity = "1";
  technestboxlike.style.transform = "translate(-50%, -50%) scale(1)";

  setTimeout(() => {
    technestboxlike.style.opacity = "";
    technestboxlike.style.transform = "";
  }, 3000);
}