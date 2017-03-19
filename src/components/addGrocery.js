import React from 'react';
import ReactDom from 'react-dom';

export default function AddGrocery() {
	return (
		<section>
			<form onSubmit={this.addItem} className="addGrocery">
				<input type="text" name="item" onChange={this.handleChange}/>
				<button className="addGrocery">Add Item</button>
			</form>
			<div className="recipeList">
				<h3>Sample Grocery List</h3>
				<ul className="items">
					{this.state.items.map((item) => {
						return <NewList data={item} remove={this.removeItem} key={this.key}/>
					})}
				</ul>
			</div>
		</section>
	)		
}