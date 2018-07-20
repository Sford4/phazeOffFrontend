import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, ScrollView } from 'react-native';
import Navigation from '../navigation/Navigation';
import masterStyles from '../styles/masterStyles';

// COMPONENT IMPORTS
import Header from '../screens/components/header';

export default class Rules extends React.Component {
	logout = () => {
		this.props.logout();
		Navigation.navigate('Login');
	};
	goHome = () => {
		console.log('GOING HOME!!!');
		Navigation.navigate('MainMenu');
	};

	render() {
		return (
			<View style={styles.container}>
				<Header title="Rules" />
				<ScrollView style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
					<Text style={{ marginBottom: 10 }}> Phaze Off is a fast-paced word game for 3-8 players.</Text>
					<Text style={{ marginBottom: 10 }}>
						All players must sit in a circle, with their screen turned sideways, so that every other player can see their screen. You’ll know if your screen is turned the right way because you can read everything on the ‘PreGame’ screen.
					</Text>
					<Text style={{ marginBottom: 10 }}>
						When a game starts, the person who organized the game will go first.  (You’ll know if this is you because you’re the person who pressed ‘Start Game’ on the ‘PreGame’ screen.)  Then the person to their left, and so on.  On your turn, press the ‘Draw Card’ button in the bottom right of your screen to get a new word or phrase.  This word or phrase is a description that should describe many things.
					</Text>
					<Text style={{ marginBottom: 10, fontWeight: 'bold' }}>
						Note: don't start the game until all the players have joined; you can't join once the game begins!
					</Text>
					<Text style={{ marginBottom: 10 }}>
						Whenever a player draws a card, there is a chance that a Phaze Off will start.  You will know if you are in a Phaze Off because your screen will turn GREEN, and so will the screen of everyone else in the Phaze Off.  A random player not in the Phaze Off will be selected to judge the winner of the Phaze Off.
					</Text>
					<Text style={{ marginBottom: 10 }}>
						When you are in a Phaze Off, quickly see who else is in the Phaze Off, and name something that is described by the word or phrase on their screen.  For example, if your opponent’s screen read ‘American Food,’ you might say ‘cheeseburger.’  The first person in the Phaze Off who correctly names something one of their opponents’ screens describe wins the Phaze Off.
					</Text>
					<Text style={{ marginBottom: 10 }}>
						The Judge must then choose the winner by clicking on the picture/name of the winner (all of the participants in the Phaze Off will be listed on their screen).  The winner will take the card currently on each losers’ screen, receiving a point for each.
					</Text>
					<Text style={{ marginBottom: 10 }}>
						It is now the turn of the player on the left of the last player to draw a card.
					</Text>
					<Text style={{ marginBottom: 10 }}>
						The ways to win depend on the game type selected when the game is set up:
					</Text>
					<Text style={{ marginBottom: 10, marginHorizontal: 10 }}>
						1) Point limit - the first player to earn the number of points (visible on the bottom left of each players’ screen) wins.
					</Text>
					<Text style={{ marginBottom: 10, marginHorizontal: 10 }}>
						2) Time limit- the player with the most points when time runs out wins.
					</Text>
					<Text style={{ marginBottom: 10, marginHorizontal: 10 }}>
						3) Infinity- the game ends when everyone decides to quit, or when the cards run out.
					</Text>
				</ScrollView>
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
	}
});
