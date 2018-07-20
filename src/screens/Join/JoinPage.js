import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TextInput, Alert } from 'react-native';
import { AppConsumer } from '../../context/context';
import Navigation from '../../navigation/Navigation';
import masterStyles from '../../styles/masterStyles';

// COMPONENT IMPORTS
import Header from '../../screens/components/header';
import Join from './Join';
import JoinUsername from './JoinUsername';
import AwesomeAlert from 'react-native-awesome-alerts';

class JoinPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			screen: 'search',
			game: this.props.game
		};
		this.display = (
			<Join
				goToChooseUsername={this.goToChooseUsername}
				findGameById={this.props.findGameById}
				findGameByAddCode={this.props.findGameByAddCode}
				clearGameSearch={this.props.clearGameSearch}
				gameFound={this.props.gameFound}
				game={this.props.game}
			/>
		);
	}

	componentWillUpdate(NextProps, NextState) {
		if (NextState.screen === 'search') {
			this.display = (
				<Join
					goToChooseUsername={this.goToChooseUsername}
					findGameById={NextProps.findGameById}
					findGameByAddCode={NextProps.findGameByAddCode}
					clearGameSearch={NextProps.clearGameSearch}
					gameFound={NextProps.gameFound}
					game={NextProps.game}
				/>
			);
		}
	}

	goToChooseUsername = () => {
		console.log('gotoChooseUsername triggered');
		this.display = <JoinUsername goToGame={this.goToGame} />;
		this.setState({
			screen: 'username'
		});
	};

	goToGame = user => {
		if (!user.username) {
			Alert.alert('Please enter a name!');
			return;
		}
		for (let i = 0; i < this.props.game.players.length; i++) {
			if (this.props.game.players[i].username === user.username) {
				Alert.alert('That name is already being used in this game!');
				return;
			}
		}
		let avatar = user.img;
		user.avatar = avatar;
		console.log('avatar at goToGame joinpage 62', user.img);
		this.props.setUser(user);
		Navigation.navigate('Game');
	};
	// r1xS6
	render() {
		return (
			<View style={styles.container}>
				<Header title="Join a Game!" />
				{this.display}
			</View>
		);
	}
}

export default props => (
	<AppConsumer>
		{props => <JoinPage {...props} />}
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
