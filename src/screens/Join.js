import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TextInput } from 'react-native';
import { AppConsumer } from '../context/context';
import Navigation from '../navigation/Navigation';
import masterStyles from '../styles/masterStyles';

// COMPONENT IMPORTS
import Header from '../screens/components/header';
import AwesomeAlert from 'react-native-awesome-alerts';

class Join extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			code: null,
			showPopup: false
		};
	}
	revealJoinBtn = code => {
		if (code && code.length === 5) {
			console.log('Code was the right length!');
			return (
				<TouchableHighlight style={styles.bigBtn} onPress={() => this.props.findGameByAddCode(this.state.code)}>
					<Text style={styles.bigBtnText}>Find It!</Text>
				</TouchableHighlight>
			);
		} else {
			return (
				<TouchableHighlight
					style={{
						backfaceVisibility: 'hidden',
						width: '70%',
						aspectRatio: 1
					}}
				>
					<Text> </Text>
				</TouchableHighlight>
			);
		}
	};

	onCancel = () => {
		this.setState({
			showPopup: false
		});
		this.props.clearGameSearch();
	};

	joinGame = () => {
		this.props.findGameById(this.props.gameFound.gameId);
	};

	componentWillUpdate(NextProps, NextState) {
		if (NextProps.gameFound && !NextState.showPopup) {
			console.log('at join game found:', NextProps.gameFound);
			this.setState({
				showPopup: true,
				popupTitle: 'Found it!',
				popupMessage: `That code matches a game organized by ${NextProps.gameFound.organizer}; does that sound right?`,
				onCancel: this.onCancel,
				onConfirm: this.joinGame,
				confirmText: 'Join game',
				cancelText: 'Try again',
				showCancel: true
			});
		}
		if (NextProps.gameFound && NextProps.board._id === NextProps.gameFound.gameId) {
			console.log('joining game:', NextProps.board);
			NextProps.clearGameSearch();
			Navigation.navigate('Game');
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Header title="Join a Game!" />
				<View style={styles.smallContainer}>
					<Text style={masterStyles.subtitle}>Enter Game Code</Text>
					<Text style={{ fontStyle: 'italic', color: '#BFBFBF' }}>(Case Sensitive)</Text>
					<TextInput
						style={masterStyles.input}
						placeholder="e.g. 1Fh8n"
						onChangeText={text => this.setState({ code: text })}
						value={this.state.code}
						maxLength={6}
					/>
				</View>
				{this.revealJoinBtn(this.state.code)}
				<AwesomeAlert
					show={this.state.showPopup}
					showProgress={false}
					title={this.state.popupTitle}
					message={this.state.popupMessage}
					closeOnTouchOutside={false}
					closeOnHardwareBackPress={false}
					showCancelButton={this.state.showCancel}
					showConfirmButton={true}
					confirmText={this.state.confirmText}
					cancelText={this.state.cancelText}
					confirmButtonColor="#00a99d"
					onConfirmPressed={() => {
						this.state.onConfirm();
					}}
					onCancelPressed={() => {
						this.state.onCancel();
					}}
				/>
			</View>
		);
	}
}

export default props => (
	<AppConsumer>
		{props => <Join {...props} />}
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
