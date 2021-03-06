import React from 'react'
import {Field, formValueSelector, reduxForm} from 'redux-form'
import {Text, TouchableOpacity, View} from 'react-native'
import {isRequired} from '../validators'
import InputText from '../components/InputText'
import styles from '../styles'
import {LocaleContext} from '../locales/LocaleContext'
import {RenderRadioBtnMulti} from '../components/RadioItem'
import {printMessage} from "../helpers/printerActions";
import {connect} from "react-redux";
import {successMessage, warningMessage} from "../constants/Backend";
import {StyledText} from "../components/StyledText";
import DeleteBtn from '../components/DeleteBtn'

class PrinterForm extends React.Component {
  static navigationOptions = {
    header: null
  }
  static contextType = LocaleContext

  constructor(props, context) {
    super(props, context)

    context.localize({
      en: {
        editPrinterTitle: 'Edit Printer',
        addPrinterTitle: 'Add Printer',
        printerName: 'Printer Name',
        ipAddress: 'IP Address',
        serviceType: {
          title: 'Service Type',
          workingArea: 'Working Area',
          checkout: 'Checkout'
        },
        testPrint: 'Test Printer'
      },
      zh: {
        editPrinterTitle: '編輯出單機',
        addPrinterTitle: '新增出單機',
        printerName: '出單機名稱',
        ipAddress: 'IP地址',
        serviceType: {
          title: '綁定區域',
          workingArea: '工作區',
          checkout: '結帳區'
        },
        testPrint: '測試出單機'
      }
    })
  }

  handleTestPrint = (ipAddress) => {
    printMessage(null, ipAddress, () => {
      successMessage('Test printer succeeded')

    }, () => {
      warningMessage("Test printer failed. Please check printer's IP address")
    }
    )
  }

  render() {
    const {handleSubmit, isEdit, handleEditCancel, ipAddress} = this.props
    const {t} = this.context

    return (
      <View style={styles.flex(1)}>
        <View>
          <View style={styles.tableRowContainerWithBorder}>
            <View style={[styles.tableCellView, styles.flex(1)]}>
              <StyledText style={styles.fieldTitle}>{t('printerName')}</StyledText>
            </View>
            <View style={[styles.tableCellView, styles.justifyRight]}>
              <Field
                name="name"
                component={InputText}
                type="text"
                validate={[isRequired]}
                placeholder={t('printerName')}
              />
            </View>
          </View>

          <View style={styles.tableRowContainerWithBorder}>
            <View style={[styles.tableCellView, styles.flex(1)]}>
              <StyledText style={styles.fieldTitle}>{t('ipAddress')}</StyledText>
            </View>
            <View style={[styles.tableCellView, styles.justifyRight]}>
              <Field
                name="ipAddress"
                component={InputText}
                validate={isRequired}
                placeholder={t('ipAddress')}
                keyboardType="numeric"
                onChange={(value) => this.setState({ipAddress: value})}
              />
            </View>
          </View>

          <View style={[styles.sectionTitleContainer]}>
            <StyledText style={styles.sectionTitleText}>{t('serviceType.title')}</StyledText>
          </View>

          <View style={[styles.tableRowContainerWithBorder, styles.verticalPadding]}>
            <Field
              name="serviceTypes"
              component={RenderRadioBtnMulti}
              customValue="WORKING_AREA"
              optionName={t('serviceType.workingArea')}
            />
          </View>

          <View style={[styles.tableRowContainerWithBorder, styles.verticalPadding]}>
            <Field
              name="serviceTypes"
              component={RenderRadioBtnMulti}
              customValue="CHECKOUT"
              optionName={t('serviceType.checkout')}
            />
          </View>
        </View>

        <View style={[styles.bottom, styles.horizontalMargin]}>
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={[styles.bottomActionButton, styles.actionButton]}>
              {isEdit ? t('action.update') : t('action.save')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.handleTestPrint(ipAddress)}}>
            <Text style={[styles.bottomActionButton, styles.actionButton]}>
              {t('testPrint')}
            </Text>
          </TouchableOpacity>
          {isEdit ? (
            <>
              <TouchableOpacity onPress={handleEditCancel}>
                <Text style={[styles.bottomActionButton, styles.cancelButton]}>
                  {t('action.cancel')}
                </Text>
              </TouchableOpacity>
              <DeleteBtn handleDeleteAction={handleSubmit(data => {
                this.props?.handleDelete(data)
              })} />
            </>
          ) : (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('PrinternKDS')}
              >
                <Text style={[styles.bottomActionButton, styles.cancelButton]}>
                  {t('action.cancel')}
                </Text>
              </TouchableOpacity>
            )}
        </View>
      </View>
    )
  }
}

PrinterForm = reduxForm({
  form: 'printerForm'
})(PrinterForm)

/**
 * Reference: https://redux-form.com/8.3.0/examples/selectingformvalues/
 */
const selector = formValueSelector('printerForm')
PrinterForm = connect(state => {
  const ipAddress = selector(state, 'ipAddress')

  return {
    ipAddress
  }
})(PrinterForm);

export default PrinterForm
