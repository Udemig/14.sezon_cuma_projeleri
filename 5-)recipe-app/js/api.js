class API{
    constructor(){
        this.resaults = []
        this.recipe = {}
        this.ingredients = [];
        this.results = this.resaults
    }

    async getResults(query){
        const response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`)

        const data = await response.json()

        console.log(data)

        this.resaults = data.recipes
        this.results = this.resaults
    }

    async getRecipe(id){
        const response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)

        const data = await response.json()

        this.recipe = data.recipe;

        this.ingredients = data.recipe.ingredients;
    }
    
}
export default API
