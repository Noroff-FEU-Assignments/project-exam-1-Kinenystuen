
import { fetchApi } from "../api/fetchApi.js";
import { clearHTML } from "./clearHTML.js";

{/* <div class="card">
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
            </div> */}

export async function renderPosts(posts) {
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
        cardTitleLink.className = "";
        cardTitleLink.appendChild(cardTitle)

        cardTextContainer.appendChild(cardTitleLink);
        cardTextContainer.appendChild(cardPContainer);


        cardDiv.appendChild(cardImg);
        cardDiv.appendChild(cardTextContainer);
        postsContainer.appendChild(cardDiv);
        
    }
    );
}
