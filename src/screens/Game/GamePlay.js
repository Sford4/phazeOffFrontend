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
			cardsInPlay: this.getMyCards('play', this.props.game),
			cardsWon: this.getMyCards('won', this.props.game)
		};
	}

	getMyCards = (type, game) => {
		console.log('user at gamelay', this.props.user);
		return game.players.map(player => {
			if (player.username === this.props.user.username) {
				if (type === 'play') {
					// console.log('cards in play:', player.cardsInPlay);
					return player.cardsInPlay;
				} else if (type === 'won') {
					// console.log('cards won:', player.cardsWon);
					return player.cardsWon;
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

	componentWillUpdate(NextProps, NextState) {}

	componentWillReceiveProps(NextProps) {
		this.setState({
			cardsInPlay: this.getMyCards('play', NextProps.game),
			cardsWon: this.getMyCards('won', NextProps.game)
		});
	}

	render() {
		return (
			<View style={[styles.container, { backgroundColor: this.props.screenColor }]}>
				<View style={styles.points}>
					<Text style={styles.pointsText}>{this.state.cardsWon.length} Points</Text>
				</View>
				<View>
					<Text style={styles.cardText}>
						{this.state.cardsInPlay.length ? this.state.cardsInPlay[this.state.cardsInPlay.length - 1] : ''}
					</Text>
				</View>
				{this.drawCardBtn()}

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
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
		width: 65,
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
		fontSize: 20
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
    }
	cardText: {
		fontSize: 40
	}
});
