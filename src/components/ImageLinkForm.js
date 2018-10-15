import React from 'react';


const ImageLinkForm = ({ onInputChange, onImageSubmit }) => {
	return (
		<div >
		<p className='f4'>{'this magic brain will detect faces in your pictures'}</p>
		<div className='form pa2 br6 shaddow-4 grow'> 
			<input type='text' className='f6 pa2 w-70 center br1 b--light-pink bw0' placeholder='link'onChange={onInputChange}/>
			<button className='w-30 dim b--light-pink f6 link ph3 pv2 dib white bg-light-purple br1 bw0' onClick={onImageSubmit}>Detect</button>
		</div>
		</div>

	);
}


export default  ImageLinkForm;