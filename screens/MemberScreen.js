import React from 'react'
import {FlatList, TouchableOpacity, View, Text} from 'react-native'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import ScreenHeader from "../components/ScreenHeader"
import {LocaleContext} from '../locales/LocaleContext'
import AddBtn from '../components/AddBtn'
import {getCurrentClient} from '../actions/client'
import LoadingScreen from "./LoadingScreen"
import styles, {mainThemeColor} from '../styles'
import {ThemeScrollView} from "../components/ThemeScrollView";
import {StyledText} from "../components/StyledText";
import {api, dispatchFetchRequest} from '../constants/Backend'
import {NavigationEvents} from 'react-navigation'
import {MainActionFlexButton, DeleteFlexButton} from "../components/ActionButtons";
import DeleteBtn from '../components/DeleteBtn'
import {ThemeContainer} from "../components/ThemeContainer";
import {SearchBar, Button} from "react-native-elements";
import Icon from 'react-native-vector-icons/Ionicons'
import InputText from '../components/InputText'
import {isRequired} from '../validators'
import SegmentedControl from "../components/SegmentedControl";

class MemberScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    static contextType = LocaleContext

    constructor(props, context) {
        super(props, context)
        this.state = {
            isLoading: false,
            screenMode: 'normal'
        }
        this.context.localize({
            en: {
                member: {

                }
            },
            zh: {
                member: {

                }
            }
        })
    }

    componentDidMount() {

        this.props.getCurrentClient()
        this.getPlans()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props?.client !== prevProps?.client) {
            this.refreshScreen()
        }
    }

    refreshScreen = () => {
        this.getPlans()
    }

    getPlans = async () => {
        //if need loading pending
        //this.setState({isLoading: true})

        await dispatchFetchRequest(api.roster.getAllPlans, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        }, response => {
            response.json().then(data => {
                this.setState({rosterPlansData: data?.results ?? [], isLoading: false})
            })
        }).then()
    }

    handleCreatEvent = (id) => {
        dispatchFetchRequest(api.roster.createEvents(id), {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        }, response => {
            this.refreshScreen()
        }).then()
    }

    handleDeleteEvent = (id) => {
        dispatchFetchRequest(api.roster.createEvents(id), {
            method: 'DELETE',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        }, response => {

            this.refreshScreen()
        }).then()
    }

    Item = (item) => {
        return (
            <View style={styles.rowFront}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('RostersFormScreen', {
                            data: item,
                            refreshScreen: () => {this.refreshScreen()},
                        })
                    }}
                    style={{flexDirection: 'row', justifyContent: 'space-between'}}
                >
                    <StyledText style={styles.rowFrontText}>{item?.rosterMonth}</StyledText>
                    <View style={{width: 160, padding: 4}}>
                        {item?.status === 'ACTIVE'
                            ? <MainActionFlexButton
                                title={this.context.t('roster.createEvent')}
                                onPress={() => {this.handleCreatEvent(item?.id)}} />
                            : <DeleteFlexButton
                                title={this.context.t('roster.deleteEvent')}
                                onPress={() => {this.handleDeleteEvent(item?.id)}} />
                        }
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        const {navigation, offers, isLoading} = this.props
        const {t, isTablet, themeStyle} = this.context

        if (isLoading || this.state.isLoading) {
            return (
                <LoadingScreen />
            )
        } else {
            if (true) {
                return (
                    <ThemeContainer>
                        <View style={[styles.fullWidthScreen]}>
                            <NavigationEvents
                                onWillFocus={() => {
                                    this.refreshScreen()
                                }}
                            />
                            <ScreenHeader title={t('settings.member')}
                                parentFullScreen={true}

                            />
                            <View style={{flexDirection: 'row', flex: 1}}>
                                <View style={{flex: 1}}>
                                    <SearchBar placeholder={'搜尋會員'}
                                        onChangeText={this.searchProduct}
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
                                            backgroundColor: mainThemeColor
                                        }}
                                        inputStyle={{backgroundColor: themeStyle.backgroundColor}}
                                        inputContainerStyle={{borderRadius: 0, backgroundColor: themeStyle.backgroundColor}}
                                    />
                                    {/* <FlatList
                                        data={this?.state?.rosterPlansData ?? []}
                                        renderItem={({item}) => this.Item(item)}
                                        keyExtractor={(item) => item?.rangeIdentifier}
                                        ListEmptyComponent={
                                            <View>
                                                <StyledText style={styles.messageBlock}>{t('general.noData')}</StyledText>
                                            </View>
                                        }
                                    /> */}

                                    <View style={styles.rowFront}>
                                        <TouchableOpacity
                                            style={{flexDirection: 'row', justifyContent: 'space-between'}}
                                        >
                                            <StyledText style={styles.rowFrontText}>{'Ivy'}</StyledText>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.rowFront}>
                                        <TouchableOpacity
                                            style={{flexDirection: 'row', justifyContent: 'space-between'}}
                                        >
                                            <StyledText style={styles.rowFrontText}>{'Finny'}</StyledText>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.rowFront}>
                                        <TouchableOpacity
                                            style={{flexDirection: 'row', justifyContent: 'space-between'}}
                                        >
                                            <StyledText style={styles.rowFrontText}>{'Eddie'}</StyledText>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {this.state.screenMode === 'normal' && <View style={{flex: 3, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center'}}>
                                    <Button
                                        icon={
                                            <Icon name="md-add" size={32} color={mainThemeColor} />
                                        }
                                        type='outline'
                                        raised
                                        onPress={() => this.setState({screenMode: 'form'})}
                                        buttonStyle={{minWidth: 320, borderColor: mainThemeColor, backgroundColor: themeStyle.backgroundColor}}
                                        title={'新增會員'}
                                        titleStyle={{marginLeft: 10, color: mainThemeColor}}
                                    />
                                </View>}

                                {this.state.screenMode === 'form' && <View style={{flex: 3, paddingHorizontal: 10, justifyContent: 'flex-start'}}>
                                    <View style={{minHeight: 200, flex: 1}}>
                                        <View style={styles.fieldContainer}>
                                            <View style={[styles.tableCellView, {flex: 1}]}>
                                                <StyledText style={styles.fieldTitle}>{'姓名'}</StyledText>
                                            </View>
                                            <View style={[styles.tableCellView, {flex: 3, justifyContent: 'flex-end'}]}>
                                                <Field
                                                    name="status"
                                                    component={InputText}
                                                    placeholder="Finny"
                                                    editable={true}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.fieldContainer}>
                                            <View style={[styles.tableCellView, {flex: 1}]}>
                                                <StyledText style={styles.fieldTitle}>{'聯絡電話'}</StyledText>
                                            </View>
                                            <View style={[styles.tableCellView, {flex: 3, justifyContent: 'flex-end'}]}>
                                                <Field
                                                    name="status"
                                                    component={InputText}
                                                    placeholder="0975648237"
                                                    editable={true}
                                                />
                                            </View>
                                        </View>


                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <View style={{flex: 1}}>
                                                <StyledText style={styles.fieldTitle}>{'性別'}</StyledText>
                                            </View>
                                            <View style={{flexDirection: 'column', flex: 3, maxWidth: 640, paddingVertical: 10, }}>
                                                <Field
                                                    name="operationStatus"
                                                    component={SegmentedControl}
                                                    selectedIndex={0}
                                                    onChange={(index) => {}}
                                                    values={['男', '女', '其他']}
                                                    validate={[isRequired]}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.fieldContainer}>
                                            <View style={[styles.tableCellView, {flex: 1}]}>
                                                <StyledText style={styles.fieldTitle}>{'生日'}</StyledText>
                                            </View>
                                            <View style={[styles.tableCellView, {flex: 3, justifyContent: 'flex-end'}]}>
                                                <Field
                                                    name="status"
                                                    component={InputText}
                                                    placeholder="1990-01-01"
                                                    editable={true}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.fieldContainer}>
                                            <View style={[styles.tableCellView, {flex: 1}]}>
                                                <StyledText style={styles.fieldTitle}>{'會員標籤'}</StyledText>
                                            </View>
                                            <View style={[styles.tableCellView, {flex: 3, justifyContent: 'flex-end'}]}>
                                                <Field
                                                    name="status"
                                                    component={InputText}
                                                    placeholder='VIP'
                                                    editable={true}
                                                />
                                            </View>
                                        </View>

                                        <View style={styles.fieldContainer}>

                                            <View style={[styles.tableCellView,
                                            styles.rootInput,
                                                themeStyle,
                                            styles.withBorder, {flex: 1, justifyContent: 'space-between'}]}>
                                                <StyledText style={styles.fieldTitle}>近五筆消費記錄</StyledText>
                                                <View>
                                                    <Icon name="md-arrow-dropdown" size={32} color={mainThemeColor} />
                                                </View>
                                            </View>
                                        </View>

                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: 2,
                                        }}>
                                            <View style={[styles.tableCellView,
                                            styles.rootInput,
                                                themeStyle,
                                            styles.withBorder, {flex: 1, justifyContent: 'space-between'}]}>
                                                <StyledText style={styles.fieldTitle}>消費愛好前五名</StyledText>
                                                <View>
                                                    <Icon name="md-arrow-dropup" size={32} color={mainThemeColor} />
                                                </View>
                                            </View>

                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <View style={[styles.tableCellView,
                                            styles.rootInput,
                                                themeStyle,
                                            styles.withBorder, {flex: 1, justifyContent: 'center', borderTopWidth: 0}]}>
                                                <StyledText >明太子天使義大利麵</StyledText>
                                            </View>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <View style={[styles.tableCellView,
                                            styles.rootInput,
                                                themeStyle,
                                            styles.withBorder, {flex: 1, justifyContent: 'center', borderTopWidth: 0}]}>
                                                <StyledText >冰美式</StyledText>
                                            </View>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <View style={[styles.tableCellView,
                                            styles.rootInput,
                                                themeStyle,
                                            styles.withBorder, {flex: 1, justifyContent: 'center', borderTopWidth: 0}]}>
                                                <StyledText >焦糖拿鐵</StyledText>
                                            </View>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <View style={[styles.tableCellView,
                                            styles.rootInput,
                                                themeStyle,
                                            styles.withBorder, {flex: 1, justifyContent: 'center', borderTopWidth: 0}]}>
                                                <StyledText >鮮橙綠茶</StyledText>
                                            </View>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <View style={[styles.tableCellView,
                                            styles.rootInput,
                                                themeStyle,
                                            styles.withBorder, {flex: 1, justifyContent: 'center', borderTopWidth: 0}]}>
                                                <StyledText >紅茶拿鐵</StyledText>
                                            </View>
                                        </View>

                                    </View>
                                    <View style={[{flexDirection: 'row', flex: 1, alignItems: 'flex-end'}]}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({screenMode: 'normal'})}
                                            style={{flex: 1, marginRight: 10}}>
                                            <Text style={[styles.bottomActionButton, styles.cancelButton]}>
                                                {t('action.cancel')}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{flex: 1}}
                                        >
                                            <Text style={[styles.bottomActionButton, styles.actionButton]}>
                                                {'確認'}
                                            </Text>

                                        </TouchableOpacity>
                                    </View>
                                </View>}
                            </View>
                        </View>
                    </ThemeContainer >
                )
            } else {
                return (
                    <ThemeScrollView>
                        <View style={[styles.fullWidthScreen]}>
                            <NavigationEvents
                                onWillFocus={() => {
                                    this.refreshScreen()
                                }}
                            />
                            <ScreenHeader title={t('settings.member')}
                                parentFullScreen={true}
                                rightComponent={
                                    <AddBtn
                                        onPress={() => navigation.navigate('RostersFormScreen', {data: null, refreshScreen: this.refreshScreen, })}
                                    />}
                            />
                            <FlatList
                                data={this?.state?.rosterPlansData ?? []}
                                renderItem={({item}) => this.Item(item)}
                                keyExtractor={(item) => item?.rangeIdentifier}
                                ListEmptyComponent={
                                    <View>
                                        <StyledText style={styles.messageBlock}>{t('general.noData')}</StyledText>
                                    </View>
                                }
                            />
                        </View>
                    </ThemeScrollView>
                )
            }
        }

    }
}

const mapStateToProps = state => ({
    isLoading: state.offers.loading,
    client: state.client.data,
})

const mapDispatchToProps = dispatch => ({
    dispatch,
    getCurrentClient: () => dispatch(getCurrentClient())
})

MemberScreen = reduxForm({
    form: 'memberForm'
})(MemberScreen)

export default connect(mapStateToProps, mapDispatchToProps)(MemberScreen)
