import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TextInput } from 'react-native';
import { AppConsumer } from '../../context/context';
// import Navigation from '../navigation/Navigation';
import masterStyles from '../../styles/masterStyles';

// COMPONENT IMPORTS
// import AwesomeAlert from 'react-native-awesome-alerts';

class Judging extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillUpdate(NextProps, NextState) {}

	render() {
		return (
			<View style={styles.container}>
				<View>
					<Text>THIS IS JUDGING</Text>
				</View>

			</View>
		);
	}
}

export default props => (
	<AppConsumer>
		{props => <Judging {...props} />}
	</AppConsumer>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
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
	drawCardBtn: {
		width: 50,
		aspectRatio: 1,
		borderRadius: 50,
		backgroundColor: '#00AC9F',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		shadowRadius: 3,
		shadowColor: 'gray',
		shadowOpacity: 0.5
	},
	drawCardBtnText: {
		color: 'white',
		fontSize: 30
	}
});
