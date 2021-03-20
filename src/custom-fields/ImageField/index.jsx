import React from 'react';
import ImageIcon from '@material-ui/icons/Image';

function ImageField(props) {
	const { field } = props;

	const { name } = field;

	const imageREF = useRef(null);

	return (
		<div>
			<label style={{ cursor: 'pointer' }} htmlFor={name}>
				<ImageIcon color='primary' fontSize='large' />
			</label>
			<input
				ref={imageREF}
				id={name}
				style={{ display: 'none' }}
				type='file'
				onChange={handleImageUpload}
			/>
		</div>
	);
}

export default ImageField;
