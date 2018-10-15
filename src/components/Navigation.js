import React from 'react';


const Navigation = ({onRouteChange, imageUrl}) => {
return (
	<nav className='navigation'>
	<img src='https://static.thenounproject.com/png/35201-200.png' className='brain' alt='logo'/>
	<p 
	onClick={() => onRouteChange('SignIn')}
	className='link dim black pa3 pointer'>Sign Out</p>
	</nav>
	);
}

export default Navigation;