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
		Login: Login,
		Signup: Signup,
		MainMenu: MainMenu,
		Join: Join,
		Options: Options
	},
	{
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false
		}
	}
);
