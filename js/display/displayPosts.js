
import { fetchApi, totalPosts } from "../api/fetchApi.js";
import { clearHTML } from "../render/clearHTML.js";
import { loaderArea } from "../render/loader.js";

const baseUrl = "https://www.kineon.no/wp-json/wp/v2/posts";

/* <div class="card">
                <img class="cardImg" src="/images/11666268_10153126519877327_7564176324476347378_n.jpg"
                    alt="Kvittjønnan">
                <div class="cardTextContainer">
                    <h2 class="cardHeading">
                        Kvittjønnan
                    </h2>
                    <div class="cardPContainer">
                        <p class="cardText">
                            Lorem ipsum dolorLoremLorem ipsum dolorLorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Proin efficitur erat in nibh molestie, sit amet luctus lectus lacinia. Donec ipsum
                            elit, viverra laoreet eros non, pulvinar sodales purus. Aliquam ornare ante sed porta
                            viverra.
                        </p>
                    </div>
                    <a class="readMoreButton" href="/">Read more</a>
                </div>
            </div> */


let loadedPostsLength;

export async function displayPosts(posts) {
    //console.log(posts)

    const postsContainer = document.querySelector(".postsContainer");
    clearHTML(postsContainer);
    posts.forEach(post => {

        const parser = new DOMParser();
        const doc = parser.parseFromString(post.content.rendered, `text/html`);

        //finds the img url inside the "doc" content.rendered then attributes.src.nodeValue
        const images = doc.querySelectorAll('img');
        const image = images[0].attributes.src.nodeValue;
        const cardImg = document.createElement(`img`);

        const paragraphs = doc.querySelectorAll(`p`);
        //console.log(paragraphs[0].innerHTML);
        const paragraph = paragraphs[0].innerHTML;
        //console.log(paragraph)
        
        /*Create card div*/
        const cardDiv = document.createElement(`div`);
        cardDiv.className = "card";


        const cardImgLink = document.createElement(`a`);
        cardImgLink.href = "/";
        cardImgLink.className = "";

        // if there is a img it will load otherwise give a message that it dosnt exist
        if (images) {
            cardImg.className = "cardImg";
            cardImg.src = image;
            cardDiv.append(cardImg);
        } else {
            const noImage = document.createElement('p');
            noImage.innerText = 'No image available';
            noImage.className = "cardImg";
            cardDiv.append(noImage);
        }

        const cardTextContainer = document.createElement(`div`);
        cardTextContainer.className = "cardTextContainer";
        
        const cardPContainer = document.createElement(`div`);
        cardPContainer.className = "cardPContainer";
        
        const cardText = document.createElement(`p`);
        if (paragraphs) {
            cardText.className = "cardText";
            cardText.innerHTML = paragraph;
            cardPContainer.appendChild(cardText);
        }
        else {
            const noText = document.createElement(`p`);
            noText.innerText = `No text available`;
            noText.className = "cardText";
            cardPContainer.appendChild(cardText)
        }
        

        const cardTitle = document.createElement(`h2`);
        cardTitle.innerText = post.title.rendered;

        const cardTitleLink = document.createElement(`a`);
        cardTitleLink.href = `/html/blog_post.html?id=${post.id}`;
        cardTitleLink.className = "cardLink";
        cardTitleLink.appendChild(cardTitle)

        cardTextContainer.appendChild(cardTitleLink);
        cardTextContainer.appendChild(cardPContainer);


        cardDiv.appendChild(cardImg);
        cardDiv.appendChild(cardTextContainer);
        postsContainer.appendChild(cardDiv);
        
    });
    loadedPostsLength = posts.length;
    //console.log(loadedPostsLength);

    const visibleBlogPosts = document.querySelector(`.visibleBlogPosts`);
    visibleBlogPosts.innerText = `Visible blog posts: `+ loadedPostsLength + `/` + totalPosts;
    
    showMorePosts();    
    showLessPosts();  
}

export async function showMorePosts(){
    const morePostsContainer = document.querySelector(`.morePostsContainer`);
    clearHTML(morePostsContainer);

    const morePostDiv = document.createElement(`div`);
    const morePostsButton = document.createElement(`button`);
    morePostsButton.innerText = "Load more posts";
    morePostsButton.className = "morePostsButton";

    morePostDiv.appendChild(morePostsButton);
    morePostsContainer.appendChild(morePostDiv);
    if (loadedPostsLength >= totalPosts) {
        morePostsButton.style.display = `none`;
    }

    morePostsButton.onclick = async function() {
        morePostsContainer.appendChild(loaderArea);
        loaderArea.style.display = "block";
        
        if (loadedPostsLength < totalPosts) {
            loadedPostsLength += 5;
            lessPostsButton.style.display = `block`;
        }

    const newUrl = baseUrl + `?per_page=${loadedPostsLength}`;
    fetchApi(newUrl);
}
}

let lessPostsButton;
export async function showLessPosts(){
    const lessPostsContainer = document.querySelector(`.lessPostsContainer`);
    const morePostsContainer = document.querySelector(`.morePostsContainer`);
    clearHTML(lessPostsContainer);

    const lessPostDiv = document.createElement(`div`);
    lessPostsButton = document.createElement(`button`);
    lessPostsButton.innerText = "Load less posts";
    lessPostsButton.style.display = `none`;
    lessPostsButton.className = "lessPostsButton";

    lessPostDiv.appendChild(lessPostsButton);
    lessPostsContainer.appendChild(lessPostDiv);
    if (loadedPostsLength > 10) {
        lessPostsButton.style.display = `block`;
    }


    lessPostsButton.onclick = async function(event) {
        morePostsContainer.appendChild(loaderArea);
        loaderArea.style.display = "block";
        if (loadedPostsLength === 10) {
            lessPostsButton.style.display = `none`;
        }
        if (loadedPostsLength > 10) {
            loadedPostsLength -= 5;
            lessPostsButton.style.display = `flex`;
        }

    const newUrl = baseUrl + `?per_page=${loadedPostsLength}`;
    fetchApi(newUrl);
}
}  
