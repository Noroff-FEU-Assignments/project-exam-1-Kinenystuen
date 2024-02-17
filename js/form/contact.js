// Form elements
const contactForm = document.getElementById("contactForm");
const urlPost = "https://formspree.io/f/xrgnqyyl";
//name elements
const formFillName = document.querySelector(".formFill-name");
const fullName = document.getElementById("name");
const nameError = document.getElementById("name-error");
const validNameIcon = document.querySelector(".validIcon-name");

//email elements
const formFillEmail = document.querySelector(".formFill-email");
const email = document.getElementById("email");
const emailError = document.getElementById("email-error");
const validEmailIcon = document.querySelector(".validIcon-email");

//subject elements
const formFillSubject = document.querySelector(".formFill-subject");
const subjectId = document.getElementById("subject");
const subjectError = document.getElementById("subject-error");
const validSubjectIcon = document.querySelector(".validIcon-subject");

//message elements
const formFillMessage = document.querySelector(".formFill-message");
const messageId = document.getElementById("message");
const messageError = document.getElementById("message-error");
const validMessageIcon = document.querySelector(".validIcon-message");

// If form is valid display success
const sectionContact = document.querySelector(".sectionContact");
const submitButton = document.querySelector(".sendButton");
const sendMessageContainer = document.querySelector(".sendMessageContainer");
const legend = document.querySelector("legend");
const formInput = document.querySelectorAll(".form-input");
const messageInput = document.getElementById("message");
const instruction = document.querySelectorAll(".instruction");

// Loader div
const loaderBackground = document.createElement("div");
const loaderArea = document.createElement("div");
const loader = document.createElement("div");
loaderBackground.className = "overlay";
loaderArea.className = "loaderArea";
loader.className = "loader";

loaderArea.appendChild(loader);
loaderBackground.appendChild(loaderArea);

// Validate contact form
export async function validateForm(event) {
  event.preventDefault();

  // Validate input values
  // Name
  if (checkLength(fullName.value, 4) === true) {
    formFillName.classList.remove("formFill-error");
    nameError.classList.add("formError");
    validNameIcon.setAttribute("data-visible", true);
  } else {
    formFillName.classList.add("formFill-error");
    nameError.classList.remove("formError");
    validNameIcon.setAttribute("data-visible", false);
  }
  // Email
  if (validateEmail(email.value) === true) {
    formFillEmail.classList.remove("formFill-error");
    emailError.classList.add("formError");
    validEmailIcon.setAttribute("data-visible", true);
  } else {
    formFillEmail.classList.add("formFill-error");
    emailError.classList.remove("formError");
    validEmailIcon.setAttribute("data-visible", false);
  }
  // Subject
  if (checkLength(subjectId.value, 14) === true) {
    formFillSubject.classList.remove("formFill-error");
    subjectError.classList.add("formError");
    validSubjectIcon.setAttribute("data-visible", true);
  } else {
    formFillSubject.classList.add("formFill-error");
    subjectError.classList.remove("formError");
    validSubjectIcon.setAttribute("data-visible", false);
  }
  // Message
  if (checkLength(messageId.value, 24) === true) {
    formFillMessage.classList.remove("formFill-error");
    messageError.classList.add("formError");
    validMessageIcon.setAttribute("data-visible", true);
  } else {
    formFillMessage.classList.add("formFill-error");
    messageError.classList.remove("formError");
    validMessageIcon.setAttribute("data-visible", false);
  }

  const nameValue = fullName.value;
  const emailValue = email.value;
  const subjectValue = subjectId.value;
  const contentValue = messageId.value;

  // Prepare comment data
  const contactData = {
    author_name: nameValue,
    author_email: emailValue,
    subject: subjectValue,
    content: contentValue,
  };
  console.log(contactData);

  function ifContactFormValid() {
    if (
      checkLength(fullName.value, 4) &&
      checkLength(subjectId.value, 14) &&
      checkLength(messageId.value, 24) &&
      validateEmail(email.value)
    ) {
      // Add loader
      sectionContact.appendChild(loaderBackground);
      loader.style.display = "block";
      setTimeout(() => {
        submitForm();
        loader.style.display = "none";
        loaderBackground.style.display = "none";
      }, 2000);
    } else {
      console.log("something went wrong");
    }
  }
  ifContactFormValid();
}

// Submit form function
async function submitForm() {
  const formData = new FormData(contactForm);
  const url = contactForm.getAttribute("action");
  const method = contactForm.getAttribute("method");
  try {
    const response = await fetch(url, {
      method: method,
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    const result = await response.text();
    // Display success message
    console.log(result);
    sendMessageContainer.style.display = "block";
    submitButton.setAttribute(
      "style",
      "color: #fff; background: #3a5964; border-color:#3a5964 "
    );
    submitButton.innerHTML = "Submitted";
    legend.innerText = "Summary";
    formInput.forEach((input) => {
      input.style.border = "none";
      input.disabled = true;
    });
    instruction.forEach((item) => (item.style.display = "none"));
    messageInput.style.border = "none";
    messageInput.disabled = true;
    sendMessageContainer.scrollIntoView({
      behavior: "smooth", // Use smooth scrolling
    });
  } catch (error) {
    console.error("Form submission error", error);
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.innerHTML = sendMessageContainer.style.display = "block";
    sendMessageContainer.innerHTML = `
    <div class="sendMessageSuccess">
      <div>
        <h3>Form submission error</h3>
        <p>Error message: ${error}</p>
      </div>
    </div>`;

    sendMessageContainer.scrollIntoView({
      behavior: "smooth", // Use smooth scrolling
    });
  }

  // Additional actions after successful form submission
}

// Attach event listener to form submission
if (document.getElementById("contactForm")) {
  contactForm.addEventListener("submit", validateForm);
}

// Function to check length of value in form
function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}
// Email checker
function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

const currentUrl = window.location.href;

if (currentUrl.includes("contact_us")) {
  contactForm.addEventListener("submit", validateForm);
}
