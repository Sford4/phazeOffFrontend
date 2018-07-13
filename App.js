import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

// COMPONENT IMPORTS
import { AppProvider } from './src/context/context';
import Navigation from './src/navigation/Navigation';
import Signup from './src/screens/Signup';
import Login from './src/screens/Login';
import MainMenu from './src/screens/MainMenu';
import Join from './src/screens/Join';
import Options from './src/screens/Options';
import StartGame from './src/screens/StartGame/StartGamePage';
import Game from './src/screens/Game/Game';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<AppProvider>
				<AppStackNavigator
					ref={navigatorRef => {
						Navigation.setTopLevelNavigator(navigatorRef);
					}}
				/>
			</AppProvider>
		);
	}
}

const AppStackNavigator = createStackNavigator(
	{
		MainMenu: MainMenu,
		Login: Login,
		Signup: Signup,

		Join: Join,
		Options: Options,
		StartGame: StartGame,
		Game: Game
	},
	{
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false
		}
	}
);
