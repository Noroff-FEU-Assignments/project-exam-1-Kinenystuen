/* 
Comments sections 
*/

export async function getComments(post) {
  console.log(post);
  const postId = post.id;
  const url = `https://www.kineon.no/wp-json/wp/v2/comments?post=${postId}`;
  try {
    const responseC = await fetch(url);
    if (!responseC.ok) {
      throw new Error(`API request failed with status: ` + responseC.status);
    }
    const comments = await responseC.json();

    displayComments(comments, postId);
  } catch (error) {
    console.log("Error selectedMovie: " + error);
    return;
  }
}

export async function displayComments(comments, postId) {
  async function updateComments() {
    try {
      const response = await fetch(
        `https://www.kineon.no/wp-json/wp/v2/comments?post=${postId}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch comments: ${response.status}`);
      }
      const updatedComments = await response.json();
      await renderComments(updatedComments);
      console.log(updatedComments);
    } catch (error) {
      console.error("Error updating comments:", error);
    }
  }

  function renderComments(comments) {
    const containerComments = document.getElementById("containerComments");
    containerComments.className = "containerComments";

    const h3Cmt = document.getElementById("h3Cmt");
    h3Cmt.innerHTML = `Comments (${comments.length})`;

    if (comments.length === 0) {
      containerComments.innerHTML = "";
      const commentDiv = document.createElement("div");
      commentDiv.className = "cmtBox";
      const cmtPar = document.createElement(`p`);
      cmtPar.innerText = "Be the first to comment on the post!";
      commentDiv.appendChild(cmtPar);
      containerComments.appendChild(commentDiv);
    } else {
      containerComments.innerHTML = "";
      comments.reverse().forEach(function (comment) {
        const commentDiv = document.createElement("div");
        commentDiv.className = "cmtBox";
        const cmtBoxInfo = document.createElement("div");
        cmtBoxInfo.className = "cmtBox-info";
        const cmtBoxInfoH3 = document.createElement("h4");
        cmtBoxInfoH3.className = "cmtBox-info_h3";
        cmtBoxInfoH3.innerHTML = comment.author_name;
        const cmtBoxInfoP = document.createElement("p");
        cmtBoxInfoP.className = "cmtBox-info_p";
        const formattedDate = new Date(comment.date).toLocaleDateString(
          "en-US",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        );
        cmtBoxInfoP.innerHTML = formattedDate;
        cmtBoxInfo.appendChild(cmtBoxInfoH3);
        cmtBoxInfo.appendChild(cmtBoxInfoP);
        const cmtBoxText = document.createElement("p");
        cmtBoxText.innerHTML = comment.content.rendered;
        cmtBoxText.className = "cmtBox-text";
        commentDiv.appendChild(cmtBoxInfo);
        commentDiv.appendChild(cmtBoxText);
        containerComments.appendChild(commentDiv);
      });
    }
    // console.log(commentDiv);
  }

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Form elements
    const commentForm = document.getElementById("commentForm");
    //name elements
    const formFillName = document.querySelector(".formFill-name");
    const name = document.getElementById("name");
    const nameError = document.getElementById("name-error");
    const validNameIcon = document.querySelector(".validIcon-name");

    //email elements
    const formFillEmail = document.querySelector(".formFill-email");
    const email = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    const validEmailIcon = document.querySelector(".validIcon-email");

    //message elements
    const formFillMessage = document.querySelector(".formFill-message");
    const comment = document.getElementById("comment");
    const messageError = document.getElementById("message-error");
    const validMessageIcon = document.querySelector(".validIcon-message");
    console.log(comment);
    if (comment === "null") {
      comment.value = 0;
    }

    // If form is valid display success
    const sectionContact = document.querySelector(".sectionContact");
    const submitButton = document.querySelector(".sendButton");
    const publishedCommentContainer = document.getElementById(
      "publishedCommentContainer"
    );

    // Loader div
    const loaderAbsolute = document.createElement("div");
    const loaderArea = document.createElement("div");
    const loader = document.createElement("div");
    loaderAbsolute.className = "loaderAbsolute";
    loaderArea.className = "loaderArea";
    loader.className = "loader";

    loaderArea.appendChild(loader);
    loaderAbsolute.appendChild(loaderArea);

    // Validate input values
    // Name
    postComment.appendChild(loaderAbsolute);
    loader.style.display = "block";
    setTimeout(() => {
      loader.style.display = "none";
      loaderAbsolute.style.display = "none";
      if (checkLength(name.value, 2) === true) {
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
      // Message
      if (checkLength(comment.value, 4) === true) {
        formFillMessage.classList.remove("formFill-error");
        messageError.classList.add("formError");
        validMessageIcon.setAttribute("data-visible", true);
      } else {
        formFillMessage.classList.add("formFill-error");
        messageError.classList.remove("formError");
        validMessageIcon.setAttribute("data-visible", false);
      }
    }, 1000);

    const nameValue = name.value;
    const emailValue = email.value;
    const commentValue = comment.value;

    // Prepare comment data
    const commentData = {
      author_name: nameValue,
      author_email: emailValue,
      content: commentValue,
      post: postId,
    };
    if (
      checkLength(nameValue, 2) &&
      checkLength(commentValue, 4) &&
      validateEmail(emailValue)
    ) {
      try {
        // Send comment data to WordPress REST API
        const response = await fetch(
          "https://kineon.no/wp-json/wp/v2/comments",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(commentData),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to post comment");
        }
        console.log("Comment posted successfully:", commentData);
        updateComments();
        publishedCommentContainer.classList.remove("hidden_element");
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    } else {
      throw new Error("Failed to post comment");
    }
  }
  document
    .getElementById("commentForm")
    .addEventListener("submit", handleSubmit);

  renderComments(comments);
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