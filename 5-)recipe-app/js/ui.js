import { createIngredient, getFromLocalStorage, isRecipeLiked } from "./helpers.js"


const uiElement = {
    form : document.querySelector("form"),
    resultList: document.querySelector(".results"),
    recipeArea: document.querySelector(".recipe"),
    basketList: document.querySelector(".basket ul"),
    clearBtn: document.querySelector("#clear"),
    likeList: document.querySelector(".likes-list"),
}
console.log(uiElement.resultList)

const renderResults = (recipes) => {
    uiElement.resultList.innerHTML = ""

    recipes.slice(0, 12).forEach((recipe) => {
        const markup = `
          <a class="result-link" href="#${recipe.recipe_id}">
            <img
              width="52px"
              src="${recipe.image_url}"
              alt=""
            />

            <div class="data">
              <h4>${recipe.title}</h4>
              <p>${recipe.publisher}</p>
            </div>
          </a>
          
        
        
        `

        uiElement.resultList.insertAdjacentHTML("beforeend", markup)
    })
}

const renderRecipes = (recipe) => {
    console.log(recipe)

    const isLiked = isRecipeLiked(recipe.recipe_id);
const recipeMarkup = `
  <figure>
            <img
              src="${recipe.image_url}"
              alt=""
            />

            <h1>${recipe.title}</h1>

            <div class="like-area">
              <i id="like-btn" class="bi ${isLiked ? "bi-heart-fill" : "bi-heart"}"></i>
            </div>
          </figure>

             <div class="ingredients">
            <ul>
            ${createIngredient(recipe.ingredients.slice(0, 15))}
            </ul>
          </div>
          <button id="add-to-basket">
            <i class="bi bi-cart"></i>
            <span>Alışveriş Sepetine Ekle</span>
          </button>
          <div class="directions">
            <h2>Nasıl Pişirilir</h2>
            <p>
              Bu tarif dikkatlice <span>${recipe.publisher}</span> tarafından hazırlanmış ve test
              edilmiştir. Diğer detaylara onların websitesi üzerinden
              erişebilirsiniz.
            </p>
            <a href="${recipe.publisher}" target="_blank">Yönerge</a>
          </div>

`
uiElement.recipeArea.innerHTML = recipeMarkup

}

const renderBasketItem = (items) => {
     console.log(items)
   const markup = items
   .map(
        (item) => `
         <li data-id =${item.id}>
              <i class="bi bi-x"></i>
              <span>${item.title}</span>
            </li>
        `

       
   ).join("")

   uiElement.basketList.innerHTML = markup
}


const renderLikes= () => {
    const likes = getFromLocalStorage("likes") || [];

    const likeHtml= likes
    .map(
        (item) => `
         <a href="#">
              <img
                width="32px"
                src="${item.image_url}"
                alt=""
              />
              <p>${item.title}</p>
            </a>
        
        `
    )
    .join("")

    uiElement.likeList.innerHTML = likeHtml;
}
export{
    uiElement,
    renderResults,
    renderRecipes,
  renderBasketItem,
  renderLikes
}