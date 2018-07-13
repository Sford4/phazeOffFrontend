import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TextInput } from 'react-native';
import { AppConsumer } from '../../context/context';
// import Navigation from '../navigation/Navigation';
// import masterStyles from '../styles/masterStyles';

// COMPONENT IMPORTS
// import AwesomeAlert from 'react-native-awesome-alerts';
import PreGame from '../Game/PreGame';

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			players: []
		};
		Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE_LEFT);
	}

	componentWillUpdate(NextProps, NextState) {}

	render() {
		return (
			<View style={styles.container}>
				<PreGame />
			</View>
		);
	}
}

export default props => (
	<AppConsumer>
		{props => <Game {...props} />}
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
