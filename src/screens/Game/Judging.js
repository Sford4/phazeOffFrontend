import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TextInput } from 'react-native';
// import { AppConsumer } from '../../context/context';
// import Navigation from '../navigation/Navigation';
import masterStyles from '../../styles/masterStyles';

// COMPONENT IMPORTS
// import AwesomeAlert from 'react-native-awesome-alerts';

export default class Judging extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		console.log('players at pregame', this.props.game.players);
		this.playersList = this.props.players.map((player, index) => {
			let img = this.props.avatars[Number(player.avatar)];
			return (
				<TouchableHighlight
					key={index}
					style={styles.player}
					onPress={() => this.chooseWinner(player.username)}
				>
					<Image style={{ width: 100, height: 100 }} source={img.img} />
					<Text key={index}>{player.username}</Text>
				</TouchableHighlight>
			);
		});
	}

	chooseWinner = winner => {
		let losers = [];
		this.props.players.map(player => {
			if (player.username !== winner) {
				losers.push(player.username);
			}
		});
		this.props.chooseWinner(losers, winner);
	};

	componentWillUpdate(NextProps, NextState) {}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={masterStyles.title}>Select the Winner</Text>
				</View>
				<View style={styles.smallContainer}>
					{/* <Text>Add code: {this.props.game.addCode}</Text> */}
					<Text style={masterStyles.subtitle}>Players in Phaze Off</Text>
					<View style={styles.playerlist}>
						{this.playersList}
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	smallContainer: {
		display: 'flex',
		// flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginTop: 30,
		height: 150
	},
	header: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignSelf: 'flex-start',
		marginTop: 15,
		alignItems: 'center',
		paddingHorizontal: 10
	},
	playerlist: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginTop: 10,
		height: 150
	},
	player: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginLeft: 10,
		marginRight: 10
	}
});
