// document.addEventListener('DOMContentLoaded', function () {
//     // Get all elements with the class 'blog-image'
//     const blogImages = document.querySelectorAll('.blog-image, .blogCard-img');
  
//     // Attach click event listeners to each image
//     blogImages.forEach(function (image) {
//       image.addEventListener('click', function () {
//         const imagePath = image.getAttribute('src');
//         const imageAlt = image.hasAttribute('alt') ? image.getAttribute('alt') : '';
//         openModal(imagePath, imageAlt);
//       });
//     });
//   });
  
let modal;
export function openModal(imageSrc, imageAlt) {
    modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const captionText = document.getElementById(`caption`);
  
    // checks is there is alt text for the image
    if (!imageAlt) {
        imageAlt = `No caption`;
    }


    modal.style.display = 'block';
    modalImage.src = imageSrc;
    modalImage.alt = 'Image Preview';
    captionText.innerHTML = imageAlt;
    console.log(imageAlt);
    console.log(imageSrc)
  }
  
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
    span.addEventListener(`click`, function () {
        modal.style.display = "none"
    });

  window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  };
  