import React, {useEffect} from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Text, TouchableOpacity, View, FlatList} from 'react-native'
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
import {ThemeScrollView} from "../components/ThemeScrollView";
import {StyledText} from "../components/StyledText";
import {WhiteSpace} from "@ant-design/react-native";
import {backAction} from '../helpers/backActions'
import {Ionicons} from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import {ThemeContainer} from "../components/ThemeContainer";
import {connect} from 'react-redux'
import RenderDateTimePicker, {RenderTimePicker} from '../components/DateTimePicker'
import {api, dispatchFetchRequest, successMessage, dispatchFetchRequestWithOption} from '../constants/Backend'
import Modal from 'react-native-modal';
import {SearchBar} from "react-native-elements";
import {ScanView} from '../components/scanView'
import {CustomTable} from '../components/CustomTable'

class InventoryOrderFormScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    static contextType = LocaleContext

    constructor(props, context) {
        super(props, context)

        console.log(props.navigation.state.params)

        this.state = {
            data: null,
            initialValuesCount: props?.initialValues?.optionValues?.length ?? 0,
            isShowDatePicker: false,
            inventoryModalData: null,
            isShow: false,
            inventoryFormValues: props?.navigation?.state?.params?.data?.items ?? []
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
        let request = {...data, items: this.state?.inventoryFormValues}
        console.log('handleSubmit', JSON.stringify(request))
        dispatchFetchRequestWithOption(
            api.inventoryOrders.new,
            {
                method: 'POST',
                withCredentials: true,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            }, {
            defaultMessage: true,
            ignoreErrorMessage: false
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

    handleInventoryFormSubmit = (values) => {
        let tempArr = [...this.state?.inventoryFormValues]
        tempArr.push(values)
        console.log('handleInventoryFormSubmit', JSON.stringify(tempArr))
        this.setState({inventoryFormValues: tempArr})
    }

    render() {
        const {t, themeStyle, isTablet, customMainThemeColor, customBackgroundColor} = this.context
        const {handleSubmit} = this.props
        console.log('InventoryOrderFormScreen', customMainThemeColor)




        return (
            <ThemeScrollView >
                <View style={[styles.fullWidthScreen]}>
                    <ScreenHeader title={t('inventoryOrder.newFormTitle')} />
                    <Modal
                        isVisible={this.state?.isShow}
                        useNativeDriver
                        hideModalContentWhileAnimating
                        animationIn='fadeIn'
                        animationOut='fadeOut'
                        onBackdropPress={() => this.setState({isShow: false})}
                        style={{
                            margin: 0, flex: 1, flexDirection: 'row', alignItems: 'center'
                        }}
                    >
                        <View style={{maxWidth: 640, flex: 1, borderWidth: 1, borderColor: customMainThemeColor, marginHorizontal: 10, }}>
                            <View style={{flexDirection: 'row'}}>
                                <InventoryForm
                                    initialValues={this.state?.inventoryModalData}
                                    onSubmit={this.handleInventoryFormSubmit}
                                    handleCancel={() => this.setState({isShow: false})}
                                />
                            </View>
                        </View>
                    </Modal>
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

                        <View style={[styles.tableRowContainer, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
                            <TouchableOpacity onPress={() => {this.setState({inventoryModalData: null, isShow: true})}}>
                                <Text style={[styles?.bottomActionButton(customMainThemeColor), styles?.actionButton(customMainThemeColor)]}>
                                    {t('inventory.addInventory')}
                                </Text>
                            </TouchableOpacity>
                            <StyledText style={styles.sectionTitleText}>{t('inventoryOrder.sku')}</StyledText>
                            <DeleteBtn handleDeleteAction={() => {}} text={t('inventory.deleteAllInventory')} />

                        </View>
                        {this.state?.inventoryFormValues?.length > 0 ?
                            <View style={styles.tableRowContainer}>
                                <CustomTable
                                    tableData={this.state?.inventoryFormValues}
                                    tableTopBar={[t('inventory.sku'), t('inventory.quantity'), t('order.unitPrice'),]}
                                    tableContent={['sku', 'quantity', 'unitPrice']}
                                    occupy={[1, 1, 1]}
                                    itemOnPress={(data) => {}}
                                //moreActions={[(data) => this.handleItemPress(data), (data) => this.handleInventoryDelete(data)]}
                                />
                            </View>
                            :
                            <>
                                <View style={styles.sectionTitleContainer}>
                                    <StyledText >{t('general.noData')}</StyledText>
                                </View>
                            </>
                        }


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
            </ThemeScrollView>
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


class InventoryForm extends React.Component {
    static navigationOptions = {
        header: null
    }
    static contextType = LocaleContext

    constructor(props, context) {
        super(props, context)
        this.state = {
            openScanView: false,
            searchKeyword: null,
            searching: false,
            searchResults: [],
        }
    }

    handleScanSuccess = (data) => {
        this.props?.change(`sku`, data)
        this.setState({openScanView: false})
    }

    searchSku = (keyword) => {
        if (keyword !== '') {
            this.setState({searching: true})

            dispatchFetchRequest(api.inventory.getByKeyword(keyword), {
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                headers: {}
            }, response => {
                response.json().then(data => {
                    console.log('searchSku', JSON.stringify(data))
                    this.setState({
                        searchResults: data.results,
                        searching: false
                    })
                })
            }).then()
        } else {
            this.setState({
                searchResults: []
            })
        }

    }

    Item = (item, isSearch = false) => {
        return (
            <View style={[styles.rowFront, isSearch && {borderBottomColor: this.contetx?.customMainThemeColor}]}>
                <TouchableOpacity
                    onPress={() => {
                        this.props?.change(`sku`, item?.sku)
                        this.props?.change(`inventoryId`, item?.inventoryId)
                        this.setState({searchResults: [], searchKeyword: item?.sku})
                    }}
                    style={{flexDirection: 'row', justifyContent: 'space-between'}}
                >
                    <StyledText style={styles.rowFrontText}>{item?.sku}</StyledText>

                </TouchableOpacity>
            </View >
        );
    }

    render() {
        const {t, customMainThemeColor, customBackgroundColor} = this.context



        return (
            <ThemeKeyboardAwareScrollView>
                <View style={{paddingTop: 15}}>
                    <ScreenHeader parentFullScreen={true}
                        title={!!this.props?.initialValues ? t('inventory.inventoryEditFormTitle') : t('inventory.inventoryNewFormTitle')}
                        backNavigation={false}

                    />



                    <View style={styles.tableRowContainerWithBorder}>
                        <View style={[styles.tableCellView, {flex: 1}]}>
                            <StyledText style={styles.fieldTitle}>{t('inventory.sku')}</StyledText>
                        </View>
                        <View style={[styles.tableCellView, {flex: 1, justifyContent: 'flex-end'}]}>
                            <View style={{flex: 1, }}>
                                <SearchBar placeholder={t('inventory.sku')}
                                    onChangeText={this.searchSku}
                                    onClear={() => {
                                        this.setState({searchResults: []})
                                    }}
                                    value={this.state.searchKeyword}
                                    showLoading={this.state.searching}
                                    lightTheme={false}
                                    // reset the container style.
                                    containerStyle={{
                                        padding: 4,
                                        borderRadius: 0,
                                        borderWidth: 0,
                                        borderTopWidth: 0,
                                        borderBottomWidth: 0,
                                        backgroundColor: customMainThemeColor
                                    }}
                                    inputStyle={{backgroundColor: customBackgroundColor}}
                                    inputContainerStyle={{borderRadius: 0, backgroundColor: customBackgroundColor}}
                                />



                            </View>
                            <TouchableOpacity style={{minWidth: 64, alignItems: 'center', }}
                                onPress={() => {
                                    this.setState({
                                        openScanView: !this.state.openScanView
                                    })
                                }}
                            >
                                <Icon style={{marginLeft: 10}} name="camera" size={24} color={customMainThemeColor} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {this.state.openScanView ? <View >
                        <ScanView successCallback={(data) => {this.handleScanSuccess(data)}} style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            borderRadius: 10,
                            paddingVertical: '10%',
                            alignItems: 'center'
                        }}
                            allType />
                    </View> : <FlatList
                            style={{height: 150, paddingBottom: 1}}
                            data={this.state.searchResults}
                            renderItem={({item}) => this.Item(item, true)}

                        />}


                    <View style={styles.tableRowContainerWithBorder}>
                        <View style={[styles.tableCellView, {flex: 1}]}>
                            <StyledText style={styles.fieldTitle}>{t('inventory.quantity')}</StyledText>
                        </View>
                        <View style={[styles.tableCellView, {flex: 1, justifyContent: 'flex-end'}]}>
                            <Field
                                name="quantity"
                                component={InputText}
                                validate={[isRequired]}
                                placeholder={t('inventory.quantity')}
                                keyboardType={`numeric`}
                            />
                        </View>
                    </View>
                    <View style={styles.tableRowContainerWithBorder}>
                        <View style={[styles.tableCellView, {flex: 1}]}>
                            <StyledText style={styles.fieldTitle}>{t('order.unitPrice')}</StyledText>
                        </View>
                        <View style={[styles.tableCellView, {flex: 1, justifyContent: 'flex-end'}]}>
                            <Field
                                name="unitPrice"
                                component={InputText}
                                validate={[isRequired]}
                                placeholder={t('order.unitPrice')}
                                keyboardType={`numeric`}
                            />
                        </View>
                    </View>

                    <View style={{
                        paddingVertical: 8,
                        paddingHorizontal: 10
                    }}>

                        <TouchableOpacity onPress={this.props?.handleSubmit}>
                            <Text style={[styles?.bottomActionButton(customMainThemeColor), styles?.actionButton(customMainThemeColor)]}>
                                {t('action.save')}
                            </Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => {this.props?.handleCancel()}}>
                            <Text
                                style={[styles?.bottomActionButton(customMainThemeColor), styles?.secondActionButton(this.context)]}
                            >
                                {t('action.cancel')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ThemeKeyboardAwareScrollView>
        )
    }
}

InventoryForm = reduxForm({
    form: 'inventoryForm_order'
})(InventoryForm)
