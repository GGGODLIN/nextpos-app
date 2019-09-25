import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableHighlight,
  TextInput,
  AsyncStorage
} from 'react-native'
import { encode as btoa } from 'base-64'
import Icon from 'react-native-vector-icons/Ionicons'
import PinCodeInput from '../components/PinCodeInput'
import { DismissKeyboard } from '../components/DismissKeyboard'
import styles from '../styles'

class ClientUserLoginForm extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    isAuthClientUser: false
  }

  clientLogin = passWord => {
    AsyncStorage.getItem('token', (err, value) => {
      if (err) {
        console.log(err)
      } else {
        return JSON.parse(value)
      }
    })
      .then(val => {
        var tokenObj = JSON.parse(val)
        var username = tokenObj.cli_userName
        var masterPassword = tokenObj.cli_masterPwd

        const formData = new FormData()
        formData.append('grant_type', 'password')
        formData.append('username', this.props.clientusersName)
        formData.append('password', passWord)

        var auth = 'Basic ' + btoa(username + ':' + masterPassword)
        fetch('http://35.234.63.193/oauth/token', {
          method: 'POST',
          withCredentials: true,
          credentials: 'include',
          headers: {
            Authorization: auth
          },
          body: formData
        })
          .then(response => response.json())
          .then(res => {
            if (passWord.length === 4 && res.error) {
              alert(res.error)
            } else {
              var clientusrTokenexpiration = new Date().setSeconds(
                new Date().getSeconds() + parseInt(res.expires_in)
              )
              res.clientusrTokenExp = clientusrTokenexpiration
              AsyncStorage.setItem('clientusrToken', JSON.stringify(res))

              AsyncStorage.getItem('clientusrToken', (err, value) => {
                if (err) {
                  console.log(err)
                } else {
                  return JSON.parse(value)
                }
              }).then(val => {
                var tokenObj = JSON.parse(val)
                var accessToken = tokenObj.refresh_token
                if (accessToken !== null && passWord.length === 4) {
                  this.props.navigation.navigate('LoginSuccess', {
                    isAuthClientUser: true,
                    clientusersName: this.props.clientusersName
                  })
                }
              })
            }
            return res
          })
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  }

  render() {
    const { clientusersName } = this.props

    return (
      <DismissKeyboard>
        <View style={styles.container}>
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

          <Text
            style={[
              styles.welcomeText,
              styles.orange_color,
              styles.marginTop40
            ]}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon name="ios-arrow-back" size={26} color="#f18d1a" />
          </Text>

          <Text
            style={[
              styles.welcomeText,
              styles.orange_color,
              styles.textMedium,
              styles.mgrBtm50
            ]}
          >
            Hello{' '}
            {`${clientusersName[0].toUpperCase()}${clientusersName.slice(1)}`}
          </Text>

          <Field
            name="encryptedPassword"
            component={PinCodeInput}
            onChange={val => this.clientLogin(val)}
            customHeight={71}
          />
        </View>
      </DismissKeyboard>
    )
  }
}

const mapStateToProps = state => ({
  csState: state,
  isLoggedIn: state.auth.isLoggedIn
})

ClientUserLoginForm = reduxForm({
  form: 'ClientUserLoginForm'
})(ClientUserLoginForm)

export default ClientUserLoginForm