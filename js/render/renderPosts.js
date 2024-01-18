
import { fetchApi } from "../api/fetchApi.js";

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
    console.log(posts)
    

    const postsContainer = document.querySelector(".postsContainer");
    postsContainer.innerHTML = "";
    posts.forEach(post => {

        const parser = new DOMParser();
        const doc = parser.parseFromString(post.content.rendered, `text/html`);

        const images = doc.querySelectorAll('img');
        console.log(images)

        const paragraphs = doc.querySelectorAll(`p`);
        //console.log(paragraph)
        

        // Log each paragraph text
        paragraphs.forEach(paragraph => {
        console.log(paragraph.innerText);
        });
    
        const parInnerText = paragraphs.innerText;
        console.log(parInnerText);



        /*Create card div*/
        const cardDiv = document.createElement(`div`);
        cardDiv.className = "card";

        if (post._embedded['wp:featuredmedia']) {
            const image = document.createElement('img');
            image.src = post._embedded['wp:featuredmedia'][0].source_url;
            image.alt = post._embedded['wp:featuredmedia'][0].alt_text;
            postsContainer.append(image);
        } else {
            const noImage = document.createElement('p');
            noImage.innerText = 'No image available';
            postsContainer.append(noImage);
        }
        const imageUrl = post.source_url;
        const cardImg = document.createElement(`img`);
        cardImg.className = "cardImg";
        cardImg.src = imageUrl;
        

        const cardTextContainer = document.createElement(`div`);
        cardTextContainer.className = "cardTextContainer";
        
        const cardPContainer = document.createElement(`div`);
        cardPContainer.className = "cardPContainer";
        
        const cardText = document.createElement(`p`);
        cardText.className = "cardText";
        cardText.innerText = post.content.rendered;
        cardPContainer.appendChild(cardText);

        const cardTitle = document.createElement(`h2`);
        cardTitle.innerText = post.title.rendered;

        cardTextContainer.appendChild(cardTitle);
        cardTextContainer.appendChild(cardPContainer);


        cardDiv.appendChild(cardImg);
        cardDiv.appendChild(cardTextContainer);
        postsContainer.appendChild(cardDiv);
        
    }
    );
}
