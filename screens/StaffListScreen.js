import React from 'react'
import {Text, View} from 'react-native'
import {connect} from 'react-redux'
import StaffRow from './StaffRow'
import styles from '../styles'
import LoadingScreen from "./LoadingScreen";
import BackendErrorScreen from "./BackendErrorScreen";

export const StaffListScreen = ({
  isLoading,
  haveError,
  clientusers,
  navigation
}) => {
  if (isLoading) {
    return (
      <LoadingScreen/>
    )
  } else if (haveError) {
    return (
      <BackendErrorScreen/>
    )
  } else if (clientusers.length === 0) {
    return (
      <View style={[styles.container]}>
        <Text>no clientusers ...</Text>
      </View>
    )
  }
  return <StaffRow clientusers={clientusers} navigation={navigation} />
}

const mapDispatchToProps = dispatch => ({
  dispatch,
  doLogout: () => {
    dispatch(doLogout())
  }
})

export default connect(
  null,
  mapDispatchToProps
)(StaffListScreen)
