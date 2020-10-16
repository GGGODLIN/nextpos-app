import React from 'react'
import {Alert, Text, TouchableOpacity, View} from 'react-native'
import {SwipeListView} from 'react-native-swipe-list-view'
import {connect} from 'react-redux'
import {clearOrder, getfetchOrderInflights, getOrder, getOrdersByDateRange} from '../actions'
import AddBtn from '../components/AddBtn'
import Icon from 'react-native-vector-icons/Ionicons'
import DeleteBtn from '../components/DeleteBtn'
import {api, dispatchFetchRequest, dispatchFetchRequestWithOption, warningMessage} from '../constants/Backend'
import styles, {mainThemeColor} from '../styles'
import {LocaleContext} from '../locales/LocaleContext'
import {CheckBox, Tooltip} from 'react-native-elements'
import ScreenHeader from "../components/ScreenHeader";
import OrderTopInfo from "./OrderTopInfo";
import {handleDelete, handleOrderSubmit, renderChildProducts, renderOptionsAndOffer} from "../helpers/orderActions";
import NavigationService from "../navigation/NavigationService";
import {withContext} from "../helpers/contextHelper";
import {compose} from "redux";
import {StyledText} from "../components/StyledText";

class OrdersSummaryRow extends React.Component {
  static contextType = LocaleContext

  constructor(props, context) {
    super(props, context)

    context.localize({
      en: {
        orderSummaryTitle: 'Order Summary',
        stateTip: {
          open: {
            display: 'Open',
            note: 'Order is open'
          },
          inProcess: {
            display: 'Prep',
            note: 'Preparing order'
          },
          prepared: {
            display: 'Prepared',
            note: 'order prepared'
          },
          delivered: {
            display: 'Deliver',
            note: 'Order is delivered'
          },
          settled: {
            display: 'Paid',
            note: 'Order is paid'
          }
        },
        deliverAllLineItems: 'Confirm to deliver all line items',
        lineItemCountCheck: 'At least one item is needed to submit an order.',
        submitOrder: 'Submit',
        backToTables: 'Back to Tables',
        deleteOrder: 'Delete',
        selectItemToDeliver: 'Please select a line item to deliver',
        deliverOrder: 'Deliver',
        payOrder: 'Payment',
        splitBill: 'Split Bill',
        completeOrder: 'Complete'
      },
      zh: {
        orderSummaryTitle: '訂單總覽',
        stateTip: {
          open: {
            display: '開單',
            note: '開啟了訂單'
          },
          inProcess: {
            display: '準備中',
            note: '訂單已送出準備中'
          },
          prepared: {
            display: '準備完成',
            note: '訂單已準備完成'
          },
          delivered: {
            display: '已送餐',
            note: '訂單已送達'
          },
          settled: {
            display: '已結帳',
            note: '訂單已付款完畢'
          }
        },
        deliverAllLineItems: '確認所有品項送餐',
        lineItemCountCheck: '請加一個以上的產品到訂單裡.',
        submitOrder: '送單',
        backToTables: '回到座位區',
        deleteOrder: '刪除',
        selectItemToDeliver: '請選擇品項送餐',
        deliverOrder: '送餐完畢',
        payOrder: '付款',
        splitBill: '拆帳',
        completeOrder: '結束訂單'
      }
    })

    this.state = {
      orderLineItems: {}
    }

    console.debug(`order summary order id: ${this.props.order.orderId}`)
  }

  toggleOrderLineItem = (lineItemId) => {
    const lineItem = this.state.orderLineItems.hasOwnProperty(lineItemId) ? this.state.orderLineItems[lineItemId] : {
      checked: false,
      value: lineItemId
    }
    lineItem.checked = !lineItem.checked

    const lineItems = this.state.orderLineItems
    lineItems[lineItemId] = lineItem

    this.setState({orderLineItems: lineItems})
  }

  renderStateToolTip = (state, t) => {
    const tooltip = (
      <View>
        <Text>
          {t('stateTip.open.display')}: {t('stateTip.open.note')}
        </Text>
        <Text>
          {t('stateTip.inProcess.display')}: {t('stateTip.inProcess.note')}
        </Text>
        <Text>
          {t('stateTip.delivered.display')}: {t('stateTip.delivered.note')}
        </Text>
        <Text>
          {t('stateTip.settled.display')}: {t('stateTip.settled.note')}
        </Text>
      </View>
    )

    return (
      <Tooltip popover={tooltip} height={120} width={200} backgroundColor={mainThemeColor}>
        <View>
          {state === 'OPEN' && <StyledText>{t('stateTip.open.display')}</StyledText>}
          {['IN_PROCESS', 'ALREADY_IN_PROCESS'].includes(state) && (
            <StyledText>{t('stateTip.inProcess.display')}</StyledText>
          )}
          {state === 'DELIVERED' && (
            <StyledText>{t('stateTip.delivered.display')}</StyledText>
          )}
          {state === 'SETTLED' && <StyledText>{t('stateTip.settled.display')}</StyledText>}
        </View>
      </Tooltip>
    )
  }

  handleCancel = orderId => {
    this.props.clearOrder(orderId)
    this.props.navigation.navigate('TablesSrc')
  }

  handleDeleteLineItem = (orderId, lineItemId) => {
    dispatchFetchRequest(api.order.deleteLineItem(orderId, lineItemId), {
      method: 'DELETE',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    }, response => {
      this.props.navigation.navigate('OrdersSummary')
      this.props.getOrder(this.props.order.orderId)
    }).then()
  }

  handleDeliver = id => {
    const lineItemIds = []

    Object.keys(this.state.orderLineItems).map(id => {
      const orderLineItem = this.state.orderLineItems[id];
      if (orderLineItem.checked) {
        lineItemIds.push(orderLineItem.value)
      }
    })

    if (lineItemIds.length === 0) {
      const formData = new FormData()
      formData.append('action', 'DELIVER')

      Alert.alert(
        `${this.context.t('action.confirmMessageTitle')}`,
        `${this.context.t('deliverAllLineItems')}`,
        [
          {
            text: `${this.context.t('action.yes')}`,
            onPress: () => {
              dispatchFetchRequest(api.order.process(id), {
                method: 'POST',
                withCredentials: true,
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: formData
              },
                response => {
                  this.props.navigation.navigate('TablesSrc')
                }).then()
            }
          },
          {
            text: `${this.context.t('action.no')}`,
            onPress: () => console.log('Cancelled'),
            style: 'cancel'
          }
        ]
      )
    } else {
      dispatchFetchRequest(api.order.deliverLineItems(id), {
        method: 'POST',
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({lineItemIds: lineItemIds})
      },
        response => {
          this.props.navigation.navigate('TablesSrc')
        }).then()
    }
  }

  handleComplete = id => {
    const formData = new FormData()
    formData.append('action', 'COMPLETE')

    dispatchFetchRequestWithOption(api.order.process(id), {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      headers: {},
      body: formData
    }, {
      defaultMessage: false
    }, response => {
      this.props.navigation.navigate('TablesSrc')
      this.props.getfetchOrderInflights()
      this.props.clearOrder(id)
      this.props.getOrdersByDateRange()
    }).then()
  }

  deleteSplitOrder = async (sourceOrderId, splitOrderId) => {
    const formData = new FormData()
    formData.append('sourceOrderId', sourceOrderId)
    await dispatchFetchRequestWithOption(api.splitOrder.delete(splitOrderId), {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    }, {
      defaultMessage: false
    }, response => {
      response?.json().then(data => {
        this.props.getOrder()
      })
    }).then()
  }

  render() {
    const {
      products = [],
      labels = [],
      navigation,
      haveData,
      haveError,
      isLoading,
      label,
      order,
      initialValues,
      themeStyle
    } = this.props

    const {t, splitParentOrderId} = this.context

    return (
      <View style={styles.fullWidthScreen}>
        <View style={{flex: 1}}>
          <ScreenHeader backNavigation={true}
            parentFullScreen={true}
            backAction={() => this.handleCancel(order.orderId)}
            title={t('orderSummaryTitle')}
            rightComponent={
              order.state !== 'SETTLED' && (
                <AddBtn
                  onPress={() =>
                    this.props.navigation.navigate('OrderFormII', {
                      orderId: order.orderId
                    })
                  }
                />
              )
            }
          />

          <OrderTopInfo order={order} />

          <View style={[styles.sectionBar]}>
            <View style={[styles.tableCellView, {flex: 6}]}>
              <TouchableOpacity>
                <Text style={styles.sectionBarTextSmall}>
                  {t('order.product')}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.tableCellView, {flex: 2}]}>
              <TouchableOpacity>
                <Text style={styles.sectionBarTextSmall}>
                  {t('order.quantity')}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.tableCellView, {flex: 3}]}>
              <TouchableOpacity>
                <Text style={styles.sectionBarTextSmall}>{t('order.unitPrice')}</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.tableCellView, {flex: 3}]}>
              <TouchableOpacity>
                <Text style={styles.sectionBarTextSmall}>{t('order.subtotal')}</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.tableCellView, {flex: 2, justifyContent: 'flex-end'}]}>
              <TouchableOpacity>
                <Text style={styles.sectionBarTextSmall}>{t('order.lineState')}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <SwipeListView
              data={order.lineItems}
              renderItem={(data, rowMap) => (
                <View style={[styles.rowFront, themeStyle]}>
                  <View key={rowMap} style={{marginBottom: 15}}>
                    <View style={styles.tableRowContainer}>
                      <View style={[styles.tableCellView, {flex: 6}]}>
                        {['IN_PROCESS', 'ALREADY_IN_PROCESS'].includes(data.item.state) && (
                          <CheckBox
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            center={true}
                            size={20}
                            containerStyle={{borderWidth: 0, flex: 1, padding: 0, margin: 0}}
                            checked={this.state.orderLineItems[data.item.lineItemId] !== undefined && this.state.orderLineItems[data.item.lineItemId].checked}
                            onIconPress={() => this.toggleOrderLineItem(data.item.lineItemId)}
                          />
                        )}
                        <View style={{flex: 5}}>
                          <StyledText style={{textAlign: 'left'}}>
                            {data.item.productName}
                          </StyledText>
                        </View>
                      </View>

                      <View style={[styles.tableCellView, {flex: 2}]}>
                        <StyledText>{data.item.quantity}</StyledText>
                      </View>

                      <View style={[styles.tableCellView, {flex: 3}]}>
                        <StyledText>${data.item.price}</StyledText>
                      </View>

                      <View style={[styles.tableCellView, {flex: 3}]}>
                        <StyledText>${data.item.lineItemSubTotal}</StyledText>
                      </View>
                      <View style={[styles.tableCellView, styles.justifyRight, {flex: 2}]}>
                        {this.renderStateToolTip(data.item.state, t)}
                      </View>
                    </View>
                    <View>
                      <View style={{marginLeft: 15}}>
                        {renderChildProducts(data.item)}
                      </View>
                      <View style={{marginLeft: 15}}>
                        {renderOptionsAndOffer(data.item)}
                      </View>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(data, rowMap) => rowMap.toString()}
              renderHiddenItem={(data, rowMap) => {
                return (
                  <View style={[styles.rowBack, themeStyle]} key={rowMap}>
                    <View style={{width: '60%'}}>

                    </View>
                    <View style={styles.editIcon}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('OrderFormIII', {
                            prdId: data.item.productId,
                            orderId: this.props.navigation.state.params.orderId,
                            lineItem: data.item
                          })
                        }>
                        <Icon
                          name="md-create"
                          size={30}
                          color="#fff"

                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.delIcon}>
                      <DeleteBtn
                        handleDeleteAction={(orderId, lineItemId) =>
                          this.handleDeleteLineItem(
                            order.orderId,
                            data.item.lineItemId
                          )
                        }
                        islineItemDelete={true}
                      />
                    </View>
                  </View>
                )
              }}
              leftOpenValue={0}
              rightOpenValue={-150}
            />
          </View>

          <View>
            <View style={[styles.tableRowContainerWithBorder]}>
              <View style={[styles.tableCellView, {flex: 1}]}>
                <StyledText>{t('order.discount')}</StyledText>
              </View>
              <View style={[styles.tableCellView, {flex: 1, justifyContent: 'flex-end'}]}>
                <StyledText>
                  ${order.discount}
                </StyledText>
              </View>
            </View>

            <View style={[styles.tableRowContainerWithBorder]}>
              <View style={[styles.tableCellView, {flex: 1}]}>
                <StyledText>{t('order.serviceCharge')}</StyledText>
              </View>
              <View style={[styles.tableCellView, {flex: 1, justifyContent: 'flex-end'}]}>
                <StyledText>
                  ${order.serviceCharge}
                </StyledText>
              </View>
            </View>

            <View style={[styles.tableRowContainerWithBorder]}>
              <View style={[styles.tableCellView, {flex: 1}]}>
                <StyledText>{t('order.total')}</StyledText>
              </View>
              <View style={[styles.tableCellView, {flex: 1, justifyContent: 'flex-end'}]}>
                <StyledText>
                  ${order.orderTotal}
                </StyledText>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.bottom, styles.horizontalMargin]}>
          {['OPEN', 'IN_PROCESS', 'DELIVERED'].includes(order.state) && (
            <TouchableOpacity
              onPress={() =>
                order.lineItems.length === 0
                  ? warningMessage(t('lineItemCountCheck'))
                  : handleOrderSubmit(order.orderId)
              }
            >
              <Text style={[styles.bottomActionButton, styles.actionButton]}>
                {t('submitOrder')}
              </Text>
            </TouchableOpacity>
          )}

          {!['SETTLED', 'REFUNDED'].includes(order.state) && (
            <DeleteBtn
              handleDeleteAction={() => handleDelete(order.orderId, () => NavigationService.navigate('TablesSrc'))}
            />
          )}

          {["IN_PROCESS"].includes(order.state) && (
            <TouchableOpacity
              onPress={() => {
                this.handleDeliver(order.orderId)
              }}
            >
              <Text style={[styles.bottomActionButton, styles.secondActionButton]}>{t('deliverOrder')}</Text>
            </TouchableOpacity>

          )}

          {order.state === 'DELIVERED' && (
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, marginRight: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    if (splitParentOrderId === null || splitParentOrderId === order?.orderId) {
                      this.props.navigation.navigate('SpiltBillScreen', {
                        order: order
                      })
                    }
                    else {
                      Alert.alert(
                        `${t('splittingCheck')}`,
                        ``,
                        [
                          {
                            text: `${this.context.t('action.yes')}`,
                            onPress: async () => {
                              await this.deleteSplitOrder(this.context?.splitParentOrderId, this.context?.splitOrderId)
                              await this.context?.saveSplitOrderId('delete')
                              await this.context?.saveSplitParentOrderId('delete')
                              this.props.navigation.navigate('SpiltBillScreen', {
                                order: order
                              })
                            }
                          },
                          {
                            text: `${this.context.t('action.no')}`,
                            onPress: () => console.log('Cancelled'),
                            style: 'cancel'
                          }
                        ]
                      )
                    }
                  }
                  }
                >
                  <Text style={[styles.bottomActionButton, styles.secondActionButton]}>{t('splitBill')}</Text>
                </TouchableOpacity></View>
              <View style={{flex: 1}}>
                <TouchableOpacity
                  onPress={() =>
                    order.lineItems.length === 0
                      ? warningMessage(t('lineItemCountCheck'))
                      : this.props.navigation.navigate('Payment', {
                        order: order
                      })
                  }
                >
                  <Text style={[styles.bottomActionButton, styles.secondActionButton]}>{t('payOrder')}</Text>
                </TouchableOpacity></View>
            </View>

          )}


          {order.state === 'SETTLED' && (
            <TouchableOpacity
              onPress={() => this.handleComplete(order.orderId)}
            >
              <Text style={[styles.bottomActionButton, styles.secondActionButton]}>{t('completeOrder')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  clearOrder: () => dispatch(clearOrder(props.order.orderId)),
  getOrder: id => dispatch(getOrder(id)),
  getfetchOrderInflights: () => dispatch(getfetchOrderInflights()),
  getOrdersByDateRange: () => dispatch(getOrdersByDateRange())
})

const enhance = compose(
  connect(null, mapDispatchToProps),
  withContext
)
export default enhance(OrdersSummaryRow)
