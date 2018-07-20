import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TextInput } from 'react-native';
import { AppConsumer } from '../../context/context';
// import Navigation from '../navigation/Navigation';
import masterStyles from '../../styles/masterStyles';
import SocketIOClient from 'socket.io-client';

// COMPONENT IMPORTS
// import AwesomeAlert from 'react-native-awesome-alerts';
import PreGame from '../Game/PreGame';
import GamePlay from '../Game/GamePlay';
import Judging from '../Game/Judging';

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			screen: 'pregame'
		};
		// TURN SCREEN LANDSCAPE
		Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE_LEFT);
		// INITIAL DISPLAY
		this.display = (
			<PreGame
				game={this.props.game}
				user={this.props.user}
				startGameFunc={this.startGame}
				avatars={this.props.avatars}
			/>
		);
		// WEB SOCKET THINGS
		this.socket = SocketIOClient('http://localhost:4000');
		this.socket.emit('join', this.props.game.addCode, this.props.user, this.props.game._id);
		this.socket.on('playerJoined', game => {
			console.log('player joined triggered', game.players);
			this.props.updateGame(game);
			if (this.state.screen === 'pregame') {
				this.display = (
					<PreGame
						game={game}
						user={this.props.user}
						startGameFunc={this.startGame}
						avatars={this.props.avatars}
					/>
				);
				this.setState({
					screen: 'pregame'
				});
			}
		});
		this.socket.on('cardDrawn', game => {
			console.log('cardDrawn triggered', game);
			this.display = (
				<GamePlay
					drawCard={this.drawCard}
					user={this.props.user}
					game={game}
					screenColor="white"
					drawBtn={true}
				/>
			);
			this.props.updateGame(game);
			this.setState({
				screen: 'play'
			});
		});
		this.socket.on('updateGame', game => {
			this.props.updateGame(game);
		});
		this.socket.on('startGame', game => {
			console.log('start game triggered');
			this.display = (
				<GamePlay
					drawCard={this.drawCard}
					user={this.props.user}
					game={this.props.game}
					screenColor="white"
					drawBtn={true}
				/>
			);
			this.setState({
				screen: 'play'
			});
		});
		this.socket.on('PHAZE OFF!', data => {
			if (data.playerJudging.username === this.props.user.username) {
				this.display = <Judging chooseWinner={this.chooseWinner} data={data.playersInPhazeOff} />;
				this.setState({
					screen: 'judge'
				});
			}
			for (let i = 0; i < data.playersInPhazeOff.length; i++) {
				if (data.playersInPhazeOff[i].username === this.props.user.username) {
					// TURN SCREEN BRIGHT COLOR
					this.display = (
						<GamePlay
							drawCard={this.drawCard}
							user={this.props.user}
							game={data.game}
							screenColor="green"
							drawBtn={false}
						/>
					);
					this.setState({
						screen: 'play'
					});
				}
			}
		});
		this.socket.on('phazeOffResolved', data => {
			if (data.losers.includes(this.props.user.username)) {
				console.log('YOU LOST!!');
				// DISPLAY SORRY YOU LOST MESSAGE
			} else if (data.winner === this.props.user.username) {
				console.log('YOU WON!!');
				// DISPLAY CONGRATS MESSAGE
			}
			this.display = (
				<GamePlay
					drawCard={this.drawCard}
					user={this.props.user}
					game={data.game}
					screenColor="white"
					drawBtn={true}
				/>
			);
			this.props.updateGame(data.game);
			this.setState({
				screen: 'play'
			});
		});
	}

	componentWillUpdate(NextProps, NextState) {}

	drawCard = () => {
		this.socket.emit('drawCard', this.props.user.username, this.props.game.addCode, this.props.game._id);
	};

	startGame = () => {
		this.socket.emit('startGame', this.props.game.addCode);
	};

	chooseWinner = (losers, winner) => {
		// PLAYERSINPHAZEOFF list of usernames
		this.socket.emit('phazeOffResult', losers, winner, this.props.game.addCode, this.props.game._id);
	};

	render() {
		return (
			<View style={styles.container}>
				{this.display}
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
