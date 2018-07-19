import React from 'react';
import config from '../../config';
import { AsyncStorage, Alert } from 'react-native';
import Navigation from '../navigation/Navigation';

// INITIAL STATE
const initialState = {
	testValue: 'THIS IS THE TEST VALUE FROM CONTEXT',
	user: null,
	gameFound: null,
	catsFromBackend: [],
	game: null
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

	getCategories = async () => {
		console.log('getting categories');
		try {
			let response = await fetch(`${config.ROOT_URL}/categories`, {
				method: 'GET',
				headers: HEADERS
			});
			let responseJson = await response.json();
			console.log('categories gotten:', responseJson.length);
			this.setState({
				catsFromBackend: responseJson
			});
			return responseJson;
		} catch (error) {
			console.error(error);
		}
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
			// console.log('game started!', responseJson);
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

	startGame = async data => {
		// console.log('Start game data', data);
		try {
			let response = await fetch(`${config.ROOT_URL}/games`, {
				method: 'POST',
				headers: HEADERS,
				body: JSON.stringify({
					categories: data.categories,
					organizer: data.players[0].username,
					players: data.players,
					gameType: {
						title: data.type.title,
						limit: data.type.title === 'time'
							? data.type.timeLimit
							: data.type.title === 'points' ? data.type.pointLimit : '0'
					}
				})
			});
			let responseJson = await response.json();
			// console.log('game started', responseJson);
			this.setState({
				game: responseJson,
				user: data.players[0]
			});
			return responseJson;
		} catch (error) {
			console.error(error);
		}
	};

	updateGame = game => {
		this.setState({
			game: game
		});
	};

	render() {
		return (
			<AppContext.Provider
				value={{
					testValue: this.state.testValue,
					user: this.state.user,
					signup: this.signup,
					login: this.login,
					retrieveUserData: this.retrieveUserData,
					logout: this.logout,
					getCategories: this.getCategories,
					catsFromBackend: this.state.catsFromBackend,
					startGame: this.startGame,
					game: this.state.game,
					updateGame: this.updateGame
				}}
			>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}
