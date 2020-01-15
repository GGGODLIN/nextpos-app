import React from 'react'
import {connect} from 'react-redux'
import {ScrollView, Text, View, ActivityIndicator} from 'react-native'
import {DismissKeyboard} from '../components/DismissKeyboard'
import BackBtn from '../components/BackBtn'
import AddBtn from '../components/AddBtn'
import PrinterForm from '../screens/PrinterForm'
import {
  getWorkingAreas,
  getPrinters,
  getPrinter,
  clearPrinter
} from '../actions'
import {
  api,
  errorAlert,
  makeFetchRequest,
  successMessage
} from '../constants/Backend'
import styles from '../styles'
import {LocaleContext} from "../locales/LocaleContext";

class PrinterEdit extends React.Component {
  static navigationOptions = {
    header: null
  }
  static contextType = LocaleContext

  constructor(props, context) {
    super(props, context)

    this.state = {
      t: context.t
    }
  }


  componentDidMount() {
    this.props.getPrinter(
      this.props.navigation.state.params.customId == undefined
        ? this.props.navigation.state.params.id
        : this.props.navigation.state.params.customId
    )
  }

  handleUpdate = values => {
    var id = values.id
    makeFetchRequest(token => {
      fetch(api.printer.update + `${id}`, {
        method: 'POST',
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.access_token
        },
        body: JSON.stringify(values)
      })
        .then(response => {
          if (response.status === 200) {
            successMessage('Saved')
            this.props.navigation.navigate('PrinternKDS')
            this.props.getWorkingAreas()
            this.props.getPrinters()
          } else {
            errorAlert(response)
          }
        })
        .catch(error => {
          console.error(error)
        })
    })
  }

  handleEditCancel = () => {
    this.props.clearPrinter()
    this.props.getWorkingAreas()
    this.props.navigation.navigate('PrinternKDS')
  }

  render() {
    const {navigation, printer, loading, haveData, haveError} = this.props
    const {t} = this.state

    if (loading) {
      return (
        <View style={[styles.container]}>
          <ActivityIndicator size="large" color="#ccc"/>
        </View>
      )
    } else if (haveError) {
      return (
        <View style={[styles.container]}>
          <Text>Err during loading, check internet conn...</Text>
        </View>
      )
    }

    return (
      <DismissKeyboard>
        <View style={styles.container_nocenterCnt}>
          <BackBtn/>
          <Text style={styles.screenTitle}>
            {t('editPrinterTitle')}
          </Text>
          <PrinterForm
            navigation={navigation}
            onSubmit={this.handleUpdate}
            isEdit={true}
            initialValues={printer}
            handleEditCancel={this.handleEditCancel}
          />
        </View>
      </DismissKeyboard>
    )
  }
}

const mapStateToProps = state => ({
  css: state,
  printer: state.printer.data,
  haveData: state.printer.haveData,
  haveError: state.printer.haveError,
  loading: state.printer.loading
})
const mapDispatchToProps = (dispatch, props) => ({
  dispatch,
  getPrinters: () => dispatch(getPrinters()),
  getWorkingAreas: () => dispatch(getWorkingAreas()),
  getPrinter: id => dispatch(getPrinter(id)),
  clearPrinter: () => dispatch(clearPrinter())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrinterEdit)
