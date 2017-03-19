import React from 'react';
import ReactDom from 'react-dom';

export default class Recipes extends React.Component {
	constructor() {
		super();
		this.state = {
			recipe: {
				title: "",
				image: "",
				ingredients: ""
			}
		}
		this.addRecipe = this.addRecipe.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	getRecipeSuggestions() {
		console.log("Recipe");  
        ajax({
            url: 'http://proxy.hackeryou.com',
		    dataType: 'json',
		    method:'GET',
		    data: {
		        reqUrl: 'http://food2fork.com/api/search',
		        method: 'GET',
		        params: {
		            key: apiKey,
		            q: dataBaseData,
		            count: 5
		        },
		        xmlToJSON: false
		    }
		})
        .then((data) => {
            this.setState({
            	recipe: recipes
            });  
        })   
	}
	getRecipeIngredients() {
		ajax, when({
		        url: 'http://proxy.hackeryou.com',
			    dataType: 'json',
			    method:'GET',
			    data: {
			        reqUrl: 'http://food2fork.com/api/get',
			        method: 'GET',
			        params: {
			            key: apiKey,
			            rId: item.recipe_id
			        },
				xmlToJSON: false
				}
			})
			.then(function(...ingredients) {
				ingredients = ingredients.map(function(recipe) {
					return recipe[0].recipe;
				});
				//displayRecipes(ingredients);
			});
		console.log(ingredients);	
	}
	render() {
	    return (
		    <div>	
		    	{/*<div className='GetRecipes'>
					<form onSubmit={this.addRecipe} className="addGrocery">
						<input type="text" name="item" onChange={this.handleChange}/>
						<button className="getRecipes" onClick={this.getRecipeSuggestions}>Get recipes</button>
					</form>
				</div>	*/}
				<div className='recipeSuggestions'>
		            <div className='recipeCard'>
		                <header>
		                    <h1>{this.state.recipe.title}</h1>
		                    <p>{this.state.recipe.link}</p>
		                    <p>{this.state.recipe.ingredients}</p>
		                </header>
		            </div>
		            <div className='recipeImage'>
		                <img src={`${this.state.recipe.image_path}`} />
		            </div>
		        </div>
		     </div>   
	    )
	}
	componentDidMount() {
		
	}		
}