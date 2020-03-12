import { StyleSheet, Platform, Dimensions } from 'react-native'
const window = Dimensions.get('window')
export const mainThemeColor = '#f18d1a'

export default StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 53,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 36
  },
  childContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 20,
    marginLeft: 0,
    marginRight: 0,
    paddingRight: 0
  },
  rootInput: {
    height: 44,
    padding: 10,
    marginBottom: 10,
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1
  },
  rootError: {
    color: 'red',
    fontSize: 12,
    fontStyle: 'italic'
  },
  rootWarn: {
    color: 'yellow',
    fontSize: 12,
    fontStyle: 'italic'
  },
  welcomeImage: {
    width: 60,
    height: 40,
    resizeMode: 'contain'
  },
  welcomeText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 20,
    letterSpacing: 2,
    lineHeight: 32,
    marginBottom: 16,
    marginTop: -8
  },
  gsText: {
    padding: 10,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16
  },
  text: {
    fontWeight: 'bold',
    marginTop: 22,
    marginBottom: 6
  },
  textSmall: {
    fontSize: 12,
    marginTop: 10,
    marginBottom: 10
  },
  signInText: {
    color: '#F39F86',
    padding: 10,
    textAlign: 'center',
    fontSize: 16
  },
  margin_15: {
    margin: 10
  },
  grayBg: {
    backgroundColor: '#f5f5f5'
  },
  lightgrayBg: {
    backgroundColor: '#f1f1f1'
  },
  paddTop_30: {
    paddingTop: 30
  },
  paddBottom_30: {
    paddingBottom: 30
  },
  paddBottom_10: {
    paddingBottom: 10
  },
  jc_alignIem_center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  flex_dir_row: {
    flexDirection: 'row'
  },
  orange_color: {
    color: '#f18d1a'
  },
  half_width: {
    width: '45%'
  },
  centerText: {
    textAlign: 'center'
  },
  textLeftWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10
  },
  grayText: {
    color: '#888'
  },
  mgr_20: {
    marginRight: 20
  },
  container_nocenterCnt: {
    flex: 1,
    marginTop: 62,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 20
  },
  mgrbtn40: {
    marginBottom: 40
  },
  pickerStyle: {
    width: '100%',
    justifyContent: 'center',
    paddingRight: 0,
    paddingLeft: 0,
    marginTop: 8
  },
  leftpadd32: {
    paddingLeft: 32
  },
  fullWidth: {
    width: '100%'
  },
  isActive: {
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#F39F86'
  },
  whiteColor: {
    color: '#fff'
  },
  boxShadow: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
    padding: 12
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)'
  },
  popUpLayout: {
    padding: 25,
    margin: 20
  },
  whiteBg: {
    backgroundColor: '#fff'
  },
  editIcon: {
    backgroundColor: '#f18d1a',
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    right: 38,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    opacity: 0.6,
    bottom: 4
  },
  delIcon: {
    backgroundColor: '#f18d1a',
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    padding: 8,
    bottom: 4
  },
  standalone: {
    marginTop: 20,
    marginBottom: 20
  },
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 50
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#8BC645',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  backTextWhite: {
    color: '#FFF'
  },
  rowFront: {
    backgroundColor: '#fff',
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1
  },
  rowFrontText: {
    padding: 15
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 0
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0
  },
  borderRadius4: {
    borderRadius: 4
  },
  textBig: {
    fontSize: 22
  },
  textMedium: {
    fontSize: 18
  },
  textBold: {
    fontWeight: 'bold'
  },
  uerIcon: {
    color: '#fff',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    width: 30,
    height: 30,
    borderRadius: 30,
    paddingTop: 2
  },
  orange_bg: {
    backgroundColor: '#f18d1a'
  },
  editIconII: {
    backgroundColor: '#f18d1a',
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    opacity: 0.6,
    bottom: 4
  },
  colordelIcon: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    right: 0
  },
  onethirdWidth: {
    width: '35%'
  },
  onesixthWidth: {
    width: '65%'
  },
  mgrtotop8: {
    marginTop: 8
  },
  mgrtotop12: {
    marginTop: 12
  },
  paddLeft20: {
    paddingLeft: 20
  },
  paddRight20: {
    paddingRight: 20
  },
  mgrtotop20: {
    marginTop: 20
  },
  BlackColorTitle: {
    textAlign: 'center',
    fontSize: 20,
    letterSpacing: 2,
    lineHeight: 32,
    marginBottom: 16,
    marginTop: -8
  },
  paddingTopBtn20: {
    paddingTop: 20,
    paddingBottom: 20
  },
  borderBottomLine: {
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1
  },
  mgrbtn20: {
    marginBottom: 20
  },
  paddBottom_20: {
    paddingBottom: 20
  },
  paddTop_20: {
    paddingTop: 20
  },
  minustopMargin10: {
    marginTop: -10
  },
  nopaddingLeft: {
    paddingLeft: 0
  },
  userIcon: {
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
    width: 30,
    height: 30,
    lineHeight: 30,
    borderRadius: 30
  },
  quarter_width: {
    width: '25%'
  },
  oneFifthWidth: {
    width: '20%'
  },
  myradio: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 30,
    height: 30,
    borderRadius: 40
  },
  paddingTopBtn8: {
    paddingTop: 8,
    paddingBottom: 8
  },
  height90: {
    height: 730,
    overflow: 'scroll'
  },
  toRight: {
    textAlign: 'right'
  },
  itemCountContainer: {
    backgroundColor: '#f18d1a',
    borderWidth: 1,
    borderColor: '#fff',
    width: 24,
    height: 24,
    borderRadius: 24,
    fontSize: 14,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemCountText: {
    color: '#fff',
    fontSize: 14
  },
  shoppingBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 45
  },
  item: {
    borderTopWidth: 1,
    borderColor: '#ddd'
  },
  verticalMiddle: {
    justifyContent: 'center'
  },
  marginLeftRight35: {
    marginLeft: 25,
    marginRight: 25
  },
  leftpadd20: {
    paddingLeft: 10
  },
  nomgrBottom: {
    marginBottom: 0
  },
  rightAlign: {
    right: 0,
    position: 'absolute',
    top: 20
  },
  mgrbtn60: {
    marginBottom: 60
  },
  top40: {
    position: 'absolute',
    top: 160
  },
  no_mgrTop: {
    marginTop: 0
  },

  // named styles for applying to components
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  screenTitle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 20,
    letterSpacing: 2,
    lineHeight: 32,
    marginBottom: 16,
    marginTop: -8,
    color: mainThemeColor,
    fontWeight: 'bold'
  },
  screenSubTitle: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 32,
    marginHorizontal: 10,
    color: mainThemeColor,
    fontWeight: 'bold'
  },
  squareButton: {
    margin: 10,
    backgroundColor: '#f18d1a',
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    borderRadius: 8
  },
  mainSquareButton: {
    margin: 10,
    flex: 1,
    height: 140,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    borderRadius: 4
  },
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 5,
    marginHorizontal: 15,
    marginBottom: 20
  },
  sectionTitleContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  sectionTitleText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  sectionBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f18d1a',
    paddingVertical: 8,
    paddingHorizontal: 5
  },
  sectionBarText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18
  },
  sectionBarTextSmall: {
    color: '#fff',
    textAlign: 'left',
  },
  sectionContent: {
    marginBottom: 20
  },
  listPanel: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    marginRight: 0,
    paddingTop: 12,
    paddingBottom: 12
  },
  listPanelText: {
    flex: 9,
    fontSize: 16
  },
  listPanelIcon: {
    flex: 1,
    justifyContent: 'flex-end',
    color: '#f18d1a'
  },
  fieldContainer: {
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 5
  },
  fieldTitle: {
    fontWeight: 'bold'
  },
  tableRowContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 5
  },
  tableCellView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  messageBlock: {
    padding: 10,
    textAlign: 'center',
    alignItems: 'center'
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 10
  },
  bottomActionButton: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#f18d1a',
    padding: 10,
    marginBottom: 10,
    overflow: 'hidden'
  },
  actionButton: {
    backgroundColor: '#f18d1a',
    color: '#fff'
  },
  secondActionButton: {
    backgroundColor: '#fff',
    color: '#f18d1a'
  },
  cancelButton: {
    backgroundColor: '#fff',
    color: '#f18d1a'
  },
  deleteButton: {
    borderColor: '#f75336',
    color: '#fff',
    backgroundColor: '#f75336'
  },
  LRmgr_35minus: {
    marginLeft: -30,
    marginRight: -30
  },
  Rightmgr_30minus: {
    marginRight: -30
  },
  upButtonImage: {
    resizeMode: 'contain',
    width: 22,
    height: 20,
    marginRight: 8,
    padding: 8
  },
  upButton: {
    position: 'absolute',
    // width: 50,
    // height: 30,
    // alignItems: 'center',
    // justifyContent: 'center',
    right: 0,
    bottom: 0
  },
  markDownStyle: {
    backgroundColor: '#f4f4f4',
    padding: '4%',
    width: '92%',
    margin: 4
  },
  textAreaContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 0
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start'
  },
  stcontainer: {
    flex: 1,
    marginTop: 53,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 36
  },
  row: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
    marginTop: 7,
    marginLeft: 13,
    marginBottom: 12,
    borderRadius: 4,

    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2
      },

      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginVertical: 30,
      },
    })
  },
  list: {
    flexDirection: 'row'
  }
})
