import React from 'react'
import {Alert, AsyncStorage, Text, TouchableOpacity, View, FlatList} from 'react-native'
import styles from '../styles'
import {LocaleContext} from '../locales/LocaleContext'
import {getClientUsr} from '../actions'
import {connect} from 'react-redux'
import EditPasswordPopUp from '../components/EditPasswordPopUp'
import {reduxForm} from 'redux-form'
import {getToken} from '../constants/Backend'
import Constants from "expo-constants/src/Constants";
import ScreenHeader from "../components/ScreenHeader";
import {withContext} from "../helpers/contextHelper";
import {compose} from "redux";
import {StyledText} from "../components/StyledText";

class TestScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    static contextType = LocaleContext

    constructor(props, context) {
        super(props, context)

        this.state = {
            objects: [],
            adminPressCount: 0
        }
    }



    render() {
        const storageItems = this.state.objects.map(obj => {
            return (
                <View key={obj.key} style={styles.fieldContainer}>
                    <Text style={[styles.fieldTitle, {flex: 2}]}>{obj.key}</Text>
                    <TouchableOpacity
                        onPress={() => Alert.alert('Value', obj.value, [{text: 'Ok'}])}
                    >
                        <Text style={{flex: 1}}>Details</Text>
                    </TouchableOpacity>
                </View>
            )
        })
        const {currentUser, themeStyle} = this.props
        const {t} = this.context

        return (
            <View style={[styles.mainContainer, themeStyle]}>
                <View style={[styles.fullWidthScreen]}>
                    <ScreenHeader backNavigation={true}
                        parentFullScreen={true}
                        title={'測試畫面'}
                    />
                    <FlatList
                        data={[
                            {
                                id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                                title: 'First Item',
                                content: 'nqwsqwljs',
                                children: [
                                    {
                                        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                                        title: 'First Item',
                                        content: 'nqwsqwljs',
                                    },
                                    {
                                        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                                        title: 'Second Item',
                                        content: 'nqwsqwljs',
                                        children: [
                                            {
                                                id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                                                title: 'First Item',
                                                content: 'nqwsqwljs',
                                            },
                                            {
                                                id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                                                title: 'Second Item',
                                                content: 'nqwsqwljs'
                                            },
                                            {
                                                id: '58694a0f-3da1-471f-bd96-145571e29d72',
                                                title: 'Third Item',
                                                content: 'nqwsqwljs',
                                                children: [
                                                    {
                                                        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                                                        title: 'First Item',
                                                        content: 'nqwsqwljs',
                                                    },
                                                    {
                                                        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                                                        title: 'Second Item',
                                                        content: 'nqwsqwljs',
                                                        children: [
                                                            {
                                                                id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                                                                title: 'First Item',
                                                                content: 'nqwsqwljs',
                                                            },
                                                            {
                                                                id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                                                                title: 'Second Item',
                                                                content: 'nqwsqwljs'
                                                            },
                                                            {
                                                                id: '58694a0f-3da1-471f-bd96-145571e29d72',
                                                                title: 'Third Item',
                                                                content: 'nqwsqwljs'
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        id: '58694a0f-3da1-471f-bd96-145571e29d72',
                                                        title: 'Third Item',
                                                        content: 'nqwsqwljs'
                                                    },
                                                ]
                                            },
                                        ]
                                    },
                                    {
                                        id: '58694a0f-3da1-471f-bd96-145571e29d72',
                                        title: 'Third Item',
                                        content: 'nqwsqwljs'
                                    },
                                ]
                            },
                            {
                                id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                                title: 'Second Item',
                                content: 'nqwsqwljs'
                            },
                            {
                                id: '58694a0f-3da1-471f-bd96-145571e29d72',
                                title: 'Third Item',
                                content: 'nqwsqwljs'
                            },
                        ]}
                        renderItem={(props) => <RenderItem item={{...props?.item}} count={0} />}
                    />


                </View>
            </View>
        )
    }
}

const RenderItem = (props) => {
    let paddingNum = 20 * props?.count
    console.log(props?.count)
    if (!!props?.item?.children) {
        return (
            <>
                <View style={[styles.tableRowContainerWithBorder, {paddingLeft: paddingNum}]}>
                    <View style={[styles.tableCellView, {flex: 1}]}>
                        <StyledText style={styles.fieldTitle}>{props?.item?.title}</StyledText>
                    </View>
                    <View style={[styles.tableCellView, {justifyContent: 'flex-end'}]}>
                        <StyledText>
                            {props?.item?.content}
                        </StyledText>
                    </View>
                </View>
                <View >
                    <FlatList
                        data={props?.item?.children}
                        renderItem={(props2) => <RenderItem item={{...props2?.item}} count={(props?.count + 1)} />}
                    />
                </View>
            </>
        )
    }
    return (
        <View style={[styles.tableRowContainerWithBorder, {paddingLeft: paddingNum}]}>
            <View style={[styles.tableCellView, {flex: 1}]}>
                <StyledText style={styles.fieldTitle}>{props?.item?.title}</StyledText>
            </View>
            <View style={[styles.tableCellView, {justifyContent: 'flex-end'}]}>
                <StyledText>
                    {props?.item?.content}
                </StyledText>
            </View>
        </View>
    )
}

const mapStateToProps = state => ({
    currentUser: state.clientuser.data,
    haveData: state.clientuser.haveData,
    haveError: state.clientuser.haveError,
    isLoading: state.clientuser.loading
})

const mapDispatchToProps = dispatch => ({
    dispatch,
    getCurrentUser: name => dispatch(getClientUsr(name))
})

TestScreen = reduxForm({
    form: 'accountForm'
})(TestScreen)

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withContext
)

export default enhance(TestScreen)
