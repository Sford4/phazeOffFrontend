import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { AppConsumer } from '../context/context';
import Navigation from '../navigation/Navigation';
import masterStyles from '../styles/masterStyles';

// COMPONENT IMPORTS

export default class Login extends React.Component {
	render() {
		return (
			<AppConsumer>
				{context => (
					<View style={styles.container}>
						<Image style={{ width: 150, height: 75 }} source={require('../../assets/PhazeOffLogo.png')} />
						<Text style={masterStyles.title}>Menu</Text>
						<TouchableHighlight
							style={masterStyles.button}
							onPress={() => Navigation.navigate('StartGame')}
						>
							<Text style={masterStyles.btnText}>Start Game</Text>
						</TouchableHighlight>
						<TouchableHighlight style={masterStyles.button} onPress={() => Navigation.navigate('Join')}>
							<Text style={masterStyles.btnText}>Join a Game</Text>
						</TouchableHighlight>
						<TouchableHighlight style={masterStyles.button} onPress={() => Navigation.navigate('NewBoard')}>
							<Text style={masterStyles.btnText}>Create a Board</Text>
						</TouchableHighlight>
						<TouchableHighlight style={masterStyles.button} onPress={() => Navigation.navigate('Options')}>
							<Text style={masterStyles.btnText}>More</Text>
						</TouchableHighlight>

					</View>
				)}
			</AppConsumer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-around'
	}
});
