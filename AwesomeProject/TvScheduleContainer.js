import React, { Component } from 'react'
import {ListView, View,Text,ActivityIndicator,TouchableOpacity, ScrollView } from 'react-native'
var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }); 
const channelEndpointBase = 'https://apis.is';
var styles = require('./style.js');


export default class TvScheduleContainer extends Component {
	constructor(props) {
		super(props);
		this.getProgramforChannel = this.getProgramforChannel.bind(this);
		this.renderHeader = this.renderHeader.bind(this);
		this.onPressButton = this.onPressButton.bind(this);
		this.getDateFormat = this.getDateFormat.bind(this);

		this.getProgramforChannel();
		this.state = {
			ChannelProgram: [],
			animating: true,
			showText: true,
			rowId: -1,
			rowFlag: false
		};
		setInterval(() => {
			this.setState({ showText: !this.state.showText });
		}, 1000);
	}

	async getProgramforChannel() {
		try {
			var channelEndpointUrl = channelEndpointBase + this.props.endpoint;
			let response = await fetch(channelEndpointUrl);
			await response.json().then(function(data){

				this.setState({
					ChannelProgram: data.results,
					animating: !this.state.animating
				});
			}.bind(this));
			this.props.date = this.getDateFormat(this.state.ChannelProgram);
		}
		catch(error) {
			console.log(error);
		}
	};

	getDateFormat(data){
		return data[0].startTime.slice(8,10)+'.'+data[0].startTime.slice(5,7)+' '+data[0].startTime.slice(0,4);
	}
	renderHeader(sectionData, sectionID){
		return (
			<View>
			<Text style = {styles.tvScheduleHeader}>{this.props.date}</Text>
			</View>
			)
	}
	onPressButton(sectionID) {
		this.setState({
			rowId: sectionID,
			rowFlag: !this.state.rowFlag
		});
		console.log(sectionID);
	}
	render() {
		return (
			<View  style 	= {styles.MainView}>
			<View style={[this.state.animating ? [styles.loadingView] : styles.hidden]}>
			<ActivityIndicator
			animating={this.state.animating}
			size="large"
			/>
			<Text style= {styles.largeFont}> Sæki gögn...</Text>
			</View>

			<ListView
			dataSource={ds.cloneWithRows(this.state.ChannelProgram)}
			renderHeader = {this.renderHeader}
			renderRow={(rowData,rowID,sectionID) =>	
				<View style = {styles.tvScheduleItem}>

				<Text style = {styles.tvScheduleTime}> {rowData.startTime.slice(11,16)} </Text> 
				<Text style = {styles.tvScheduleTitle}> {rowData.title} </Text> 

				<TouchableOpacity onPress={this.onPressButton.bind(this,sectionID)}><Text style = {styles.TvScheduleButton}>{'Nánar'}</Text></TouchableOpacity> 
				<Text style = {rowData.series.episode === ('1' && '') ? styles.hidden : styles.tvScheduleSeries}> ({rowData.series.episode} af {rowData.series.series}) </Text> 
				<Text style = {this.state.rowId == sectionID  && this.state.rowFlag ? styles.tvScheduleDescription : styles.hidden}>{rowData.description}</Text>
				<View style = {rowData.live ? '' : styles.hidden}><Blink  text={'í beinni!'}/></View>
				</View>
			}

			/>
			</View>

			)
	}
}
class Blink extends Component {
	constructor(props) {
		super(props);
		this.state = {showText: true};

    // Toggle the state every second
    setInterval(() => {
    	this.setState({ showText: !this.state.showText });
    }, 1000);
  }

  render() {
  	let display = this.state.showText ? this.props.text : ' ';
  	return (
  		<Text style = {styles.liveText}>{display}</Text>
  		);
  }
}