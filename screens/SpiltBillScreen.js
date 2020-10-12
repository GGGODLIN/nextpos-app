import React from 'react'
import {reduxForm} from 'redux-form'
import {Alert, ScrollView, Text, TouchableOpacity, View, TouchableWithoutFeedback} from 'react-native'
import {connect} from 'react-redux'
import {Accordion, List} from '@ant-design/react-native'
import {getLables, getProducts, clearOrder, getfetchOrderInflights, getOrder, getOrdersByDateRange} from '../actions'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import styles, {mainThemeColor} from '../styles'
import {LocaleContext} from '../locales/LocaleContext'
import LoadingScreen from "./LoadingScreen";
import BackendErrorScreen from "./BackendErrorScreen";
import {api, dispatchFetchRequest, dispatchFetchRequestWithOption, successMessage, warningMessage} from '../constants/Backend'
import {ThemeContainer} from "../components/ThemeContainer";
import {StyledText} from "../components/StyledText";
import {ListItem} from "react-native-elements";
import {withContext} from "../helpers/contextHelper";
import {compose} from "redux";
import OrderItemDetailEditModal from './OrderItemDetailEditModal';
import OrderTopInfo from "./OrderTopInfo";
import DeleteBtn from '../components/DeleteBtn'
import NavigationService from "../navigation/NavigationService";
import {handleDelete, handleOrderSubmit, renderChildProducts, renderOptionsAndOffer} from "../helpers/orderActions";
import {SwipeRow} from 'react-native-swipe-list-view'
import ScreenHeader from "../components/ScreenHeader";
import Icon from 'react-native-vector-icons/FontAwesome'


class SpiltBillScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    static contextType = LocaleContext

    constructor(props, context) {
        super(props, context)

        context.localize({
            en: {
                SpiltBillScreenTitle: 'Spilt Bill',
            },
            zh: {
                SpiltBillScreenTitle: '拆帳',
            }
        })
        this.state = {

        }

    }

    componentDidMount() {
        console.log('SpiltBillScreen', this.props.order)
        // this.getXML(this.props.navigation.state.params?.transactionResponse?.transactionId)
        // this.getOnePrinter()
        // this.props.getWorkingAreas()
    }

    componentDidUpdate(prevProps, prevState) {

        // if (!this.state.isPrintFirst && !!this.state.printer && (!!this.state.invoiceXML || !!this.state.receiptXML)) {
        //     this.setState({isPrintFirst: true})
        //     if (!!this.state?.invoiceXML)
        //         this.handlePrint(this.state?.invoiceXML, this.state.printer.ipAddress, true)
        //     this.handlePrint(this.state?.receiptXML, this.state.printer.ipAddress, false)
        // }
    }

    getOnePrinter = () => {
        dispatchFetchRequest(
            api.printer.getOnePrinter,
            {
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                headers: {}
            },
            response => {
                response.json().then(data => {
                    this.setState({printer: data})
                })
            },
            response => {
                console.warn('getOnePrinter ERROR')
            }
        ).then()


    }

    getXML = (transactionId) => {
        dispatchFetchRequestWithOption(api.payment.getTransaction(transactionId), {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        }, {
            defaultMessage: false
        }, response => {
            response.json().then(data => {

                this.setState({receiptXML: data?.receiptXML, invoiceXML: data?.invoiceXML})
            })
        }).then()
    }

    handlePrint = (xml, ipAddress, isInvoice) => {
        if (isInvoice) {
            printMessage(xml, ipAddress, () => {
                this.setState({isInvoicePrint: true})

            }, () => {
                this.setState({isInvoicePrint: false})
            }
            )
        }
        else {
            printMessage(xml, ipAddress, () => {
                this.setState({isReceiptPrint: true})

            }, () => {
                this.setState({isReceiptPrint: false})
            }
            )
        }
    }

    addItem = (item) => {
        console.log('addItem', item)
        console.log('addItem2', this.props.navigation.state.params?.order)
        dispatchFetchRequestWithOption(api.splitOrder.new, {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sourceOrderId: this.props.navigation.state.params?.order?.orderId,
                sourceLineItemId: item?.lineItemId
            })
        }, {
            defaultMessage: false
        }, response => {

            response?.json().then(data => {
                this.props.getOrder()
                console.log('Back data', data)
            })
        }).then()
    }

    render() {
        const {
            products = [],
            labels = [],
            haveError,
            isLoading,
            order,
            themeStyle,

            productsData
        } = this.props
        const {reverseThemeStyle, t} = this.context

        if (this.context.isTablet) {
            return (
                <ThemeContainer>
                    <View style={[styles.container]}>
                        <ScreenHeader backNavigation={true}
                            title={t('SpiltBillScreenTitle')} />
                        <View style={{flexDirection: 'row', flex: 1}}>
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                marginTop: 8,
                                marginBottom: 5,
                            }}>
                                <View style={{flex: 7}}>
                                    <ScrollView style={{flex: 1}}>
                                        {order?.lineItems?.length > 0 ?
                                            order?.lineItems?.map((item, index) => {
                                                return (
                                                    <SwipeRow
                                                        leftOpenValue={50}
                                                        rightOpenValue={-50}
                                                        ref={(e) => this[`ref_${index}`] = e}
                                                    >
                                                        <View style={{flex: 1, marginBottom: '3%', borderRadius: 10, width: '100%', flexDirection: 'row'}}>
                                                            <View style={{flex: 1, borderRadius: 10}} >
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        this[`ref_${index}`]?.closeRow()
                                                                        if (item.price === 0) {
                                                                            this.handleFreeLineitem(order.orderId, item.lineItemId, false)
                                                                        } else {
                                                                            this.handleFreeLineitem(order.orderId, item.lineItemId, true)
                                                                        }
                                                                    }}
                                                                    style={{flex: 1, backgroundColor: mainThemeColor, borderRadius: 10, paddingLeft: 5, alignItems: 'flex-start', justifyContent: 'center'}}>
                                                                    <StyledText style={{width: 40}}>{item.price === 0 ? t('order.cancelFreeLineitem') : t('order.freeLineitem')}</StyledText>
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View style={{...styles.delIcon, flex: 1, borderRadius: 10}} >
                                                                <DeleteBtn
                                                                    handleDeleteAction={() => {
                                                                        this[`ref_${index}`]?.closeRow()
                                                                        this.handleDeleteLineItem(
                                                                            order.orderId,
                                                                            item.lineItemId
                                                                        );
                                                                    }}
                                                                    islineItemDelete={true}
                                                                    containerStyle={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'flex-end'}}
                                                                />
                                                            </View>
                                                        </View>

                                                        <TouchableOpacity style={[reverseThemeStyle, {marginBottom: '3%', borderRadius: 10}, (!!this.state?.choosenItem?.[item.lineItemId] && {backgroundColor: mainThemeColor})]}
                                                            activeOpacity={0.8}
                                                            onPress={() => {this.addItem(item)}}>
                                                            <View style={{aspectRatio: 1.5, alignItems: 'center', flexDirection: 'row'}}>
                                                                <View style={{flex: 2.5, flexDirection: 'column', paddingLeft: '3%'}}>
                                                                    <StyledText style={[{...reverseThemeStyle, fontSize: 16, fontWeight: 'bold'}, (!!this.state?.choosenItem?.[item.lineItemId] && {backgroundColor: mainThemeColor})]}>{item.productName} ${item.price}</StyledText>
                                                                    {!!item?.options && <StyledText style={[reverseThemeStyle, (!!this.state?.choosenItem?.[item.lineItemId] && {backgroundColor: mainThemeColor})]}>{item.options}</StyledText>}
                                                                    {!!item?.appliedOfferInfo && <StyledText style={[reverseThemeStyle, (!!this.state?.choosenItem?.[item.lineItemId] && {backgroundColor: mainThemeColor})]}>{` ${item?.appliedOfferInfo?.offerName}(${item?.appliedOfferInfo?.overrideDiscount})`}</StyledText>}
                                                                </View>
                                                                <View style={{flexDirection: 'column', flex: 1, paddingRight: '3%', justifyContent: 'space-around', height: '100%', alignItems: 'flex-end', borderLeftWidth: 1}} >
                                                                    {['IN_PROCESS', 'ALREADY_IN_PROCESS'].includes(item?.state) && <TouchableOpacity
                                                                        onPress={() => {
                                                                            this.setState({
                                                                                choosenItem: {...this.state?.choosenItem, [item.lineItemId]: !this.state?.choosenItem?.[item.lineItemId] ?? false}
                                                                            });
                                                                            this.toggleOrderLineItem(item.lineItemId);
                                                                        }}
                                                                    >
                                                                        <StyledText style={{...reverseThemeStyle, padding: 5, backgroundColor: 'gray', shadowColor: '#000', shadowOffset: {width: 1, height: 1}, shadowOpacity: 1}}>{t('choose')}</StyledText>
                                                                    </TouchableOpacity>}
                                                                    <View>
                                                                        {item?.state === 'OPEN' && <StyledText style={[reverseThemeStyle, (!!this.state?.choosenItem?.[item.lineItemId] && {backgroundColor: mainThemeColor})]}>{t('stateTip.open.display')}</StyledText>}
                                                                        {['IN_PROCESS', 'ALREADY_IN_PROCESS'].includes(item?.state) && (
                                                                            <StyledText style={[reverseThemeStyle, (!!this.state?.choosenItem?.[item.lineItemId] && {backgroundColor: mainThemeColor})]}>{t('stateTip.inProcess.display')}</StyledText>
                                                                        )}
                                                                        {item?.state === 'PREPARED' && <StyledText style={[reverseThemeStyle, (!!this.state?.choosenItem?.[item.lineItemId] && {backgroundColor: mainThemeColor})]}>{t('stateTip.prepared.display')}</StyledText>}
                                                                        {item?.state === 'DELIVERED' && (
                                                                            <StyledText style={[reverseThemeStyle, (!!this.state?.choosenItem?.[item.lineItemId] && {backgroundColor: mainThemeColor})]}>{t('stateTip.delivered.display')}</StyledText>
                                                                        )}
                                                                        {item?.state === 'SETTLED' && <StyledText style={[reverseThemeStyle, (!!this.state?.choosenItem?.[item.lineItemId] && {backgroundColor: mainThemeColor})]}>{t('stateTip.settled.display')}</StyledText>}
                                                                    </View>
                                                                    <StyledText style={[reverseThemeStyle, (!!this.state?.choosenItem?.[item.lineItemId] && {backgroundColor: mainThemeColor})]}>{`X${item.quantity}`}</StyledText>
                                                                    <StyledText style={[reverseThemeStyle, (!!this.state?.choosenItem?.[item.lineItemId] && {backgroundColor: mainThemeColor})]}>{item.lineItemSubTotal}</StyledText>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </SwipeRow>
                                                )
                                            })
                                            : <StyledText style={{alignSelf: 'center'}}>{t('nothing')}</StyledText>}
                                    </ScrollView>
                                </View>
                                <View style={{flex: 1, marginVertical: 5, justifyContent: 'space-between'}}>


                                    <StyledText style={{textAlign: 'left'}}>{t('order.discount')} ${order.discount}</StyledText>
                                    <StyledText style={{textAlign: 'left'}}>{t('order.serviceCharge')} ${order.serviceCharge}</StyledText>

                                    <StyledText style={{textAlign: 'left'}}>{t('order.total')} ${order.orderTotal}</StyledText>


                                </View>
                            </View>
                            <View style={{
                                flex: 2,
                                justifyContent: 'center',
                                marginTop: 8,
                                marginBottom: 5,
                            }}></View>
                        </View>
                    </View>
                </ThemeContainer>
            )
        }
        else {
            return (
                <ThemeContainer>
                    <View style={[styles.container]}>
                        <ScreenHeader backNavigation={false}
                            title={t('SpiltBillScreenTitle')} />


                    </View>
                </ThemeContainer>
            )
        }

    }
}

const mapStateToProps = state => ({
    labels: state.labels.data.labels,
    subproducts: state.label.data.subLabels,
    products: state.products.data.results,
    haveData: state.products.haveData,
    haveError: state.products.haveError,
    isLoading: state.products.loading,
    order: state.order.data,
    productsData: state.products
})
const mapDispatchToProps = (dispatch, props) => ({
    dispatch,
    getLables: () => dispatch(getLables()),
    getProducts: () => dispatch(getProducts()),
    getOrder: () => dispatch(getOrder(props.navigation.state.params?.order?.orderId)),
    getfetchOrderInflights: () => dispatch(getfetchOrderInflights()),
    getOrdersByDateRange: () => dispatch(getOrdersByDateRange()),
    clearOrder: () => dispatch(clearOrder(props.navigation.state.params.orderId)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SpiltBillScreen)
