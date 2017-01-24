import React, { Component } from 'react'
import { Text, Navigator,TouchableOpacity,View} from 'react-native'
import TvScheduleContainer from './TvScheduleContainer'
import ChannelsContainer from './ChannelsContainer'
var styles = require('./style.js');

export default class Router extends Component {
	constructor(){
		super()
	}

	render() {
		return (
			<Navigator
			initialRoute = {{ name: 'Home', title: 'Sjónvarpsdagskrá' }}
			renderScene = { this.renderScene }
			configureScene={(route, routeStack) =>
				Navigator.SceneConfigs.FloatFromBottomAndroid}
				navigationBar = {
					<Navigator.NavigationBar
					style = { styles.navigationBar }
					routeMapper = { NavigationBarRouteMapper } />
				}
				/>
				);
	}
	renderScene(route, navigator) {
		if(route.name == 'Home') {
			return (
				<ChannelsContainer
				navigator = {navigator}
				/>
				)
		}
		if(route.name == 'About') {
			return (
				<TvScheduleContainer
				navigator = {navigator}
				{...route.passProps} 
				/>
				)
		}
	}
}

var NavigationBarRouteMapper = {
	LeftButton(route, navigator, index, navState) {
		if(index > 0) {
			return (
				<TouchableOpacity
				onPress = {() => { if (index > 0) { navigator.pop() } }}>
				<Text style={ styles.backButton }>
				Til baka
				</Text>
				</TouchableOpacity>
				)
		}
		else { return null }
	},
RightButton(route, navigator, index, navState) {},

Title(route, navigator, index, navState) {
	return (
		<Text style = { styles.title }>
		{route.title}
		</Text>
		)
}
};
