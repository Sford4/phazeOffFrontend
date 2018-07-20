import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TextInput } from 'react-native';
import { AppConsumer } from '../../context/context';
// import Navigation from '../navigation/Navigation';
import masterStyles from '../../styles/masterStyles';

// COMPONENT IMPORTS
// import AwesomeAlert from 'react-native-awesome-alerts';

export default class GamePlay extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cardInPlay: this.getMyCards('play', this.props.game),
			cardsWon: this.getMyCards('won', this.props.game)
		};
	}

	getMyCards = (type, game) => {
		// console.log('user at gamelay', this.props.user);
		return game.players.map(player => {
			if (player.username === this.props.user.username) {
				if (type === 'play') {
					// console.log('cards to play:', player.cardsInPlay[player.cardsInPlay.length - 1]);
					return player.cardsInPlay[player.cardsInPlay.length - 1];
				} else if (type === 'won') {
					// console.log('cards won:', player.cardsWon);
					return player.cardsWon.length ? player.cardsWon.length : '0';
				}
			}
		});
	};

	drawCardBtn = () => {
		if (this.props.drawBtn) {
			return (
				<TouchableHighlight onPress={() => this.props.drawCard()} style={styles.drawCardBtn}>
					<Text style={styles.drawCardBtnText}>Draw Card</Text>
				</TouchableHighlight>
			);
		} else {
			return <View style={[styles.drawCardBtn, { backgroundColor: 'transparent' }]} />;
		}
	};

	limitView = () => {
		if (this.props.game.gameType.title === 'points') {
			return <Text style={styles.gameLimit}>Points to Win: {this.props.game.gameType.limit}</Text>;
		} else if (this.props.game.gameType.title === 'infinite') {
			return <Text style={styles.gameLimit}>∞</Text>;
		} else if (this.props.game.gameType.title === 'time') {
			return null;
		}
	};

	componentWillUpdate(NextProps, NextState) {}

	componentWillReceiveProps(NextProps) {
		this.setState({
			cardInPlay: this.getMyCards('play', NextProps.game),
			cardsWon: this.getMyCards('won', NextProps.game)
		});
	}

	render() {
		return (
			<View style={[styles.container, { backgroundColor: this.props.screenColor }]}>
				<TouchableHighlight
					style={{
						width: '30%',
						position: 'absolute',
						left: '5%',
						top: '5%'
					}}
					onPress={() => this.props.leaveGame()}
				>
					<Image
						style={{ width: 50, height: 35, marginHorizontal: 10 }}
						source={require('../../../assets/PhazeOffLogo.png')}
					/>
				</TouchableHighlight>
				<View style={styles.points}>
					<Text style={styles.pointsText}>{this.state.cardsWon} Points</Text>
				</View>
				<View>
					<Text style={styles.cardText}>
						{this.state.cardInPlay ? this.state.cardInPlay : ''}
					</Text>
				</View>
				{this.drawCardBtn()}
				{this.limitView()}

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flex: 1,
		backgroundColor: 'transparent',
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
		width: 75,
		aspectRatio: 1,
		borderRadius: 50,
		backgroundColor: '#044797',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		shadowRadius: 3,
		shadowColor: 'gray',
		shadowOpacity: 0.5,
		alignSelf: 'flex-end',
		position: 'absolute',
		right: '5%',
		bottom: '5%'
	},
	drawCardBtnText: {
		color: 'white',
		fontSize: 20,
		textAlign: 'center'
	},
	points: {
		position: 'absolute',
		right: '5%',
		top: '5%'
	},
	pointsText: {
		fontSize: 20,
		color: '#DDC060',
		fontWeight: 'bold'
	},
	cardText: {
		fontSize: 65,
		transform: [{ rotate: '180deg' }],
		maxWidth: '95%',
		marginHorizontal: '3%',
		textAlign: 'center'
	},
	gameLimit: {
		fontSize: 20,
		color: '#DDC060',
		fontWeight: 'bold',
		position: 'absolute',
		left: '5%',
		bottom: '5%'
	}
});
