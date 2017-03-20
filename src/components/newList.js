import React from 'react';
import ReactDom from 'react-dom';

export default function GroceryItem(props) {
	return (
		<div className="listItems clearfix">
			<p className="grocery-item"><input type="checkbox" id="cbox1" value="first_checkbox" onChange={() => props.onCheck(props.data.key)}/> <span>{props.data.item}</span>
				<span className="close-btn">
					<i className="fa fa-times" onClick={() => props.removeList(props.data.key)}></i>
				</span>
			</p>
		</div>
	)		
}

