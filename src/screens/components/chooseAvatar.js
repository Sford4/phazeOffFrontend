import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import Navigation from '../../navigation/Navigation';
import masterStyles from '../../styles/masterStyles';

// COMPONENT IMPORTS
export default class ChooseAvatar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			avatars: this.props.avatars,
			avatarCount: 0,
			img: this.props.avatars[0]
		};
		this.img = (
			<Image style={{ width: 110, height: 110, marginHorizontal: 10 }} source={this.props.avatars[0].img} />
		);
	}

	componentWillUpdate(NextProps, NextState) {
		// console.log('update triggered', NextState);
		this.img = (
			<Image
				style={{ width: 110, height: 110, marginHorizontal: 10 }}
				source={NextState.avatars[NextState.avatarCount].img}
			/>
		);
	}

	chooseAvatar = direction => {
		this.changeImage(direction);
		this.saveImage(this.state.img);
	};

	saveImage = () => {
		console.log('avatar at chooseAvatar save', this.state.img);
		this.props.saveImg(this.state.img);
	};

	changeImage = direction => {
		// console.log('changing img', direction);
		let indexPos = this.state.avatarCount;
		if (direction === 'back') {
			if (indexPos - 1 < 0) {
				this.setState({
					avatarCount: this.state.avatars.length - 1,
					img: this.state.avatars[this.state.avatars.length - 1]
				});
			} else {
				this.setState({
					avatarCount: indexPos - 1,
					img: this.state.avatars[indexPos - 1]
				});
			}
		}
		if (direction === 'forward') {
			if (indexPos + 1 > this.state.avatars.length - 1) {
				this.setState({
					avatarCount: 0,
					img: this.state.avatars[0]
				});
			} else {
				this.setState({
					avatarCount: indexPos + 1,
					img: this.state.avatars[indexPos + 1]
				});
			}
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<TouchableHighlight onPress={() => this.chooseAvatar('back')}>
					<Text style={styles.arrowBtn}>◄</Text>
				</TouchableHighlight>
				{this.img}
				<TouchableHighlight onPress={() => this.chooseAvatar('forward')}>
					<Text style={styles.arrowBtn}>►</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		marginBottom: 20,
		alignItems: 'center',
		paddingHorizontal: 10
	},
	arrowBtn: {
		color: '#044797',
		fontSize: 60,
		fontWeight: 'bold'
	}
});
