import { uiElement } from "./ui.js";




const createIngredient = (ingredients) => {
  const ingredientHtml = ingredients 
    .map(
      (ingredient) => `
              <li>
                <i class="bi bi-check-circle"></i>
                <span> ${ingredient} </span>
              </li>
              `
    )
    .join("");

  return ingredientHtml;
};

const setToLocalStorage = (key, data) => {
 
  const strData = JSON.stringify(data);
  
  localStorage.setItem(key, strData);
};



const getFromLocalStorage = (key) => {
 
  const strData = localStorage.getItem(key);

  
  const data = JSON.parse(strData);

  
  return data;
};

const controlBtn = (basket) => {
    if(basket.length > 0){
        uiElement.clearBtn.style.display = "block"
    }else{
        uiElement.clearBtn.style.display = "none"
    }
}

const isRecipeLiked = (id) => {
    const likes = getFromLocalStorage("likes") || [];

    for(let i=0 ; i< likes.length ; i++){
        if(likes[i].id == id) return true;
    }

    return false;
}

const addLike = (recipe) =>{
    const likes= getFromLocalStorage("likes") || [];

    likes.push({
        id:recipe.recipe_id,
        title: recipe.title,
        image_url:recipe.image_url,
    })

    setToLocalStorage("likes", likes)
}

const removeLike = (id) => {
    const likes = getFromLocalStorage("likes") || [];
    const newLikes = [];

    for(let i = 0; i < likes.length; i++){
        if(likes[i].id !== id){
            newLikes.push(likes[i])
        }
    }
}



export {
    createIngredient,
    setToLocalStorage,
    getFromLocalStorage,
    controlBtn,
    isRecipeLiked,
    addLike,
    removeLike,
 
}



















