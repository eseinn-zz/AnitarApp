import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

	channelList: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	channelItem : {
		justifyContent:'space-around',
		borderWidth:2,
		borderColor: 'black',
		padding:10,
		width:140,
		height:105,
		backgroundColor: 'blue',
		textAlign: 'center',
		fontSize:35,  
		color:'white',
	},
	tvScheduleTitle : {  
		justifyContent:'space-around',
		marginLeft:10,
		maxWidth :150
	},
	tvScheduleDescription : {
		alignItems: 'flex-end'
	},
	TvScheduleButton: {
		fontSize: 13,
		fontWeight:'bold',
		marginHorizontal:10,
	},
	tvScheduleItem : {
		width:450,
		flexDirection: 'row',
		borderTopWidth:1,
		borderColor: 'black',
		fontSize:35,  
		color:'white',
	},
	tvScheduleHeader : {
		fontSize: 25,
		textAlign: 'center',
		fontWeight:'bold'
	},
	MainView : {
		paddingTop:75,
		alignItems:'center'
	},
	tvScheduleTime : {    
		justifyContent:'space-around',
		alignItems:'center',
		fontSize:15,
		fontWeight: 'bold',
	},
	loadingView: {
		paddingTop:100,
	},
	liveText : {
		fontWeight: 'bold',
		color:'green',
	},
	largeFont: {
		fontSize: 30,
	},
	circle: {
		borderRadius: 50,
		borderWidth: 1/500
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 8,
	},
	hidden: {
		width: 0,
		height: 0,
	},
	navigationBar: {
		backgroundColor: 'blue',
	},
	backButton: {
		color: '#ffffff',
		margin: 10,
		fontSize: 17,
	},
	title: {
		paddingVertical: 10,
		color: '#ffffff',
		paddingLeft: 10,
		fontSize: 30
	},
});
module.exports = styles;