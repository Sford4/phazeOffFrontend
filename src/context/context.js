import React from 'react';
import config from '../../config';
import { AsyncStorage, Alert } from 'react-native';
import Navigation from '../navigation/Navigation';

// INITIAL STATE
const initialState = {
	testValue: 'THIS IS THE TEST VALUE FROM CONTEXT',
	user: null,
	boardsRetrieved: null,
	gameFound: null
};

const HEADERS = {
	Accept: 'application/json',
	'Content-Type': 'application/json'
};

export const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;

export class AppProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	storeUser = async user => {
		console.log('user to be saved', user);
		try {
			await AsyncStorage.setItem('user', user);
		} catch (error) {
			console.log('error storing user', error);
		}
	};

	signup = async obj => {
		try {
			let response = await fetch(`${config.ROOT_URL}/users`, {
				method: 'POST',
				headers: HEADERS,
				body: JSON.stringify({
					email: obj.email.toLowerCase(),
					password: obj.password
				})
			});
			let responseJson = await response.json();
			this.setState({
				user: responseJson
			});
			this.storeUser(responseJson);
			return responseJson;
		} catch (error) {
			console.error(error);
		}
	};

	login = async obj => {
		try {
			let response = await fetch(`${config.ROOT_URL}/users/login`, {
				method: 'POST',
				headers: HEADERS,
				body: JSON.stringify({
					email: obj.email.toLowerCase(),
					password: obj.password
				})
			});
			let responseJson = await response.json();
			console.log('user give from login', responseJson);
			this.setState({
				user: responseJson
			});
			this.storeUser(responseJson);
			return responseJson;
		} catch (error) {
			console.error(error);
		}
	};

	retrieveUserData = async () => {
		console.log('retrieving user');
		try {
			const value = await AsyncStorage.getItem('user');
			console.log('retieved user value', value);
			if (value !== null) {
				this.setState({
					user: value
				});
				Navigation.navigate('MainMenu');
				console.log('GOING HOME!!!');
			} else {
				this.setState({
					user: 'none'
				});
			}
		} catch (error) {
			console.log('There was no user to find');
		}
	};

	logout = async () => {
		try {
			await AsyncStorage.removeItem('user');
		} catch (error) {
			// Error saving data
		}
		this.setState({
			user: null
		});
	};

	findGameByAddCode = async addCode => {
		try {
			let response = await fetch(`${config.ROOT_URL}/games/search`, {
				method: 'POST',
				headers: HEADERS,
				body: JSON.stringify({
					addCode: addCode
				})
			});
			let responseJson = await response.json();
			console.log('game found!', responseJson);
			this.setState({
				gameFound: responseJson
			});
			return responseJson;
		} catch (error) {
			console.error(error);
		}
	};

	findGameById = async id => {
		console.log('looking for board', id);
		try {
			let response = await fetch(`${config.ROOT_URL}/games/${id}`, {
				method: 'GET',
				headers: HEADERS
			});
			let responseJson = await response.json();
			console.log('game started!', responseJson);
			this.setState({
				board: responseJson
			});
			return responseJson;
		} catch (error) {
			console.error(error);
		}
	};

	clearGameSearch = () => {
		this.setState({
			gameFound: null
		});
	};

	startGame = async (categories, userId) => {
		try {
			let response = await fetch(`${config.ROOT_URL}/games`, {
				method: 'POST',
				headers: HEADERS,
				body: JSON.stringify({
					categories: categories,
					organizer: userId,
					players: [userId]
				})
			});
			let responseJson = await response.json();
			console.log('game started', responseJson);
			return responseJson;
		} catch (error) {
			console.error(error);
		}
	};

	

	render() {
		return (
			<AppContext.Provider
				value={{
                    testValue: this.state.testValue,
                    user: this.state.user
					signup: this.signup,
					login: this.login,
					retrieveUserData: this.retrieveUserData,
					logout: this.logout,
					
					// startGame: this.startGame,
					// findGameByAddCode: this.findGameByAddCode,
					// findGameById: this.findGameById,
					// gameFound: this.state.gameFound,
					// clearGameSearch: this.clearGameSearch,
					
				}}
			>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}
