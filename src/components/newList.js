import React from 'react';
import ReactDom from 'react-dom';

export default function GroceryItem(props) {
	return (
		<div className="listItems clearfix">
			<p className="grocery-item"><input type="checkbox" id="cbox1" value="first_checkbox" 
			onChange={(e) => props.onChange(e,props.data.key,props.data.item)} checked={props.data.checked}/> <span>{props.data.item}</span>
				<span className="close-btn">
					<i className="fa fa-times" onClick={() => props.removeList(props.data.key)}></i>
				</span>
			</p>
		</div>
	)		
}

