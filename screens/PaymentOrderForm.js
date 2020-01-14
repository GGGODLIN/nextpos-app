import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { getProducts, getLables, getLabel } from '../actions'
import { successMessage } from '../constants/Backend'
import BackBtn from '../components/BackBtn'
import InputText from '../components/InputText'
import { isRequired } from '../validators'
import { DismissKeyboard } from '../components/DismissKeyboard'
import styles from '../styles'
import { LocaleContext } from '../locales/LocaleContext'

class PaymentOrderForm extends React.Component {
  static navigationOptions = {
    header: null
  }
  static contextType = LocaleContext

  constructor(props, context) {
    super(props, context)

    context.localize({
      en: {
        paymentMethodTitle: 'Payment Method',
        totalAmount: 'Total Amount',
        cash: 'Cash',
        enterCash: 'Enter Cash',
        taxIDNumber: 'Tax ID Number',
        enterTaxIDNumber: 'Enter Tax ID Number',
        charge: 'Charge'
      },
      zh: {
        paymentMethodTitle: '付費方式',
        totalAmount: '總金額',
        cash: '現金',
        enterCash: '輸入現金',
        taxIDNumber: '統一編號',
        enterTaxIDNumber: '輸入統一編號',
        charge: '結帳'
      }
    })

    this.state = {
      t: context.t
    }
  }

  render() {
    const moneyAmts = [
      {
        label: '100',
        value: 100
      },
      {
        label: '500',
        value: 500
      },
      {
        label: '1000',
        value: 1000
      },
      {
        label: '2000',
        value: 2000
      }
    ]

    const {
      reset,
      handleSubmit,
      order,
      navigation,
      discountTotal,
      clearOrder,
      getOrder,
      initialize,
      addNum,
      dynamicTotal
    } = this.props

    const { t } = this.state

    return (
      <ScrollView>
        <View
          style={{
            marginTop: 62,
            marginLeft: 35,
            marginRight: 35,
            marginBottom: 30
          }}
        >
          <BackBtn />
          <Text
            style={[
              styles.welcomeText,
              styles.orange_color,
              styles.textMedium,
              styles.textBold
            ]}
          >
            {t('paymentMethodTitle')}
          </Text>

          <View
            style={[
              styles.flex_dir_row,
              styles.paddingTopBtn20,
              styles.borderBottomLine
            ]}
          >
            <View style={{ width: '90%' }}>
              <Text
                style={[styles.textBold, styles.textBig, styles.orange_color]}
              >
                {order.tableInfo.tableName}
              </Text>
            </View>

            <View>
              <Text style={styles.textBold}>split</Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.orange_bg,
            styles.flex_dir_row,
            styles.shoppingBar,
            styles.top40,
            {
              paddingLeft: 35,
              paddingRight: 35,
              paddingTop: 12
            }
          ]}
        >
          <View style={[styles.half_width]}>
            <Text style={[styles.textMedium, styles.whiteColor]}>
              {t('totalAmount')}
            </Text>
          </View>

          <View style={[styles.half_width, styles.orange_color]}>
            <Text
              style={[
                { textAlign: 'right', marginRight: -26 },
                styles.textBold,
                styles.whiteColor,
                styles.textMedium
              ]}
            >
              $&nbsp;{discountTotal.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={[styles.container, styles.no_mgrTop]}>
          <View style={[styles.jc_alignIem_center, styles.flex_dir_row]}>
            <View style={[styles.onethirdWidth, styles.mgrtotop8]}>
              <Text>{t('cash')}</Text>
            </View>
            <View style={[styles.onesixthWidth]}>
              <Field
                name="cash"
                component={InputText}
                placeholder={t('enterCash')}
                keyboardType={'numeric'}
              />
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row'
            }}
          >
            {moneyAmts.map((moneyAmt, ix) => (
              <TouchableOpacity
                onPress={() => {
                  addNum(moneyAmt.value)
                }}
                key={moneyAmt.value}
              >
                <View
                  style={{
                    width: 62,
                    height: 50,
                    borderWidth: 2,
                    borderColor: '#f18d1a',
                    marginRight: 17,
                    paddingTop: 16
                  }}
                >
                  <Text
                    style={[
                      styles.orange_color,
                      styles.textBold,
                      styles.centerText
                    ]}
                  >
                    {moneyAmt.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={[styles.jc_alignIem_center, styles.flex_dir_row]}>
            <View style={[styles.onethirdWidth, styles.mgrtotop8]}>
              {/*<Text>{t('clientName')}</Text>*/}
              <Text>{t('taxIDNumber')}</Text>
            </View>
            <View style={[styles.onesixthWidth]}>
              <Field
                name="idnumber"
                component={InputText}
                placeholder={t('enterTaxIDNumber')}
                keyboardType={'numeric'}
              />
            </View>
          </View>

          <View style={[styles.mgrtotop20]}>
            <TouchableOpacity onPress={() => handleSubmit()}>
              <Text style={[styles.bottomActionButton, styles.actionButton]}>
                {t('charge')}
              </Text>
            </TouchableOpacity>

            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Payment')}
              >
                <Text style={[styles.bottomActionButton, styles.cancelButton]}>
                  {t('action.cancel')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, props) => ({
  initialValues: { cash: '' + props.dynamicTotal }
})

export default connect(
  mapStateToProps,
  null
)(
  reduxForm({
    form: 'paymentorderForm',
    enableReinitialize: true
  })(PaymentOrderForm)
)