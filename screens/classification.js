import React, { Component } from 'react';
import { Text, View, Image, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { block } from 'react-native-reanimated';

//Components
import Header from '../components/header';

export default class Classification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      loading: false,
      tableHead: ['#', 'Equipo', 'PT', 'PJ', 'PG', 'PE', 'PP']
    };
  };

  componentDidMount = () => {
    this.setState({
      loading: true
    });
    fetch('https://api.football-data.org/v2/competitions/PD/standings', {
      method: 'GET',
      headers: {
        'X-Auth-Token': '3c25023a9b924adbbe90793469260ad8'
      }
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          teams: response.standings[0].table,
          loading: false
        });
      }).catch((error) => {
        console.log(error.message);
      });
  }

  render() {
    const state = this.state;
    let team;
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
      team = state.teams.map(function (team, index) {
        return (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCel, styles.teamPosition]}>{team.position}</Text>
            <View style={[styles.tableCel, styles.team]}>
              <Image style={styles.teamLogo} source={teamLogos[team.team.id]} />
              <Text style={styles.teamName}>{team.team.name}</Text>
            </View>
            <View style={styles.teamStats}>
              <Text style={[styles.tableCel, styles.textBold]}>{team.points}</Text>
              <Text style={styles.tableCel}>{team.playedGames}</Text>
              <Text style={styles.tableCel}>{team.won}</Text>
              <Text style={styles.tableCel}>{team.draw}</Text>
              <Text style={styles.tableCel}>{team.lost}</Text>
              <Text style={styles.tableCel}>{team.goalsFor}</Text>
              <Text style={styles.tableCel}>{team.goalsAgainst}</Text>
            </View>
          </View>
        );
      });
    } else {
      team = <Text style={{ textAlign: 'center' }}>Cargando...</Text>;
    }

    return (
      <SafeAreaView style={styles.pageContainer}>
        <ScrollView>
          <View style={styles.container}>
            <Header></Header>
            <View>
              <View style={styles.tebleHead}>
                <Text style={[styles.tableCel, styles.teamPosition]}>#</Text>
                <Text style={[styles.tableCel, styles.teamNameHead]}>Equipo</Text>
                <View style={styles.teamStats}>
                  <Text style={styles.tableCel}>PT</Text>
                  <Text style={styles.tableCel}>PJ</Text>
                  <Text style={styles.tableCel}>PG</Text>
                  <Text style={styles.tableCel}>PE</Text>
                  <Text style={styles.tableCel}>PP</Text>
                  <Text style={styles.tableCel}>GF</Text>
                  <Text style={styles.tableCel}>GC</Text>
                </View>
              </View>
              {team}
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
    paddingVertical: 25,
    paddingHorizontal: 15
  },
  tebleHead: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#000'
  },
  teamNameHead: {
    width: '40%'
  },
  tableRow: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#d3ebd4'
  },
  tableCel: {
    padding: 5
  },
  teamPosition: {
    minWidth: 30
  },
  team: {
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  teamName: {
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: 'bold'
  },
  teamLogo: {
    width: 20,
    height: 20,
    marginRight: 5
  },
  textBold: {
    fontWeight: 'bold'
  },
  teamStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1
  }
});
