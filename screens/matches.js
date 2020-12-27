import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView } from 'react-native';
import moment from 'moment';
import localization from 'moment/locale/es';

moment.updateLocale('es', localization);

export default class Titles extends Component {
  constructor() {
    super();
    this.state = {
      matches: [],
      // teamsLogos: {},
      // loadingMatches: false,
      // loadingLogos: false
      loading: false
    };
  };

  componentDidMount = () => {
    // this.setState({
    //   loadingMatches: true,
    //   loadingLogos: true
    // });
    this.setState({
      loading: true
    });
    fetch('https://api.football-data.org/v2/competitions/PD/matches?matchday=18', {
      method: 'GET',
      headers: {
        'X-Auth-Token': '3c25023a9b924adbbe90793469260ad8'
      }
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          matches: response.matches,
          // loadingMatches: false
          loading: false
        });
      }).catch((error) => {
        console.log(error.message);
      });

    // fetch('https://api.football-data.org/v2/competitions/PD/teams', {
    //   method: 'GET',
    //   headers: {
    //     'X-Auth-Token': '3c25023a9b924adbbe90793469260ad8'
    //   }
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     let changedTemsObj = {};
    //     response.teams.forEach(element => {
    //       changedTemsObj[element.id] = element.crestUrl;
    //     });
    //     this.setState({
    //       teamsLogos: changedTemsObj,
    //       loadingLogos: false
    //     });
    //     console.log(this.state.teamsLogos)
    //   }).catch((error) => {
    //     console.log(error.message);
    //   });
  }

  render() {
    let match;
    //let logos;
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
    if (!this.state.loading) {
      //logos = this.state.teamsLogos;
      match = this.state.matches.map(function (match, index) {
        return (
          <View key={index} style={styles.matchItem}>
            <View style={styles.matchTeams}>
              <Text><Image style={{ width: 20, height: 20 }} source={teamLogos[match.homeTeam.id]} /> {match.homeTeam.name}</Text>
              <Text><Image style={{ width: 20, height: 20 }} source={teamLogos[match.awayTeam.id]} /> {match.awayTeam.name}</Text>
            </View>
            <View style={styles.matchSchedule}>
              <Text style={styles.matchDate}>{moment(match.utcDate).format('DD MMM')}</Text>
              <Text style={styles.matchDate}>{moment(match.utcDate).format('HH:mm')}</Text>
            </View>
          </View>
        );
      });
    } else {
      match = <Text style={{ textAlign: 'center' }}>Cargando...</Text>;
    }
    return (
      <SafeAreaView style={styles.pageContainer}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <Image style={styles.logo} source={require('../img/laliga.png')} />
            </View>
            <View style={styles.matchesContainer}>{match}</View>
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
    paddingVertical: 25,
    paddingHorizontal: 15
  },
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
  },
  matchesContainer: {
    flex: 1,
    //alignSelf: 'stretch',
    width: '80%',
    maxWidth: 860
  },
  matchItem: {
    minHeight: 50,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#d3ebd4',
    borderBottomColor: '#bbb',
    borderBottomWidth: 1
  },
  matchTeams: {
    width: '70%',
    borderRightWidth: 1,
    borderRightColor: '#bbb'
  },
  matchSchedule: {
    flexGrow: 1
  },
  matchDate: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
})
