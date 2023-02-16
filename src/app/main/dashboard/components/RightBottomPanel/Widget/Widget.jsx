import React from 'react'

const Widget = (props) => {
	return (
		<div className="dashboard__right-col">
			<img className='right-col__img' src={props.src} alt={props.title} />
			<div className="">
				<p className='dashboard__text'>{props.title}</p>
				<p className='data'>{props.children}</p>
			</div>
		</div>
	)
}

export default Widget
