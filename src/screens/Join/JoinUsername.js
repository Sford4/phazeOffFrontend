import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TextInput, Alert } from 'react-native';
import { AppConsumer } from '../../context/context';
import masterStyles from '../../styles/masterStyles';
import Navigation from '../../navigation/Navigation';

// COMPONENT IMPORTS
import ChooseAvatar from '../../screens/components/chooseAvatar';

export default class JoinUsername extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			img: this.props.avatar ? this.props.avatar : '0',
			username: this.props.username ? this.props.username : null
		};
	}

	saveImg = img => {
		console.log('avatar at joinusername', img);
		this.setState({
			img: img.img.toString()
		});
	};

	render() {
		return (
			<AppConsumer>
				{context => (
					<View style={styles.container}>
						<View style={styles.mainBody}>
							<Text style={masterStyles.subtitle}>3) Select your Name and Picture</Text>
							<ChooseAvatar avatars={context.avatars} saveImg={this.saveImg} />
							<View style={styles.nameSection}>
								<Text style={{ fontSize: 20, marginBottom: 5, fontWeight: 'bold' }}>Your Name</Text>
								<TextInput
									style={masterStyles.input}
									placeholder="e.g. John"
									onChangeText={text => this.setState({ username: text })}
									value={this.state.username}
									maxLength={25}
								/>
							</View>
						</View>
						<TouchableHighlight style={masterStyles.button} onPress={() => this.props.goToGame(this.state)}>
							<Text style={masterStyles.btnText}>Join Game!</Text>
						</TouchableHighlight>
					</View>
				)}
			</AppConsumer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	mainContainer: {
		height: '50%',
		display: 'flex',
		justifyContent: 'space-around'
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignSelf: 'flex-start',
		marginTop: 15,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
		// justifyContent: 'center'
	},
	bottomBtns: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginBottom: 10
	},
	mainBody: {
		height: '70%',
		width: '90%'
	},
	nameSection: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
