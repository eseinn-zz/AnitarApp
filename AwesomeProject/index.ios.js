import React, { Component } from 'react'
import {  AppRegistry, StyleSheet,View } from 'react-native'
import Router from './Router'

class AwesomeProject extends Component {
  render() {
    return (
      <Router />
      )
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
