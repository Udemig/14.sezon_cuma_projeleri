import API from "./api.js";
import { addLike, controlBtn, getFromLocalStorage, isRecipeLiked, removeLike, setToLocalStorage } from "./helpers.js";
import { uiElement,renderResults, renderRecipes,renderBasketItem, renderLikes } from "./ui.js";

const api = new API();

let basket = getFromLocalStorage("basket") || []


const handleSubmit = (e)=> {
    e.preventDefault();

    const query = e.target[0].value

    api.getResults(query).then(() =>{
        renderResults(api.resaults)
    })

}

const controlUrl = () => {
    console.log("controlUrl triggered", window.location.hash)
    const id = window.location.hash.replace("#", "")

    if(id){
        api.getRecipe(id).then(() => {
            renderRecipes(api.recipe)
        })
    }
}

const handleClick = (e) => {
    console.log(e.target.id)
    if(e.target.id === "add-to-basket"){
        api.ingredients.forEach((title)=>{
            const newItem = {
                id:uuid.v4(),
                title,
            }

            basket.push(newItem);

            setToLocalStorage("basket", basket);

            renderBasketItem(basket);

            controlBtn(basket);
        })

        Toastify({
  text: "Ürünler Sepete Eklendi",
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "right", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function(){} 
}).showToast();

    }
    else if(e.target.id === "like-btn"){
        const id = api.recipe.recipe_id;

        const isLiked = isRecipeLiked(id);

        if(isLiked){
            removeLike(id);
        }else{
            addLike(api.recipe);
        }

        renderRecipes(api.recipe);

        renderLikes();
    }


}


uiElement.form.addEventListener("submit", handleSubmit)

uiElement.recipeArea.addEventListener("click", handleClick)

window.addEventListener("load",controlUrl)
window.addEventListener("hashchange",controlUrl)


window.addEventListener("load",renderBasketItem(basket))
window.addEventListener("hashchange",renderBasketItem(basket))


window.addEventListener("load",controlBtn(basket))
window.addEventListener("hashchange",controlBtn(basket))
