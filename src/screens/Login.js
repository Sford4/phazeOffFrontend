import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Image } from 'react-native';
import { AppConsumer } from '../context/context';
import Navigation from '../navigation/Navigation';
import AwesomeAlert from 'react-native-awesome-alerts';
import masterStyles from '../styles/masterStyles';

// COMPONENT IMPORTS

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			showAlert: false
		};
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

	login = state => {
		this.props.login(state);
		this.setState({
			email: '',
			password: ''
		});
	};

	componentWillMount() {
		if (!this.props.user) {
			this.props.retrieveUserData();
		} else if (this.props.user !== 'none' && this.props.user && !this.props.user.error) {
			console.log('trying to nav to home');
			Navigation.navigate('MainMenu');
		}
	}

	componentWillUpdate(Nextprops, Nextstate) {
		let navState = Navigation.getCurrentRoute();
		// console.log('nav state', navState.nav);
		if (Nextprops.user && Nextprops.user.error) {
			this.showAlert();
		} else if (
			Nextprops.user !== 'none' &&
			Nextprops.user &&
			!Nextprops.user.error &&
			navState.nav.routes[navState.nav.routes.length - 1].routeName === 'Login'
		) {
			console.log('navState', navState);
			console.log('GOING HOME!!!');
			Navigation.navigate('MainMenu');
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Image style={{ width: 150, height: 75 }} source={require('../../assets/PhazeOffLogo.png')} />
				<Text>Login with your Email</Text>
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
				{/* <TouchableHighlight style={masterStyles.button} onPress={() => Navigation.navigate('MainMenu')}> */}
				<TouchableHighlight style={masterStyles.button} onPress={() => this.login(this.state)}>
					<Text style={masterStyles.btnText}>Login</Text>
				</TouchableHighlight>
				<TouchableHighlight onPress={() => Navigation.navigate('Signup')}>
					<Text style={{ color: '#004AFF' }}>Don't have an account? Click here!</Text>
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
		{props => <Login {...props} />}
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
