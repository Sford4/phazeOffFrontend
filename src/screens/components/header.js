import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import Navigation from '../../navigation/Navigation';
import masterStyles from '../../styles/masterStyles';

// COMPONENT IMPORTS
export default class Header extends React.Component {
	goHome = () => {
		console.log('this.props.trytoleave', this.props.onLogoPress);
		if (this.props.onLogoPress) {
			this.props.onLogoPress();
		} else {
			console.log('GOING HOME!!!');
			Navigation.navigate('MainMenu');
		}
	};

	render() {
		return (
			<View style={styles.header}>
				<TouchableHighlight onPress={() => this.goHome()}>
					<Image
						style={{ width: 140, height: 70, marginHorizontal: 10 }}
						source={require('../../../assets/PhazeOffLogo.png')}
					/>
				</TouchableHighlight>
				<Text style={[masterStyles.title, { width: '45%', textAlign: 'center' }]}>{this.props.title}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignSelf: 'flex-start',
		marginTop: 15,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10
	}
});
