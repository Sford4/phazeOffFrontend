import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import { AppConsumer } from '../../context/context';
import Navigation from '../../navigation/Navigation';

// COMPONENT IMPORTS
import SelectCategories from './SelectCategories';
import GameType from './GameType';
import ChooseUserName from './ChooseUsername';
import AwesomeAlert from 'react-native-awesome-alerts';

class StartGamePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 'categories',
			categories: [],
			catsFromBackend: [],
			type: {
				timeLimit: '5',
				pointLimit: '5',
				selected: 'time'
			},
			avatar: '0',
			username: null
		};
		this.SelectCategories = (
			<SelectCategories
				catsFromBackend={this.props.catsFromBackend}
				goToPage={this.goToPage}
				saveCategories={this.saveCategories}
				data={this.state.categories}
			/>
		);
	}

	componentWillMount() {
		// GET CATEGORIES
		this.props.getCategories();
	}

	componentWillUpdate(NextProps, NextState) {
		if (NextProps.categories && !NextState.categories.length) {
			this.setState({
				catsFromBackend: NextProps.catsFromBackend
			});
		}
		this.SelectCategories = (
			<SelectCategories
				catsFromBackend={NextProps.catsFromBackend}
				goToPage={this.goToPage}
				saveCategories={this.saveCategories}
				data={NextState.categories}
			/>
		);
		if (NextProps.game) {
			// console.log("game we're going to", NextProps.game);
			Navigation.navigate('Game');
		}
	}

	saveGameType = type => {
		this.setState({
			type: type
		});
	};

	saveCategories = categories => {
		this.setState({
			categories: categories
		});
	};

	saveAvatar = img => {
		// console.log('img at save avatar', img);
		this.setState({
			avatar: img.toString()
		});
	};

	saveUsername = username => {
		this.setState({
			username: username
		});
	};

	goToPage = page => {
		this.setState({
			page: page
		});
	};

	startGame = (img, username) => {
		if (!username) {
			Alert.alert('Please enter your name!');
			return;
		} else if (!this.state.categories.length) {
			Alert.alert('You must choose at least one category!');
			return;
		}
		console.log('STARTING GAME!', img);
		this.props.startGame({
			categories: this.state.categories,
			type: {
				timeLimit: this.state.type.timeLimit,
				pointLimit: this.state.type.pointLimit,
				title: this.state.type.selected
			},
			players: [
				{
					avatar: img ? img.toString() : this.state.avatar,
					username: username,
					cardsWon: [],
					cardsInPlay: []
				}
			]
		});
	};

	render() {
		return (
			<View style={styles.container}>
				{this.state.page === 'categories'
					? this.SelectCategories
					: this.state.page === 'type'
							? <GameType
									goToPage={this.goToPage}
									saveGameType={this.saveGameType}
									data={this.state.type}
								/>
							: <ChooseUserName
									goToPage={this.goToPage}
									saveAvatar={this.saveAvatar}
									saveUsername={this.saveUsername}
									username={this.state.username}
									avatar={this.state.avatar}
									startGame={this.startGame}
								/>}

			</View>
		);
	}
}

export default props => (
	<AppConsumer>
		{props => <StartGamePage {...props} />}
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
