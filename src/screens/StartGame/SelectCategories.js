import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { AppConsumer } from '../../context/context';
import masterStyles from '../../styles/masterStyles';
import Navigation from '../../navigation/Navigation';

// COMPONENT IMPORTS
import Header from '../../screens/components/header';
import CheckBox from 'react-native-check-box';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class SelectCategories extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			catsFromBackend: this.props.catsFromBackend ? this.props.catsFromBackend : [],
			categoriesChosen: this.props.data ? this.props.data : [],
			showAlert: false,
			alertCategory: null
		};
		this.checkBoxArea = this.displayCategories(this.props.catsFromBackend);
		// console.log('props @ select categories', this.props);
	}

	componentWillUpdate(NextProps, NextState) {
		if (NextProps.catsFromBackend && !NextState.catsFromBackend.length) {
			this.setState({
				catsFromBackend: NextProps.catsFromBackend
			});

			this.checkBoxArea = this.displayCategories(NextProps.catsFromBackend);
		}
	}

	boxChecked = id => {
		// console.log('checking box with id', id);
		let arr = this.state.categoriesChosen;
		if (arr.includes(id)) {
			arr.splice(arr.indexOf(id), 1);
		} else {
			arr.push(id);
		}
		this.setState({
			categoriesChosen: arr
		});
	};

	open;

	doesUserOwn = (checked, id) => {
		return true;
	};

	displayCategories = categories => {
		// console.log('updating check area with categories', categories.length);
		if (categories) {
			for (let i = 0; i < categories.length; i++) {
				if (this.state.categoriesChosen.length && this.state.categoriesChosen.includes(categories[i]._id)) {
					categories[i].checked = true;
				} else {
					categories[i].checked = false;
				}
			}
			return categories.map((category, index) => {
				if (this.doesUserOwn(category._id)) {
					return (
						<CheckBox
							key={index}
							style={{ margin: 10 }}
							onClick={() => this.boxChecked(category._id)}
							isChecked={category.checked}
							rightText={category.title}
							checkBoxColor="#044797"
							rightTextStyle={{ color: 'black', fontSize: 20 }}
						/>
					);
				} else {
					return (
						<CheckBox
							key={index}
							style={{ margin: 10 }}
							onClick={() =>
								this.setState({
									showAlert: true
								})}
							rightTextStyle={{ color: 'lightgray', fontSize: 20 }}
							isChecked={category.checked}
							rightText={category.title}
							checkBoxColor="lightgray"
						/>
					);
				}
			});
		} else {
			return null;
		}
	};

	buyCategory = () => {
		console.log('BUYING CATEGORY', this.state.alertCategory);
		this.setState({
			showAlert: false
		});
	};

	goToGameType = () => {
		this.props.saveCategories(this.state.categoriesChosen);
		this.props.goToPage('type');
	};

	render() {
		return (
			<AppConsumer>
				{context => (
					<View style={styles.container}>
						<Header title="Start Game!" />
						<View style={styles.mainBody}>
							<View>
								<Text style={masterStyles.subtitle}>1) Select Categories</Text>
								{this.checkBoxArea}
							</View>
						</View>
						<View style={styles.bottomBtns}>
							<TouchableHighlight
								style={masterStyles.halfButton}
								onPress={() => Navigation.navigate('MainMenu')}
							>
								<Text style={masterStyles.btnText}>Back</Text>
							</TouchableHighlight>
							<TouchableHighlight style={masterStyles.halfButton} onPress={() => this.goToGameType()}>
								<Text style={masterStyles.btnText}>Next</Text>
							</TouchableHighlight>
						</View>

						<AwesomeAlert
							show={this.state.showAlert}
							showProgress={false}
							title="Oh no!"
							message="Looks like you haven't unlocked that category yet; would you like to now?"
							closeOnTouchOutside={false}
							closeOnHardwareBackPress={true}
							showCancelButton={true}
							showConfirmButton={true}
							confirmText="Yes please!"
							confirmButtonColor="#044797"
							onConfirmPressed={() => {
								this.buyCategory();
							}}
							onCancelPressed={() =>
								this.setState({
									showAlert: false
								})}
						/>
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
		justifyContent: 'space-around',
		marginBottom: 10
	},
	disabled: {
		borderColor: 'gray'
	},
	mainBody: {
		height: '70%'
	}
});
