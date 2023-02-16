import React from 'react';

const Button = (props) => {
	return ( 
		<button className={props.className} onClick={props.btnOnClick}>
			{props.children}
		</button>
	);
}
 
export default Button;