import React from 'react'
import {
  AsyncStorage,
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import { getClientUsrs, doLogout } from '../actions'
import styles from '../styles'

class ClientUsers extends React.Component {
  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    this.props.getClientUsrs()
  }

  async handleDefaultUserLogout(navigation) {
    try {
      await AsyncStorage.removeItem('token')
      navigation.navigate('Login')
      this.props.dispatch(this.props.dispatch(doLogout()))
    } catch (err) {
      console.log(`The error is: ${err}`)
    }
  }

  render() {
    const { clientusers, refreshing, navigation } = this.props

    return (
      <View
        style={[styles.container]}
        refreshControl={<RefreshControl refreshing={refreshing} />}
      >
        <View style={[{ position: 'absolute', top: 0 }]}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/logo.png')
                : require('../assets/images/logo.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View
          style={[
            {
              width: '100%',
              position: 'absolute',
              top: 0
            }
          ]}
        >
          <TouchableHighlight>
            <Text
              style={{ textAlign: 'right', color: '#f18d1a', marginTop: 12 }}
              onPress={() => this.handleDefaultUserLogout(navigation)}
            >
              Logout
            </Text>
          </TouchableHighlight>
        </View>

        <View style={{ marginTop: 80 }}>
          <FlatList
            data={clientusers}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  margin: 1,
                  marginBottom: 30
                }}
              >
                <Text
                  style={{
                    backgroundColor: '#f1f1f1',
                    width: 44,
                    height: 44,
                    borderRadius: 44,
                    textAlign: 'center',
                    lineHeight: 44
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('ClientUserLogin', {
                      clientusersName: item.username,
                      defaultUser: item.defaultUser
                    })
                  }
                >
                  {item.username[0].toUpperCase()}
                </Text>
                <Text style={{ marginLeft: 60, marginTop: -30 }}>
                  {item.nickname != null ? item.nickname : item.username}
                </Text>
              </View>
            )}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  clientusers: state.clientusers.data.users
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  getClientUsrs: () => {
    dispatch(getClientUsrs())
  },
  doLoggedOut: () => {
    dispatch(doLogout())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientUsers)
