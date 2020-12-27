import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView } from 'react-native';
import moment from 'moment';
import localization from 'moment/locale/es';
import { Picker } from '@react-native-picker/picker';

//Components
import Header from '../components/header';

moment.updateLocale('es', localization);

export default class Matches extends Component {
  constructor() {
    super();
    this.state = {
      matches: [],
      loading: false,
      selectedMachDay: 1,
      currentMatchDay: 0,
      matchDays: []
    };
  };

  componentDidMount = () => {
    this.setState({
      loading: true
    });
    fetch('https://api.football-data.org/v2/competitions/PD/matches?matchday=' + this.state.selectedMachDay, {
      method: 'GET',
      headers: {
        'X-Auth-Token': '3c25023a9b924adbbe90793469260ad8'
      }
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          matches: response.matches,
          loading: false,
          currentMatchDay: response.matches[0].season.currentMatchday
        });
      }).catch((error) => {
        console.log(error.message);
      });
  }

  render() {
    const state = this.state;
    let match;
    let matchDayOption;
    let teamLogos = {
      77: require('../img/logos/atleticbilbao.png'),
      78: require('../img/logos/atleticomadrid.png'),
      79: require('../img/logos/osasuna.png'),
      81: require('../img/logos/barcelona.png'),
      82: require('../img/logos/getafe.png'),
      83: require('../img/logos/granada.png'),
      86: require('../img/logos/realmadrid.png'),
      88: require('../img/logos/levante.png'),
      90: require('../img/logos/realbetis.png'),
      92: require('../img/logos/realsociedad.png'),
      94: require('../img/logos/villareal.png'),
      95: require('../img/logos/valencia.png'),
      250: require('../img/logos/valladolid.png'),
      263: require('../img/logos/deportivoalaves.png'),
      264: require('../img/logos/cadiz.png'),
      278: require('../img/logos/eibar.png'),
      285: require('../img/logos/elche.png'),
      299: require('../img/logos/huesca.png'),
      558: require('../img/logos/celta.png'),
      559: require('../img/logos/sevilla.png')
    };
    if (!state.loading) {
      match = state.matches.map(function (match, index) {
        return (
          <View key={index} style={styles.matchItem}>
            <View style={styles.matchTeams}>
              <View style={styles.team}>
                <Image style={styles.teamLogo} source={teamLogos[match.homeTeam.id]} />
                <Text style={styles.teamName}>{match.homeTeam.name}</Text>
              </View>
              <View style={styles.team}>
                <Image style={styles.teamLogo} source={teamLogos[match.awayTeam.id]} />
                <Text style={styles.teamName}>{match.awayTeam.name}</Text>
              </View>
            </View>
            <View style={styles.matchSchedule}>
              <Text style={styles.matchDate}>{moment(match.utcDate).format('DD MMM')}</Text>
              <Text style={styles.matchDate}>{moment(match.utcDate).format('HH:mm')}</Text>
            </View>
          </View>
        );
      });
      if(state.currentMatchDay > 0) {
        for (let i = 1; i <= state.currentMatchDay; i++) {
          state.matchDays.push(i)
        }
      }
      if(!matchDayOption) {
        matchDayOption = state.matchDays.map(function (i) {
          return (
            <Picker.Item label={'Jornada ' + i} value={i} key={i} />
          )
        })
      }
    } else {
      match = <Text style={{ textAlign: 'center' }}>Cargando...</Text>;
    }
    return (
      <SafeAreaView style={styles.pageContainer}>
        <ScrollView>
          <View style={styles.container}>
            <Header></Header>
            <View style={styles.matchesContainer}>
              <Picker
                selectedValue={this.state.selectedMachDay}
                style={{ height: 50, width: 140, alignSelf: 'flex-end' }}
                onValueChange={(itemValue) => {
                  this.setState({ selectedMachDay: itemValue, matchDays: [], loading: true });
                  this.componentDidMount();
                }
                }>
                {matchDayOption}
              </Picker>
              {match}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 25
  },
  matchesContainer: {
    flex: 1,
    width: '85%',
    maxWidth: 860
  },
  matchItem: {
    minHeight: 50,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#DBF0DC',
    borderBottomColor: '#bbb',
    borderBottomWidth: 1
  },
  matchTeams: {
    width: '70%',
    borderRightWidth: 1,
    borderRightColor: '#bbb'
  },
  team: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5
  },
  teamLogo: {
    width: 20,
    height: 20
  },
  teamName: {
    paddingHorizontal: 5
  },
  matchSchedule: {
    flexGrow: 1
  },
  matchDate: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
