import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TextInput, Alert } from 'react-native';
import { AppConsumer } from '../../context/context';
import masterStyles from '../../styles/masterStyles';
import Navigation from '../../navigation/Navigation';

// COMPONENT IMPORTS
import Header from '../../screens/components/header';

export default class ChooseUsername extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			img: this.props.avatar ? this.props.avatar : null,
			username: this.props.username ? this.props.username : null
		};
	}

	changePage = page => {
		this.props.saveAvatar(this.state.img);
		this.props.saveUsername(this.state.username);
		if (page === 'PreGame') {
			this.props.startGame(this.state.img, this.state.username);
		} else {
			this.props.goToPage(page);
		}
	};

	render() {
		return (
			<AppConsumer>
				{context => (
					<View style={styles.container}>
						<Header title="Start Game!" />
						<View style={styles.mainBody}>
							<Text style={masterStyles.subtitle}>3) Select your Username and Picture</Text>
							<View style={{ height: 150 }}><Text>GET YOUR PIC HERE</Text></View>
							<Text>Your Name</Text>
							<TextInput
								style={masterStyles.input}
								placeholder="e.g. John"
								onChangeText={text => this.setState({ username: text })}
								value={this.state.username}
								maxLength={25}
							/>
						</View>

						<View style={styles.bottomBtns}>
							<TouchableHighlight style={masterStyles.halfButton} onPress={() => this.changePage('type')}>
								<Text style={masterStyles.btnText}>Back</Text>
							</TouchableHighlight>
							<TouchableHighlight
								style={masterStyles.halfButton}
								onPress={() => this.changePage('PreGame')}
							>
								<Text style={masterStyles.btnText}>Next</Text>
							</TouchableHighlight>
						</View>

					</View>
				)}
			</AppConsumer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
		justifyContent: 'space-around'
	},
	mainBody: {
		height: '70%',
		width: '90%'
	}
});
