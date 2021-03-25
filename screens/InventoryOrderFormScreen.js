import React, {useEffect} from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Text, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import InputText from '../components/InputText'
import RNSwitch from '../components/RNSwitch'
import styles from '../styles'
import IonIcon from 'react-native-vector-icons/Ionicons'
import {isRequired} from '../validators'
import DeleteBtn from '../components/DeleteBtn'
import {LocaleContext} from '../locales/LocaleContext'
import ScreenHeader from "../components/ScreenHeader";
import {ThemeKeyboardAwareScrollView} from "../components/ThemeKeyboardAwareScrollView";
import {StyledText} from "../components/StyledText";
import {WhiteSpace} from "@ant-design/react-native";
import {backAction} from '../helpers/backActions'
import {Ionicons} from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import {ThemeContainer} from "../components/ThemeContainer";
import {connect} from 'react-redux'
import RenderDateTimePicker, {RenderTimePicker} from '../components/DateTimePicker'
import {api, dispatchFetchRequest, successMessage, dispatchFetchRequestWithOption} from '../constants/Backend'

class InventoryOrderFormScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    static contextType = LocaleContext

    constructor(props, context) {
        super(props, context)



        this.state = {
            data: null,
            initialValuesCount: props?.initialValues?.optionValues?.length ?? 0,
            isShowDatePicker: false
        }

        context.localize({
            en: {
                inventoryOrder: {
                    newFormTitle: '新增庫存',
                    editFormTitle: '編輯庫存',
                    orderDate: '訂單日期',
                    supplierId: '進貨商編號',
                    supplierOrderId: '進貨單編號',
                    sku: 'SKU',
                    quantity: '數量'
                }
            },
            zh: {
                inventoryOrder: {
                    newFormTitle: '新增庫存',
                    editFormTitle: '編輯庫存',
                    orderDate: '訂單日期',
                    supplierId: '進貨商編號',
                    supplierOrderId: '進貨單編號',
                    sku: 'SKU',
                    quantity: '數量'
                }
            }
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextState !== this.state;
    }

    componentDidMount() {

    }
    exchangeAnimate = (from, to, callback) => {
        Promise.all([
            this.[`renderOptionValRef_${from}`]?.pulse(500).then(endState => endState),
            this.[`renderOptionValRef_${to}`]?.pulse(500).then(endState => endState),]
        ).finally(() => {

        })
        callback()
    }

    deleteAnimate = (index, callback) => {
        this.[`renderOptionValRef_${index}`]?.fadeOutRight(250).then(() => {
            this.[`renderOptionValRef_${index}`]?.animate({0: {opacity: 1}, 1: {opacity: 1}}, 1)
            callback()
        })
    }

    handleSubmit = (data) => {
        console.log('handleSubmit', JSON.stringify(data))
        let request = data
        dispatchFetchRequestWithOption(
            api.inventoryOrders.new,
            {
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            }, {
            defaultMessage: false,
            ignoreErrorMessage: true
        },
            response => {
                response.json().then(data => {
                    console.log('getInventoryOrders', JSON.stringify(data))

                })
            },
            response => {
            }
        ).then()
    }


    render() {
        const {t, themeStyle, isTablet, customMainThemeColor} = this.context
        const {handleSubmit} = this.props
        console.log('InventoryOrderFormScreen', customMainThemeColor)

        const renderOptionValPopup = (name, index, fields) => (
            <Animatable.View ref={(ref) => {
                this.[`renderOptionValRef_${index}`] = ref
            }}>
                <View
                    style={[styles.tableRowContainerWithBorder]}
                    key={index}
                >
                    <View style={[{flex: 1, minWidth: 64, justifyContent: 'center', alignItems: 'center'}]}>
                        <TouchableOpacity
                            onPress={() => {
                                if (index > 0) {
                                    this.exchangeAnimate(index, index - 1, () => fields.swap(index, index - 1))
                                }
                            }}>
                            <Ionicons
                                name="caret-up-outline"
                                size={32}
                                color={index > 0 ? customMainThemeColor : 'gray'}

                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (index < fields.length - 1)
                                    this.exchangeAnimate(index, index + 1, () => fields.swap(index, index + 1))

                            }}>

                            <Ionicons
                                name="caret-down-outline"
                                size={32}
                                color={index < fields.length - 1 ? customMainThemeColor : 'gray'}

                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[{flex: 27}]}>
                        <Field
                            component={InputText}
                            name={`${name}.sku`}
                            placeholder={t('inventoryOrder.sku')}
                            alignLeft={true}
                            validate={isRequired}
                        />
                        <WhiteSpace />
                        <Field
                            component={InputText}
                            name={`${name}.quantity`}
                            placeholder={t('inventoryOrder.quantity')}
                            keyboardType={`numeric`}
                            alignLeft={true}
                            format={(value, name) => {
                                return value !== undefined && value !== null ? String(value) : ''
                            }}
                        />
                    </View>
                    <View style={[{flex: 2, minWidth: 64, justifyContent: 'center', alignItems: 'center'}]}>
                        <Icon
                            name="minuscircleo"
                            size={32}
                            color={fields.length > 1 ? customMainThemeColor : 'gray'}
                            onPress={() => {
                                if (fields.length > 1)
                                    this.deleteAnimate(index, () => fields.remove(index))
                            }}
                        />
                    </View>

                </View>
            </Animatable.View>
        )

        const renderOptionsValues = ({label, fields}) => {
            useEffect(() => {
                if (fields.length === 0 && this.state.initialValuesCount === 0)
                    fields.push()
            }, []);
            return (
                <View>
                    <View style={styles.sectionContainer}>
                        <View style={[styles.sectionTitleContainer]}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <StyledText style={styles.sectionTitleText}>{label}</StyledText>

                                <IonIcon
                                    name="md-add"
                                    size={32}
                                    color={customMainThemeColor}
                                    onPress={() => {
                                        this.scrollViewRef?.scrollToEnd({animated: true})
                                        fields.push()
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    {fields.map(renderOptionValPopup)}
                </View>
            )
        }

        return (
            <ThemeKeyboardAwareScrollView getRef={(ref) => this.scrollViewRef = ref}>
                <View style={[styles.fullWidthScreen]}>
                    <ScreenHeader title={t('inventoryOrder.newFormTitle')} />
                    <View>
                        <View style={styles.tableRowContainerWithBorder}>
                            <View style={[styles.tableCellView, {flex: 1}]}>
                                <StyledText style={styles.fieldTitle}>{t('inventoryOrder.orderDate')}</StyledText>
                            </View>
                            <View style={[styles.tableCellView, {flex: 1, justifyContent: 'flex-end'}]}>


                                <Field
                                    name={`orderDate`}
                                    component={RenderDateTimePicker}
                                    onChange={this.handlegetFromDate}
                                    placeholder={t('inventoryOrder.orderDate')}
                                    isShow={this.state.isShowDatePicker ?? false}
                                    showDatepicker={() => this.setState({isShowDatePicker: !this.state?.isShowDatePicker})}
                                    defaultValue={this.state?.data?.orderDate ?? new Date()}
                                    readonly={!!this.state?.data}
                                />

                            </View>
                        </View>

                        <View style={styles.tableRowContainerWithBorder}>
                            <View style={[styles.tableCellView, {flex: 1}]}>
                                <StyledText style={styles.fieldTitle}>{t('inventoryOrder.supplierId')}</StyledText>
                            </View>
                            <View style={[styles.tableCellView, {flex: 1, justifyContent: 'flex-end'}]}>
                                <Field
                                    name="supplierId"
                                    component={InputText}
                                    //validate={isRequired}
                                    placeholder={t('inventoryOrder.supplierId')}
                                    secureTextEntry={false}
                                />

                            </View>
                        </View>

                        <View style={styles.tableRowContainerWithBorder}>
                            <View style={[styles.tableCellView, {flex: 1}]}>
                                <StyledText style={styles.fieldTitle}>{t('inventoryOrder.supplierOrderId')}</StyledText>
                            </View>
                            <View style={[styles.tableCellView, {flex: 1, justifyContent: 'flex-end'}]}>
                                <Field
                                    name="supplierOrderId"
                                    component={InputText}
                                    //validate={isRequired}
                                    placeholder={t('inventoryOrder.supplierOrderId')}
                                    secureTextEntry={false}
                                />

                            </View>
                        </View>



                        <FieldArray
                            name="items"
                            component={renderOptionsValues}
                            label={t('inventoryOrder.sku')}
                        />
                    </View>
                    <View style={[styles.bottom, styles.horizontalMargin]}>
                        <TouchableOpacity onPress={handleSubmit(data => {
                            this.handleSubmit(data)
                        })}>
                            <Text style={[styles?.bottomActionButton(customMainThemeColor), styles?.actionButton(customMainThemeColor)]}>
                                {t('action.save')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {this.props.navigation.goBack()}}
                        >
                            <Text style={[styles?.bottomActionButton(customMainThemeColor), styles?.secondActionButton(this.context)]}>
                                {t('action.cancel')}
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ThemeKeyboardAwareScrollView>
        )



    }
}

const mapStateToProps = state => ({
    isLoading: state.offers.loading,
    client: state.client.data,
    currentUser: state.clientuser.data,
})

const mapDispatchToProps = dispatch => ({
    dispatch,
    getCurrentClient: () => dispatch(getCurrentClient())
})

InventoryOrderFormScreen = reduxForm({
    form: 'InventoryOrderForm'
})(InventoryOrderFormScreen)

export default connect(mapStateToProps, mapDispatchToProps)(InventoryOrderFormScreen)
