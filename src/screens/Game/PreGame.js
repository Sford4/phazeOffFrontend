import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TextInput } from 'react-native';
// import { AppConsumer } from '../../context/context';
// import Navigation from '../navigation/Navigation';
import masterStyles from '../../styles/masterStyles';

// COMPONENT IMPORTS
// import AwesomeAlert from 'react-native-awesome-alerts';

export default class PreGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		console.log('players at pregame', this.props.game.players);
		// console.log('avatars at pregame', this.props.avatars);
		this.playersList = this.props.game.players.map((player, index) => {
			let img = this.props.avatars[Number(player.avatar)];
			// console.log('player img at pregame 18', img);
			return (
				<View key={index} style={styles.player}>
					<Image style={{ width: 100, height: 100 }} source={img.img} />
					<Text key={index}>{player.username}</Text>
				</View>
			);
		});
	}

	startGameBtn = () => {
		if (this.props.user.username === this.props.game.organizer) {
			// if (this.props.game.players.length < 3) {
			// 	return <Text>Waiting for at least three players...</Text>;
			// } else {
			return (
				<TouchableHighlight style={masterStyles.button} onPress={() => this.props.startGameFunc()}>
					<Text style={masterStyles.btnText}>Start Game</Text>
				</TouchableHighlight>
			);
			// }
		} else {
			return null;
		}
	};

	componentWillUpdate(NextProps, NextState) {
		if (this.props.game.players.length !== NextProps.game.players.length) {
			this.playersList = NextProps.game.players.map((player, index) => {
				let img = NextProps.avatars[Number(player.avatar)];
				return (
					<View key={index} style={styles.player}>
						<Image style={{ width: 100, height: 100 }} source={img.img} />
						<Text key={index}>{player.username}</Text>
					</View>
				);
			});
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					{/* ADD END GAME FUNC FOR LEAVING */}
					<TouchableHighlight style={{ width: '30%' }} onPress={() => this.props.leaveGame()}>
						<Image
							style={{ width: 100, height: 70, marginHorizontal: 10 }}
							source={require('../../../assets/PhazeOffLogo.png')}
						/>
					</TouchableHighlight>
					<Text style={[masterStyles.title, { width: '30%', textAlign: 'center' }]}>Pregame</Text>
					<Text style={[masterStyles.title, { width: '30%', textAlign: 'center' }]}>
						Add code: {this.props.game.addCode}
					</Text>
				</View>
				<View style={styles.smallContainer}>
					{/* <Text>Add code: {this.props.game.addCode}</Text> */}
					<Text style={masterStyles.subtitle}>Players</Text>
					<View style={styles.playerlist}>
						{this.playersList}
					</View>
				</View>
				{this.startGameBtn()}
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
