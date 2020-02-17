import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { connect } from 'react-redux'
import { ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { DismissKeyboard } from '../components/DismissKeyboard'
import BackBtn from '../components/BackBtn'
import DeleteBtn from '../components/DeleteBtn'
import InputText from '../components/InputText'
import RenderPureCheckBox from '../components/rn-elements/PureCheckBox'
import { getAnnouncements } from '../actions'
import {
  api,
  errorAlert,
  makeFetchRequest,
  dispatchFetchRequest,
  successMessage
} from '../constants/Backend'
import AnnouncementsForm from './AnnouncementsForm'
import styles from '../styles'
import {LocaleContext} from "../locales/LocaleContext";

class AnnouncementsAdd extends React.Component {
  static navigationOptions = {
    header: null
  }
  static contextType = LocaleContext

  handleSubmit = values => {
    dispatchFetchRequest(
      api.announcements.create,
      {
        method: 'POST',
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      },
      response => {
        successMessage('Saved')
        this.props.navigation.navigate('Announcements')
        this.props.getAnnouncements()
      }
    ).then()
  }

  render() {
    const { navigation } = this.props
    const { t } = this.context

    return (
      <ScrollView>
        <DismissKeyboard>
          <View style={styles.container}>
            <BackBtn />
            <Text
              style={[
                styles.welcomeText,
                styles.orange_color,
                styles.textMedium,
                styles.textBold
              ]}
            >
              {t('newAnnouncementTitle')}
            </Text>
            <AnnouncementsForm
              onSubmit={this.handleSubmit}
              navigation={navigation}
            />
          </View>
        </DismissKeyboard>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  /* printers: state.printers.data.printers,
  workingareas: state.workingareas.data.workingAreas*/
})
const mapDispatchToProps = dispatch => ({
  dispatch,
  getAnnouncements: () => dispatch(getAnnouncements())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnnouncementsAdd)

// export default AnnouncementsAdd