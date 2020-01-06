import React from 'react';
import LoadingScreen from 'react-loading-screen';
import PropTypes from 'prop-types';

const Loading = props => {
	return (
		<LoadingScreen
		loading
			bgColor="#f1f1f1"
			spinnerColor="#9ee5f8"
			textColor="#676767"
			text={props.text}
		/>
	);
};

Loading.propTypes={
	text:PropTypes.string
}

export default Loading;
