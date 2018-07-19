import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { AppConsumer } from '../context/context';
import Navigation from '../navigation/Navigation';
import masterStyles from '../styles/masterStyles';

// COMPONENT IMPORTS

class Options extends React.Component {
	logout = () => {
		this.props.logout();
		Navigation.navigate('Login');
	};
	goHome = () => {
		console.log('GOING HOME!!!');
		Navigation.navigate('MainMenu');
	};

	render() {
		return (
			<View style={styles.container}>
				<TouchableHighlight onPress={() => this.goHome()}>
					<Image style={{ width: 180, height: 130 }} source={require('../../assets/PhazeOffLogo.png')} />
				</TouchableHighlight>
				<Text style={masterStyles.bigTitle}>Options</Text>
				<TouchableHighlight style={masterStyles.button} onPress={() => this.goHome()}>
					<Text style={masterStyles.btnText}>Make Infinite Boards</Text>
				</TouchableHighlight>
				<TouchableHighlight style={masterStyles.button} onPress={() => this.logout()}>
					<Text style={masterStyles.btnText}>Logout</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

export default props => (
	<AppConsumer>
		{props => <Options {...props} />}
	</AppConsumer>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-around'
	}
});
