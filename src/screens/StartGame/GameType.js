import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TextInput, Alert } from 'react-native';
import { AppConsumer } from '../../context/context';
import masterStyles from '../../styles/masterStyles';

// COMPONENT IMPORTS
import Header from '../../screens/components/header';

export default class GameType extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			timeLimit: this.props.data.timeLimit ? this.props.data.timeLimit : '5',
			pointLimit: this.props.data.pointLimit ? this.props.data.pointLimit : '5',
			selected: this.props.data.selected ? this.props.data.selected : 'time'
		};
		// console.log('props @ game type', props);
		this.timeLimits = this.makeLimits(
			'time',
			this.selectTimeLimit,
			['5', '10', '15', '20'],
			this.props.data.selected ? this.props.data.selected : 'time',
			this.props.data.timeLimit ? this.props.data.timeLimit : '5'
		);
		this.pointLimits = this.makeLimits(
			'points',
			this.selectPointLimit,
			['5', '10', '15', '20'],
			this.props.data.selected ? this.props.data.selected : 'time',
			this.props.data.pointLimit ? this.props.data.pointLimit : '5'
		);
	}

	componentWillUpdate(NextProps, NextState) {
		this.timeLimits = this.makeLimits(
			'time',
			this.selectTimeLimit,
			['5', '10', '15', '20'],
			NextState.selected,
			NextState.timeLimit
		);
		this.pointLimits = this.makeLimits(
			'points',
			this.selectPointLimit,
			['5', '10', '15', '20'],
			NextState.selected,
			NextState.pointLimit
		);
	}

	makeLimits = (type, func, limits, selected, currLimit) => {
		return limits.map(limit => {
			return (
				<TouchableHighlight
					key={limit}
					onPress={() => func(limit)}
					style={selected === type && limit === currLimit ? styles.numSelected : null}
				>
					<Text style={[selected === type ? null : { color: 'lightgray' }, styles.numberOptions]}>
						{limit}
					</Text>
				</TouchableHighlight>
			);
		});
	};

	changePage = page => {
		this.props.saveGameType(this.state);
		this.props.goToPage(page);
	};

	chooseType = type => {
		this.setState({
			selected: type,
			pointLimit: '5',
			timeLimit: '5'
		});
	};

	selectTimeLimit = limit => {
		if (!this.state.selected === 'time') {
			return;
		} else {
			this.setState({
				timeLimit: limit
			});
		}
	};

	selectPointLimit = limit => {
		if (!this.state.selected === 'points') {
			return;
		} else {
			this.setState({
				pointLimit: limit
			});
		}
	};

	render() {
		return (
			<AppConsumer>
				{context => (
					<View style={styles.container}>
						<Header title="Start Game" />
						<View style={styles.mainBody}>
							<Text style={masterStyles.subtitle}>2) Select Game Type</Text>
							<View style={styles.row}>
								<TouchableHighlight
									style={this.state.selected === 'time' ? styles.chosen : styles.notChosen}
									onPress={() => this.chooseType('time')}
								>
									<Text />
								</TouchableHighlight>
								<Text style={this.state.selected === 'time' ? null : { color: 'lightgray' }}>
									Time limit:
								</Text>
								{this.timeLimits}
							</View>
							<View style={styles.row}>
								<TouchableHighlight
									style={this.state.selected === 'points' ? styles.chosen : styles.notChosen}
									onPress={() => this.chooseType('points')}
								>
									<Text />
								</TouchableHighlight>
								<Text style={this.state.selected === 'points' ? null : { color: 'lightgray' }}>
									Point Limit:
								</Text>
								{this.pointLimits}
							</View>
							<View style={styles.row}>
								<TouchableHighlight
									style={this.state.selected === 'infinite' ? styles.chosen : styles.notChosen}
									onPress={() => this.chooseType('infinite')}
								>
									<Text />
								</TouchableHighlight>
								<Text
									style={[
										this.state.selected === 'infinite' ? null : { color: 'lightgray' },
										styles.numberOptions
									]}
								>
									Til the cards run out!
								</Text>
							</View>
						</View>

						<View style={styles.bottomBtns}>
							<TouchableHighlight
								style={masterStyles.halfButton}
								onPress={() => this.changePage('categories')}
							>
								<Text style={masterStyles.btnText}>Back</Text>
							</TouchableHighlight>
							<TouchableHighlight
								style={masterStyles.halfButton}
								onPress={() => this.changePage('username')}
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
		height: '70%'
	},
	chosen: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: '#044797'
	},
	notChosen: {
		width: 10,
		height: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#044797'
	},
	numberOptions: {
		margin: 10
	},
	numSelected: {
		borderWidth: 1,
		borderColor: '#044797'
	}
});
