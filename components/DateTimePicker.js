import React, {Component} from 'react'
import {Text, TouchableOpacity, View, Appearance} from 'react-native'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment-timezone'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import styles from '../styles'
import {LocaleContext} from "../locales/LocaleContext";
import TimeZoneService from "../helpers/TimeZoneService";
import {withContext} from "../helpers/contextHelper";
import Modal from 'react-native-modal';

class RenderDateTimePicker extends Component {
	static contextType = LocaleContext

	constructor(props, context) {
		super(props, context)
		this.state = {
			result: !!this.props?.input?.value ? this.props?.input?.value : new Date()
		}
	}

	handleChange = (result) => {
		this.setState({result: result})
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps?.isShow !== this.props?.isShow && this.props?.isShow) {
			this.setState({result: !!this.props?.input?.value ? this.props?.input?.value : new Date()})
		}
	}

	render() {
		const {
			input: {onBlur, onChange, onFocus, value},
			placeholder,
			meta: {error, toched, vali5d},
			isShow,
			showDatepicker,
			readonly,
			themeStyle,
			...rest
		} = this.props
		const {t, locale} = this.context
		const colorScheme = Appearance.getColorScheme();

		const timezone = TimeZoneService.getTimeZone()
		const i18nMoment = moment(value).tz(timezone);

		if (locale === 'zh-Hant-TW') {
			i18nMoment.locale('zh-tw')
		} else {
			i18nMoment.locale('en')
		}

		const fontColor = readonly ? '#c5c5c5' : themeStyle.color

		return (
			<View style={{flex: 1}}>
				<View>
					{Platform.OS === 'ios' ? <Modal
						isVisible={isShow}
						useNativeDriver
						hideModalContentWhileAnimating
						animationIn='bounceIn'
						animationOut='bounceOut'
						onBackdropPress={() => showDatepicker()}
						style={{
							margin: 0, flex: 1,
							alignItems: 'center',
							flexDirection: 'row',
						}}
					>
						<View style={{borderRadius: 10, paddingHorizontal: 10, backgroundColor: '#989898'}}>

							<RNDateTimePicker
								testID="dateTimePicker"
								style={{minWidth: 320}}
								value={!!value ? this.state?.result : new Date()}
								mode={"datetime"}
								is24Hour={true}
								display="inline"
								onChange={(e, selectedDate) => {
									console.log(`on change date: ${selectedDate} ${e.nativeEvent.timestamp}`)

									this.handleChange(new Date(e.nativeEvent?.timestamp ?? value))
								}}
							/>
							<TouchableOpacity
								onPress={() => {
									onChange(this.state?.result)
									showDatepicker();
								}}
							>
								<Text style={[styles.bottomActionButton, styles.actionButton]}>{t('datetimeRange.select')}</Text>
							</TouchableOpacity>
						</View>
					</Modal> :
						isShow && <RNDateTimePicker
							testID="dateTimePicker"
							value={!!value ? this.state?.result : new Date()}
							mode={"date"}
							is24Hour={true}
							display="calendar"
							onChange={(e, selectedDate) => {
								console.log(`on change date: ${selectedDate} ${e.nativeEvent.timestamp}`)
								showDatepicker();
								onChange(new Date(e.nativeEvent?.timestamp ?? value))

							}}
						/>
					}

				</View>
				<View>
					<View style={[styles.flex_dir_row, styles.jc_alignIem_center]}>
						<View style={{
							flex: 1,
							flexDirection: 'row',
							alignItems: 'center',
							borderWidth: 1,
							borderColor: '#c5c5c5',
							paddingVertical: 10,
							paddingHorizontal: 5,
							borderRadius: 4
						}}>
							<FontAwesomeIcon
								name="calendar"
								size={24}
								style={[styles.orange_color]}
							/>
							<Text onPress={(e) => {
								if (!readonly) {
									showDatepicker()
								}
							}}
								style={{fontSize: 11, color: fontColor, marginLeft: 5}}
							>
								{i18nMoment.tz(timezone).format("YYYY-MM-DD HH:mm A")}
							</Text>
						</View>
					</View>
				</View>
			</View>
		)
	}
}

export default withContext(RenderDateTimePicker)


class RenderTimePickerBase extends Component {
	static contextType = LocaleContext

	constructor(props, context) {
		super(props, context)
		this.state = {
			result: !!this.props?.input?.value ? this.props?.input?.value : new Date()
		}
	}

	componentDidMount() {
		this.props?.input?.onChange(
			!!this.props?.input?.value ? this.props?.input?.value
				: !!this.props?.defaultValue ? this.props?.defaultValue : new Date())
	}

	handleChange = (result) => {
		this.setState({result: result})
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps?.isShow !== this.props?.isShow && this.props?.isShow) {
			this.setState({result: !!this.props?.input?.value ? this.props?.input?.value : new Date()})
		}
	}


	render() {
		const {
			input: {onBlur, onChange, onFocus, value},
			placeholder,
			meta: {error, toched, valid},
			isShow,
			showDatepicker,
			readonly,
			themeStyle,
			mode,
			...rest
		} = this.props
		const {t, locale} = this.context
		const timezone = TimeZoneService.getTimeZone()
		const i18nMoment = moment(!!value ? value : new Date()).tz(timezone);


		if (locale === 'zh-Hant-TW') {
			i18nMoment.locale('zh-tw')
		} else {
			i18nMoment.locale('en')
		}

		const fontColor = readonly ? '#c5c5c5' : themeStyle.color

		return (
			<View style={{flex: 1}}>
				<View>
					{Platform.OS === 'ios' ?
						<Modal
							isVisible={isShow}
							useNativeDriver
							hideModalContentWhileAnimating
							animationIn='bounceIn'
							animationOut='bounceOut'
							onBackdropPress={() => showDatepicker()}
							style={{
								margin: 0, flex: 1,
								alignItems: 'center',
								flexDirection: 'row',
							}}
						>


							<View style={{backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 10}}>
								<RNDateTimePicker
									style={{minWidth: 320}}
									testID="dateTimePicker"
									value={!!value ? this.state?.result : new Date()}
									mode={mode ?? "time"}
									is24Hour={true}
									display="inline"
									onChange={(e, selectedDate) => {
										console.log(`on change date: ${selectedDate} ${e.nativeEvent.timestamp}`)

										this.handleChange(new Date(e.nativeEvent?.timestamp ?? value))
									}}
								/>
								<TouchableOpacity
									onPress={() => {
										onChange(this.state?.result)
										showDatepicker();
									}}
								>
									<Text style={[styles.bottomActionButton, styles.actionButton]}>{t('datetimeRange.select')}</Text>
								</TouchableOpacity>
							</View>


						</Modal> :
						isShow && <RNDateTimePicker
							testID="dateTimePicker"
							value={!!value ? this.state?.result : new Date()}
							mode={mode ?? "time"}
							is24Hour={true}
							display="default"
							onChange={(e, selectedDate) => {
								console.log(`on change date: ${selectedDate} ${e.nativeEvent.timestamp}`)
								showDatepicker();
								onChange(new Date(e.nativeEvent?.timestamp ?? value))

							}}
						/>
					}

				</View>
				<View>
					<View style={[styles.flex_dir_row, styles.jc_alignIem_center]}>
						<TouchableOpacity style={{
							flex: 1,
							flexDirection: 'row',
							alignItems: 'center',
							borderWidth: 1,
							borderColor: '#c5c5c5',
							paddingVertical: 10,
							paddingHorizontal: 5,
							borderRadius: 4
						}}
							onPress={(e) => {
								if (!readonly) {
									showDatepicker()
								}
							}}
							disabled={readonly}
						>
							<FontAwesomeIcon
								name="clock-o"
								size={24}
								style={[styles.orange_color]}
							/>
							<Text
								style={{fontSize: 11, color: fontColor, marginLeft: 5}}
							>
								{i18nMoment.tz(timezone).format("HH:mm A")}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View >
		)
	}
}

export const RenderTimePicker = withContext(RenderTimePickerBase)

class RenderDatePickerBase extends Component {
	static contextType = LocaleContext

	constructor(props, context) {
		super(props, context)
		this.state = {
			result: !!this.props?.input?.value ? this.props?.input?.value : new Date()
		}
	}

	componentDidMount() {
		this.props?.input?.onChange(
			!!this.props?.input?.value ? this.props?.input?.value
				: !!this.props?.defaultValue ? this.props?.defaultValue : new Date())
	}

	handleChange = (result) => {
		this.setState({result: result})
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps?.isShow !== this.props?.isShow && this.props?.isShow) {
			this.setState({result: !!this.props?.input?.value ? this.props?.input?.value : new Date()})
		}
	}

	render() {
		const {
			input: {onBlur, onChange, onFocus, value},
			placeholder,
			meta: {error, toched, valid},
			isShow,
			showDatepicker,
			readonly,
			themeStyle,
			mode,
			...rest
		} = this.props
		const {t, locale} = this.context
		const timezone = TimeZoneService.getTimeZone()
		const i18nMoment = moment(!!value ? value : new Date()).tz(timezone);


		if (locale === 'zh-Hant-TW') {
			i18nMoment.locale('zh-tw')
		} else {
			i18nMoment.locale('en')
		}

		const fontColor = readonly ? '#c5c5c5' : themeStyle.color

		return (
			<View style={{flex: 1}}>
				<View>
					{Platform.OS === 'ios' ? <Modal
						isVisible={isShow}
						useNativeDriver
						hideModalContentWhileAnimating
						animationIn='bounceIn'
						animationOut='bounceOut'
						onBackdropPress={() => showDatepicker()}
						style={{
							margin: 0, flex: 1,
							alignItems: 'center',
							flexDirection: 'row',
						}}
					>

						<View style={{backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 10}}>

							<RNDateTimePicker
								style={{minWidth: 320}}
								testID="dateTimePicker"
								value={!!value ? this.state?.result : new Date()}
								mode={mode ?? "date"}
								is24Hour={true}
								display="inline"
								onChange={(e, selectedDate) => {
									console.log(`on change date: ${selectedDate} ${e.nativeEvent.timestamp}`)

									this.handleChange(new Date(e.nativeEvent?.timestamp ?? value))
								}}
							/>
							<TouchableOpacity
								onPress={() => {
									onChange(this.state?.result)
									showDatepicker();
								}}
							>
								<Text style={[styles.bottomActionButton, styles.actionButton]}>{t('datetimeRange.select')}</Text>
							</TouchableOpacity>
						</View>
					</Modal> :
						isShow && <RNDateTimePicker
							testID="dateTimePicker"
							value={!!value ? this.state?.result : new Date()}
							mode={mode ?? "date"}
							is24Hour={true}
							display="default"
							onChange={(e, selectedDate) => {
								console.log(`on change date: ${selectedDate} ${e.nativeEvent.timestamp}`)
								showDatepicker();
								onChange(new Date(e.nativeEvent?.timestamp ?? value))

							}}
						/>
					}

				</View>
				<View>
					<View style={[styles.flex_dir_row, styles.jc_alignIem_center]}>
						<TouchableOpacity style={{
							flex: 1,
							flexDirection: 'row',
							alignItems: 'center',
							borderWidth: 1,
							borderColor: '#c5c5c5',
							paddingVertical: 10,
							paddingHorizontal: 5,
							borderRadius: 4,
							justifyContent: 'flex-end'
						}}
							onPress={(e) => {
								if (!readonly) {
									showDatepicker()
								}
							}}
							disabled={readonly}
						>
							<FontAwesomeIcon
								name="clock-o"
								size={24}
								style={[styles.orange_color]}
							/>
							<Text
								style={{fontSize: 11, color: fontColor, marginLeft: 5}}
							>
								{i18nMoment.tz(timezone).format('YYYY-MM-DD')}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}
}

export const RenderDatePicker = withContext(RenderDatePickerBase)