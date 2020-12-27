import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';

export default class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../img/laliga.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    alignSelf: 'stretch',
    marginBottom: 50,
    textAlign: 'center',
  },
  logo: {
    alignSelf: 'center',
    height: 50,
    width: 150,
    marginVertical: 15
  }
});
