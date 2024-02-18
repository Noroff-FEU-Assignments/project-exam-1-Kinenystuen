/*
Comments sections
*/

export async function getComments(post) {
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
        const formattedDate = new Date(comment.date).toLocaleDateString(
          "en-US",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        );
        // Check if the comment has a parent
        if (comment.parent !== 0) {
          const parentCommentDiv = document.getElementById(
            "comment-" + comment.parent
          );

          if (parentCommentDiv) { // create reply area
            // Create a new comment div for the reply
            const replyDiv = document.createElement("div");
            replyDiv.className = "cmtBox_reply";
            replyDiv.id = "comment-" + comment.id;
            // Create a div area for name and date
            const replyInfoDiv = document.createElement("div");
            replyInfoDiv.className = "cmtBox-info";

            // Create elements for the reply content
            const replyAuthor = document.createElement("h4");
            replyAuthor.className = "cmtBox-info_h5";
            replyAuthor.innerHTML = comment.author_name + " replied ";
            // Create date element
            const replyInfoDate = document.createElement("p");
            replyInfoDate.className = "cmtBox-info_p";
            replyInfoDate.innerHTML = formattedDate;

            // Append elements to info div
            replyInfoDiv.appendChild(replyAuthor);
            replyInfoDiv.appendChild(replyInfoDate);

            const replyText = document.createElement("p");
            replyText.className = "cmtBox-info_p-reply";
            replyText.innerHTML = comment.content.rendered;

            // Append elements to the reply div
            replyDiv.appendChild(replyInfoDiv);
            replyDiv.appendChild(replyText);

            // Append the reply div to the parent comment div
            parentCommentDiv.appendChild(replyDiv);
          }
        } else {
          // Create new comment area
          // Create elements for the comment content
          const commentDiv = document.createElement("div");
          commentDiv.className = "cmtBox";
          commentDiv.id = "comment-" + comment.id;

          // Create a div area for name and date
          const infoDiv = document.createElement("div");
          infoDiv.className = "cmtBox-info";

          const commentAuthor = document.createElement("h4");
          commentAuthor.className = "cmtBox-info_h4";
          commentAuthor.innerHTML = comment.author_name;

          // Create date element
          const commentDate = document.createElement("p");
          commentDate.className = "cmtBox-info_p";
          commentDate.innerHTML = formattedDate;

          // Append elements to info div
          infoDiv.appendChild(commentAuthor);
          infoDiv.appendChild(commentDate);

          const commentText = document.createElement("p");
          commentText.className = "cmtBox-info_p";
          commentText.innerHTML = comment.content.rendered;

          // Append elements to the comment div
          commentDiv.appendChild(infoDiv);
          commentDiv.appendChild(commentText);

          containerComments.appendChild(commentDiv);
        }
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

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
    if (comment === "null") {
      comment.value = 0;
    }

    // If form is valid display success
    const sectionContact = document.querySelector(".sectionContact");
    const submitButton = document.querySelector(".sendButton");
    const publishedCommentContainer = document.getElementById(
      "publishedCommentContainer"
    );
    const newComment = document.getElementById("newComment");

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
      name.value = ""; 
      email.value = ""; 
      comment.value = "";

      // Reset error messages and icons
      formFillName.classList.add("hidden_element");
      nameError.classList.add("hidden_element");
      validNameIcon.setAttribute("data-visible", false);
      formFillEmail.classList.add("hidden_element");
      emailError.classList.add("hidden_element");
      validEmailIcon.setAttribute("hidden_element", false);
      formFillMessage.classList.add("hidden_element");
      messageError.classList.add("hidden_element");
      validMessageIcon.setAttribute("data-visible", false);
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
        } else {
          console.log("Comment posted successfully:", commentData);
          commentForm.innerHTML = ``;
          publishedCommentContainer.classList.remove("hidden_element");
        }
        updateComments();
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
if (document.getElementById("newComment")) {
  functionNewComment();
}

async function functionNewComment() {
  const newComment = document.getElementById("newComment");

  newComment.addEventListener("click", function () {
    const formFillName = document.querySelector(".formFill-name");
    const nameError = document.getElementById("name-error");
    const validNameIcon = document.querySelector(".validIcon-name");
    const formFillEmail = document.querySelector(".formFill-email");
    const emailError = document.getElementById("email-error");
    const validEmailIcon = document.querySelector(".validIcon-email");
    const formFillMessage = document.querySelector(".formFill-message");
    const messageError = document.getElementById("message-error");
    const validMessageIcon = document.querySelector(".validIcon-message");
    const sectionContact = document.querySelector(".sectionContact");
    const submitButton = document.querySelector(".sendButton");

    submitButton.innerHTML = "Post comment";
    newComment.style.display = "none";

    formFillName.classList.remove("hidden_element");
    nameError.classList.remove("hidden_element");
    validNameIcon.setAttribute("data-visible", false);
    formFillEmail.classList.remove("hidden_element");
    emailError.classList.remove("hidden_element");
    validEmailIcon.setAttribute("data-visible", false);
    formFillMessage.classList.remove("hidden_element");
    messageError.classList.remove("hidden_element");
    validMessageIcon.setAttribute("data-visible", false);
  });
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
