import React from 'react';

const Input = (props) => {
	return ( 
		<input 
			type={props.type}
			className={props.className}
			name={props.name}
			placeholder={props.placeholder}
			onChange={props.inputOnChange}
			onClick={props.onClick}
			value={props.value}
			required
			readOnly={props.readOnly}
		/>
	);
}
 
export default Input;