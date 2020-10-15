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
import {MainActionButton, MainActionFlexButton} from "../components/ActionButtons";
import {NavigationEvents} from 'react-navigation'



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
                ConfirmCancelMessage: 'Confirm to cancel split bill ?'
            },
            zh: {
                SpiltBillScreenTitle: '拆帳',
                ConfirmCancelMessage: '確定取消拆帳嗎？'
            }
        })
        this.state = {
            splitOrderId: context?.splitOrderId ?? null,
            splitOrderData: null,
        }
        console.log('context', context?.splitOrderId, context?.saveSplitOrderId)

    }

    componentDidMount() {
        console.log('SpiltBillScreen', this.props.order)
        this.refreshScreen()
        // this.getXML(this.props.navigation.state.params?.transactionResponse?.transactionId)
        // this.getOnePrinter()
        // this.props.getWorkingAreas()
    }
    refreshScreen = () => {
        if (!!this.context?.splitOrderId) {
            this.getSplitOrder(this.state.splitOrderId)
        } else {
            this.setState({splitOrderData: null, splitOrderId: null})
        }
        this.context?.saveSplitParentOrderId(this.props.order.orderId)
        this.props.getOrder()
    }

    componentDidUpdate(prevProps, prevState) {

        // if (!this.state.isPrintFirst && !!this.state.printer && (!!this.state.invoiceXML || !!this.state.receiptXML)) {
        //     this.setState({isPrintFirst: true})
        //     if (!!this.state?.invoiceXML)
        //         this.handlePrint(this.state?.invoiceXML, this.state.printer.ipAddress, true)
        //     this.handlePrint(this.state?.receiptXML, this.state.printer.ipAddress, false)
        // }
    }






    addItem = async (item) => {
        let url = !!this.state.splitOrderId ? api.splitOrder.moveItem(this.state.splitOrderId) : api.splitOrder.new
        console.log('url', url)
        await dispatchFetchRequestWithOption(url, {
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
                this.context?.saveSplitOrderId(data?.orderId)
                this.getSplitOrder(data?.orderId)
                console.log('Back data', data)
            })
        }).then()
    }

    deleteItem = async (item) => {
        let url = api.splitOrder.moveItem(this.props.navigation.state.params?.order?.orderId)
        await dispatchFetchRequestWithOption(url, {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sourceOrderId: this.state.splitOrderId,
                sourceLineItemId: item?.lineItemId
            })
        }, {
            defaultMessage: false
        }, response => {

            response?.json().then(data => {
                this.props.getOrder()
                this.context?.saveSplitOrderId(this.state.splitOrderId)
                this.getSplitOrder(this.state.splitOrderId)
                console.log('Back data', data)
            })
        }).then()
    }

    deleteSplitOrder = () => {
        const formData = new FormData()
        formData.append('sourceOrderId', this.props.navigation.state.params?.order?.orderId)
        console.log('formData', formData, this.state.splitOrderId)
        dispatchFetchRequestWithOption(api.splitOrder.delete(this.state.splitOrderId), {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formData
        }, {
            defaultMessage: false
        }, response => {
            response?.json().then(data => {
                this.props.getOrder()
                this.context?.saveSplitOrderId('delete')
                this.context?.saveSplitParentOrderId('delete')
                this.setState({splitOrderData: null, splitOrderId: null})
                console.log('Back data', data)
            })
        }).then()
        // this.context?.saveSplitOrderId('delete')
        // this.setState({splitOrderData: null, splitOrderId: null})
    }

    cleanSplitContext = () => {
        this.context?.saveSplitOrderId('delete')
        this.context?.saveSplitParentOrderId('delete')
        this.setState({splitOrderData: null, splitOrderId: null})
    }

    getSplitOrder = async (id) => {
        await dispatchFetchRequest(
            api.order.getById(id),
            {
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                headers: {}
            },
            response => {
                response.json().then(data => {
                    this.setState({splitOrderData: data, splitOrderId: data?.orderId})
                    console.log('getSplitOrder', data)
                })
            },
            response => {
                this.setState({splitOrderData: null, splitOrderId: null})
            }
        ).then()
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
                            backAction={() => {
                                Alert.alert(
                                    `${t('ConfirmCancelMessage')}`,
                                    ``,
                                    [
                                        {
                                            text: `${t('action.yes')}`,
                                            onPress: () => {
                                                this.props.navigation.goBack()
                                                !!this.state?.splitOrderData ? this.deleteSplitOrder() : this.cleanSplitContext()
                                            }
                                        },
                                        {
                                            text: `${t('action.no')}`,
                                            onPress: () => console.log('Cancelled'),
                                            style: 'cancel'
                                        }
                                    ]
                                )
                            }}
                            title={t('SpiltBillScreenTitle')} />
                        <NavigationEvents
                            onWillFocus={() => {
                                this.refreshScreen()
                            }}
                        />
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



                                                    <TouchableOpacity style={[reverseThemeStyle, {marginBottom: 16, borderRadius: 10}, (!!this.state?.choosenItem?.[item.lineItemId] && {backgroundColor: mainThemeColor})]}
                                                        activeOpacity={0.8}
                                                        onPress={() => {this.addItem(item)}}>
                                                        <View style={{aspectRatio: 3, alignItems: 'center', flexDirection: 'row'}}>
                                                            <View style={{flex: 2.5, flexDirection: 'column', paddingLeft: '3%'}}>
                                                                <StyledText style={[{...reverseThemeStyle, fontSize: 16, fontWeight: 'bold'}, (!!this.state?.choosenItem?.[item.lineItemId] && {backgroundColor: mainThemeColor})]}>{item.productName} ${item.price} {`X${item.quantity}`}</StyledText>
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
                                                                <StyledText style={[reverseThemeStyle, (!!this.state?.choosenItem?.[item.lineItemId] && {backgroundColor: mainThemeColor})]}>{item.lineItemSubTotal}</StyledText>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>

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
                                marginLeft: 32
                            }}>
                                {!!this.state.splitOrderData && !!this.state.splitOrderId && <View style={{flex: 1}}>
                                    <View style={{flex: 7}}>
                                        <ScrollView style={{flex: 1}}>
                                            {this.state.splitOrderData?.lineItems?.length > 0 ?
                                                this.state.splitOrderData?.lineItems?.map((item, index) => {
                                                    return (



                                                        <TouchableOpacity style={[reverseThemeStyle, {marginBottom: 16, borderRadius: 10}, (!!this.state?.choosenItem?.[item.lineItemId] && {backgroundColor: mainThemeColor})]}
                                                            activeOpacity={0.8}
                                                            onPress={() => {this.deleteItem(item)}}>
                                                            <View style={{aspectRatio: 6, alignItems: 'center', flexDirection: 'row'}}>
                                                                <View style={{flex: 2.5, flexDirection: 'column', paddingLeft: '3%'}}>
                                                                    <StyledText style={[{...reverseThemeStyle, fontSize: 16, fontWeight: 'bold'}, (!!this.state?.choosenItem?.[item.lineItemId] && {backgroundColor: mainThemeColor})]}>{item.productName} ${item.price} {`X${item.quantity}`}</StyledText>
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

                                                                    <StyledText style={[reverseThemeStyle, (!!this.state?.choosenItem?.[item.lineItemId] && {backgroundColor: mainThemeColor})]}>{item.lineItemSubTotal}</StyledText>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                                : <StyledText style={{alignSelf: 'center'}}>{t('nothing')}</StyledText>}
                                        </ScrollView>
                                    </View>
                                    <View style={{flex: 1, marginVertical: 5, flexDirection: 'row'}}>
                                        <View style={{flex: 1, justifyContent: 'space-between'}}>


                                            <StyledText style={{textAlign: 'left'}}>{t('order.discount')} ${this.state.splitOrderData.discount}</StyledText>
                                            <StyledText style={{textAlign: 'left'}}>{t('order.serviceCharge')} ${this.state.splitOrderData.serviceCharge}</StyledText>

                                            <StyledText style={{textAlign: 'left'}}>{t('order.total')} ${this.state.splitOrderData.orderTotal}</StyledText>


                                        </View>
                                        <View style={{flex: 3, justifyContent: 'space-between', flexDirection: 'row'}}>

                                            <DeleteBtn
                                                text={t('action.cancel')}
                                                alertTitle={t('ConfirmCancelMessage')}
                                                alertMessage={''}
                                                containerStyle={{
                                                    flex: 1,
                                                    alignItems: 'center',
                                                    borderRadius: 4,
                                                    borderWidth: 1,
                                                    borderColor: mainThemeColor,
                                                    justifyContent: 'center',
                                                    backgroundColor: '#fff',
                                                }}
                                                textStyle={{
                                                    textAlign: 'center',
                                                    fontSize: 16,
                                                    color: mainThemeColor,
                                                }}
                                                handleDeleteAction={() => {
                                                    this.props.navigation.goBack()
                                                    !!this.state?.splitOrderData && this.deleteSplitOrder()
                                                }}
                                            />
                                            <View style={{flex: 2, marginLeft: 16}}>
                                                <MainActionFlexButton
                                                    title={t('payOrder')}
                                                    onPress={() => {
                                                        if (!!this.state?.splitOrderData && this.state?.splitOrderData?.lineItems?.length > 0) {
                                                            console.log('onPress', order)
                                                            this.props.navigation.navigate('Payment', {
                                                                order: this.state.splitOrderData,
                                                                isSplitting: true,
                                                                parentOrder: order,
                                                            })
                                                        }
                                                        else {
                                                            warningMessage(t('lineItemCountCheck'))
                                                        }
                                                    }} />
                                            </View>


                                        </View>
                                    </View>
                                </View>}
                            </View>
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
                        <NavigationEvents
                            onWillFocus={() => {
                                this.props.getOrder()
                            }}
                        />


                    </View>
                </ThemeContainer>
            )
        }

    }
}

const mapStateToProps = (state, props) => ({
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
