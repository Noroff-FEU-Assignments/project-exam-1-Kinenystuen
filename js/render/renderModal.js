

let modal = "";
export async function openModal(imageSrc, imageAlt) {
  modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const captionText = document.getElementById(`caption`);

  // checks is there is alt text for the image
  if (!imageAlt) {
    //imageAlt = `No caption`;
  }

  modal.style.display = "block";
  modal.classList.add("modalActive");
  modalImage.src = imageSrc;
  modalImage.alt = "Image Preview";
  captionText.innerHTML = imageAlt;
}

function closeModal() {
  modal.style.display = "none";
  modal.classList.remove("modalActive");
}

// Get the <span> element that closes the modal
let span = document.querySelector(".close");

// When the user clicks on <span> (x), close the modal
if (span) {
  span.addEventListener("click", function () {
    closeModal();
  });
}
window.onclick = function (event) {
  if (event.target === modal) {
    closeModal();
  }
};

// Event listener for keydown event
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" || event.key === "Esc" || event.keyCode === 27) {
    closeModal();
  }
});
