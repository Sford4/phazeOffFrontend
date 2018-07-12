import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Image } from 'react-native';
import { AppConsumer } from '../context/context';
import Navigation from '../navigation/Navigation';
import AwesomeAlert from 'react-native-awesome-alerts';
import masterStyles from '../styles/masterStyles';

// COMPONENT IMPORTS

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			email: '',
			password: '',
			passwordConfirm: '',
			showAlert: false,
			loading: this.props.user === 'none' ? false : true
		};
		console.log('props from context', this.props);
	}

	showAlert = () => {
		this.setState({
			showAlert: true
		});
	};

	hideAlert = () => {
		this.setState({
			showAlert: false
		});
	};

	componentDidMount() {
		if (!this.props.user) {
			this.props.retrieveUserData();
		}
	}

	componentWillUpdate(Nextprops, Nextstate) {
		console.log('New user props', Nextprops);
		if (Nextprops.user && Nextprops.user.error) {
			this.showAlert();
		} else if (Nextprops.user === 'none' && Nextstate.loading) {
			this.setState({
				loading: false
			});
		} else if (Nextprops.user !== 'none' && Nextprops.user && !Nextprops.user.error) {
			console.log('GOING HOME!!!');
			Navigation.navigate('MainMenu');
		}
	}

	render() {
		if (this.state.loading) {
			return (
				<View style={styles.container}>
					<Text>LOADING!!!!</Text>
				</View>
			);
		}
		return (
			<View style={styles.container}>
				<Image style={{ width: 150, height: 75 }} source={require('../../assets/PhazeOffLogo.png')} />
				<TextInput
					style={masterStyles.input}
					placeholder="Username"
					onChangeText={text => this.setState({ userName: text })}
					value={this.state.userName}
				/>
				<TextInput
					style={masterStyles.input}
					placeholder="Email"
					onChangeText={text => this.setState({ email: text })}
					value={this.state.email}
					keyboardType="email-address"
				/>
				<TextInput
					style={masterStyles.input}
					placeholder="Password"
					onChangeText={text => this.setState({ password: text })}
					value={this.state.password}
					secureTextEntry={true}
				/>
				<TextInput
					style={masterStyles.input}
					placeholder="Confirm Password"
					onChangeText={text => this.setState({ passwordConfirm: text })}
					value={this.state.passwordConfirm}
					secureTextEntry={true}
				/>
				{/* <TouchableHighlight style={masterStyles.button} onPress={() => Navigation.navigate('MainMenu')}> */}
				<TouchableHighlight style={masterStyles.button} onPress={() => this.props.signup(this.state)}>
					<Text style={masterStyles.btnText}>SIGNUP</Text>
				</TouchableHighlight>
				<TouchableHighlight onPress={() => Navigation.navigate('Login')}>
					<Text style={{ color: '#004AFF' }}>Have an account? Click here!</Text>
				</TouchableHighlight>

				<AwesomeAlert
					show={this.state.showAlert}
					showProgress={false}
					title="Whoops!"
					message={this.props.user && this.props.user.error ? this.props.user.error : 'Error message here'}
					closeOnTouchOutside={true}
					closeOnHardwareBackPress={false}
					showCancelButton={false}
					showConfirmButton={true}
					confirmText="Try again"
					confirmButtonColor="#DD6B55"
					onConfirmPressed={() => {
						this.hideAlert();
					}}
				/>
			</View>
		);
	}
}

export default props => (
	<AppConsumer>
		{props => <Signup {...props} />}
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
