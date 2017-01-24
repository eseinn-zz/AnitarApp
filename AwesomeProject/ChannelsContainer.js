import React, { Component ,PropTypes } from 'react';
import {ActivityIndicator,Navigator,AppRegistry, Button,Text,View,ListView} from 'react-native';
var styles = require('./style.js');
var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
const channelListUrl = 'https://apis.is/tv/';



export default class ChannelsContainer extends Component {
	constructor(props) {
		super(props);
		this.getChannelList = this.getChannelList.bind(this);
		this.getChannelList();
		this.state = {
			channelList: ds.cloneWithRows([]),
			animating: true,
		};
	}

	async getChannelList() {
		try {
			let response = await fetch(channelListUrl);
			await response.json().then(function(data){
				this.setState({
					channelList: ds.cloneWithRows(data.results[0].channels),
					animating: !this.state.animating
				});
			}.bind(this));
		}
		catch(error) {
			console.error(error);
		}
	};

	render() {
		return (
			<View style={styles.MainView}>
			<View style={[this.state.animating ? [styles.loadingView] : styles.hidden]}>
			<ActivityIndicator
			animating={this.state.animating}
			size="large"
			/>
			<Text style= {styles.largeFont}> Sæki gögn...</Text>
			</View>

			<ListView
			dataSource={this.state.channelList}
			contentContainerStyle = {styles.channelList}
			renderRow={(rowData) =>
				<Text style = {styles.channelItem}
				onPress = { () => {
					this.props.navigator.push({
						name: 'About',
						title: rowData.name,
						passProps: {
							endpoint: rowData.endpoint
						},
					});
				}}>{rowData.name}
				</Text>
			}
			/>
			</View>
			)
	}
}

