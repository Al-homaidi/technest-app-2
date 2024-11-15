const sercalElement = document.querySelector(".technest-sercal");
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");
const openPopupButton = document.getElementById("openPopup");
const closePopupButton = document.getElementById("closePopup");
let positionleftorright = "";
const technestsercal = document.querySelector(".technest-sercal");
technestsercal.style.display = "none";

async function fetchImagesArray() {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/testimonial/1/groups"
    );
    const data = await response.json();
    console.log(data);

    //   const triggerButton = document.querySelector(".testimonials-trigger");
    //   const span = triggerButton.querySelector("span");

    //   const technest_text = document.querySelector(".technest-text");

    //   if (data.testimonial_icon_type == "custom") {
    //     // testimonial_icon.setAttribute("src", "");
    //     // testimonial_icon.style.display = "none";

    //     technest_text.textContent =
    //       data.testimonial_logo_text ?? "تجارب عملائنا";
    //     technest_text.style.color =
    //       data.testimonial_logo_text_color ?? "black";
    //     technest_text.style.backgroundColor =
    //       data.testimonial_logo_bg_color ?? "white";
    //     technest_text.style.display = "flex";
    //     technest_text.style.alignItems = "center";
    //     technest_text.style.justifyContent = "center";
    //     technest_text.style.width = "100%";
    //     technest_text.style.height = "100%";
    //   } else {
    //     // testimonial_icon.setAttribute("src", data.testimonial_icon);
    //     // testimonial_icon.style.display = "initial";

    //     technest_text.style.display = "none";
    //     technest_text.style.color = "initial";
    //     technest_text.style.backgroundColor = "initial";
    //   }

    switch (data.testimonial_icon_position) {
      case "right_up":
        technestsercal.style.top = "100px";
        technestsercal.style.right = "7px";
        positionleftorright = "technest-scroll-hidden-right";
        break;
      case "right_middle":
        technestsercal.style.top = "50%";
        technestsercal.style.right = "7px";
        technestsercal.style.transform = "translateY(-50%)";
        positionleftorright = "technest-scroll-hidden-right";
        break;
      case "right_down":
        technestsercal.style.bottom = "20px";
        technestsercal.style.right = "7px";
        positionleftorright = "technest-scroll-hidden-right";
        break;
      case "left_up":
        technestsercal.style.top = "100px";
        technestsercal.style.left = "7px";
        positionleftorright = "technest-scroll-hidden-left";
        break;
      case "left_middle":
        technestsercal.style.top = "50%";
        technestsercal.style.left = "7px";
        technestsercal.style.transform = "translateY(-50%)";
        positionleftorright = "technest-scroll-hidden-left";
        break;
      case "left_down":
        technestsercal.style.bottom = "20px";
        technestsercal.style.left = "7px";
        positionleftorright = "technest-scroll-hidden-left";
        break;
      default:
        technestsercal.style.top = "100px";
        technestsercal.style.right = "7px";
        positionleftorright = "technest-scroll-hidden-left";
    }

    setTimeout(() => {
      technestsercal.style.display = "block";
    }, 1000);
  } catch (error) {
    console.error("Error fetching images array:", error);
  }
}

let selectedFiles = [];
document.addEventListener("DOMContentLoaded", () => {
  fetchImagesArray();
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

  const multipleImageUpload = document.getElementById("multipleImageUpload");
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

let scrollTimer;

window.addEventListener("scroll", () => {
  if (positionleftorright) {
    sercalElement.classList.add(`${positionleftorright}`);
  }
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    if (positionleftorright) {
      sercalElement.classList.remove(`${positionleftorright}`);
    }
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

document.getElementById("submitBtn").addEventListener("click", function (e) {
  e.preventDefault();

  const inputs = document.querySelectorAll("input, textarea");
  let isValid = true;

  inputs.forEach((input) => {
    const inputGroup =
      input.closest(".technest-input-group") ||
      input.closest(".textarea-box-textarea");
    const label = inputGroup?.querySelector(".technest-user-label");

    if (!label) return;

    const value = input.value.trim();
    const originalLabelText = label.dataset.originalText || label.innerHTML;

    if (!label.dataset.originalText) {
      label.dataset.originalText = originalLabelText;
    }

    if (input.name === "name" && !value) {
      input.style.borderColor = "var(--redcolor)";
      label.innerHTML = "الرجاء إدخال الاسم";
      label.style.color = "var(--redcolor)";
      isValid = false;
    } else if (input.name === "phone") {
      const phoneRegex = /^(0|5)\d{8,9}$/;
      if (!phoneRegex.test(value)) {
        input.style.borderColor = "var(--redcolor)";
        label.innerHTML = "الرجاء إدخال رقم صحيح";
        label.style.color = "var(--redcolor)";
        isValid = false;
      }
    } else if (input.name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        input.style.borderColor = "var(--redcolor)";
        label.innerHTML = "الرجاء إدخال بريد إلكتروني صحيح";
        label.style.color = "var(--redcolor)";
        isValid = false;
      }
    } else if (
      (input.name === "description" ||
        input.classList.contains("technest-textarea")) &&
      !value
    ) {
      input.style.borderColor = "var(--redcolor)";
      label.innerHTML = "الرجاء إدخال الوصف";
      label.style.color = "var(--redcolor)";
      isValid = false;
    } else {
      input.style.borderColor = "var(--maincolor)";
      label.innerHTML = originalLabelText;
      label.style.color = "";
    }

    input.addEventListener("focus", () => {
      input.style.borderColor = "";
      label.innerHTML = originalLabelText;
      label.style.color = "";
    });

    input.addEventListener("blur", () => {
      if (!input.value.trim()) {
        input.style.borderColor = "var(--redcolor)";
        label.innerHTML = "الرجاء تعبئة الحقل";
        label.style.color = "var(--redcolor)";
      }
    });
  });

  if (!isValid) {
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

  inputs.forEach((input) => {
    input.value = "";
    // input.blur();
  });

  imagePreviewContainer.innerHTML = "";

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
