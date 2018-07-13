import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TextInput } from 'react-native';
import { AppConsumer } from '../../context/context';
// import Navigation from '../navigation/Navigation';
// import masterStyles from '../styles/masterStyles';

// COMPONENT IMPORTS
import Header from '../../screens/components/header';
// import AwesomeAlert from 'react-native-awesome-alerts';

class PreGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			players: []
		};
	}

	onCancel = () => {
		this.setState({
			showPopup: false
		});
		this.props.clearGameSearch();
	};

	componentWillUpdate(NextProps, NextState) {}

	render() {
		return (
			<View style={styles.container}>
				<Header title="Pregame" />
				<View style={styles.smallContainer}>
					<Text>THIS IS THE PREGAME SCREEN</Text>
				</View>

			</View>
		);
	}
}

export default props => (
	<AppConsumer>
		{props => <PreGame {...props} />}
	</AppConsumer>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	smallContainer: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginTop: 30,
		height: 150
	},
	bigBtn: {
		width: '70%',
		aspectRatio: 1,
		borderRadius: 500,
		backgroundColor: '#00AC9F',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		shadowRadius: 3,
		shadowColor: 'gray',
		shadowOpacity: 0.5
	},
	bigBtnText: {
		color: 'white',
		fontSize: 80
	}
});
