import { StyleSheet, Dimensions, Platform } from "react-native";
import theme from './theme.style';
import themeStyle from "./theme.style";
const window = Dimensions.get('window');

export default StyleSheet.create({
    noPadding: {
        padding: 0
    },
    padding10: {
        padding: 10
    },
    padding5: {
        padding: 5
    },
    paddingLeft10: {
        paddingLeft: 10
    },
    paddingRight10: {
        paddingRight: 10
    },
    paddingBottom10: {
        paddingBottom: 10
    },
    marginLeft10: {
        marginLeft: 10
    },
    margin10: {
        margin: 10
    },
    margin20: {
        margin: 20
    },
    marginBottom20: {
        marginBottom: 20
    },
    flex: {
        flex: 1
    },
    flexRow: {
        flex: 1,
        flexDirection:  'row'
    },
    flexColumn: {
        flex: 1,
        flexDirection:  'column'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 150,
        height: 150
    },
    logoTextContainer: {
        flexDirection: 'row',
        width: 240
    },
    container: {
        flex: 1,
        backgroundColor: theme.SLATE_COLOR,
        paddingTop: (Platform.OS === "ios" ? 20 : 0)
    },
    judgementContainer:{
        flex: 1,
        backgroundColor: theme.BLACK_BACKGROUND,
        paddingTop: (Platform.OS === "ios" ? 20 : 0)
    },
    footer: {
        width: window.width,
    },
    fullWidth: {
        width: window.width,
    },
    bottomContainer: {
        padding: 20,
    },
    inputStyle: {
        backgroundColor: theme.DARK_GREY_COLOR,
        color: theme.WHITE_COLOR,
        fontSize: theme.FONT_SIZE_LARGE,
        borderRadius: 5,
        textAlign: 'center',
        height: 50
    },
    blueBGStyle: {
        backgroundColor: theme.PRIMARY_COLOR,
        marginTop:10,
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
    },
    redBGStyle: {
        backgroundColor: theme.RED_COLOR,
        marginTop:10,
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
    },
    greenBGStyle: {
        backgroundColor: theme.GREEN_COLOR,
        marginTop:10,
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
    },
    greyBGStyle: {
        backgroundColor: theme.MID_GREY_COLOR,
        marginTop:10,
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
    },
    darkGreyBGStyle: {
        backgroundColor: theme.DARK_GREY_COLOR,
        marginTop:10,
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
    },
    whiteTextStyle: {
        color: theme.WHITE_COLOR, 
        alignSelf:'center',
        fontWeight: 'bold',
        fontSize: theme.FONT_SIZE_MEDIUM,
    },
    // Tab container
    containerWhite: {
        flex: 1,
        backgroundColor: theme.WHITE_COLOR,
    },
    containerLight: {
        flex: 1,
        backgroundColor: theme.BACKGROUND_COLOR_LIGHT,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    loadingHorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'transparent',
        padding: 10
    },
    tabContainer: {
      flex: 1,                            // Take up all screen
      backgroundColor: theme.PRIMARY_COLOR,         // Darker background for content area
    },
    tabContent: {
      flex: 1,                            // Take up all available space
      // justifyContent: 'center',           // Center vertically
      // alignItems: 'center',               // Center horizontally
      backgroundColor: theme.WHITE_COLOR,         // Darker background for content area
    },
    listItemMargin:{
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
    },
    listItemDarkHeaderStyle:{
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: theme.DARK_GREY_COLOR,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    listItemStageHeaderTextStyle:{
        color: theme.WHITE_COLOR,
        fontSize: theme.FONT_SIZE_LARGE,
        fontWeight: 'bold',
        flex: 1,
        alignSelf: 'stretch',
    },
    listItemYearHeaderStyle:{
        padding: 10,
        backgroundColor: theme.LIGHT_GREY_COLOR,
        color: theme.TEXT_GREY_COLOR,
        fontSize: theme.FONT_SIZE_SMALL,
        fontWeight: '500'
    },
    listItemTrackerStyle:{
        flex:1,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: theme.WHITE_COLOR,
        // flexWrap: 'wrap'
    },
    listThreeSidedBorderStyle: {
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: theme.LIGHT_GREY_COLOR,
    },
    listItemTrackerTitleStyle: {
        fontSize: theme.FONT_SIZE_MEDIUM,
        color: theme.DARK_GREY_COLOR,
        fontWeight: 'bold',
    },
    listItemTrackerSubTitleStyle: {
        color: theme.DARK_GREY_COLOR,
        fontWeight: 'normal',
        fontSize: theme.FONT_SIZE_SMALLER
    },
    listClickIcon: {
        width: 25,
        height: 25,
        position: 'absolute',
        right:15,
        top:15
    },
    headerStyle:{
        backgroundColor: theme.PRIMARY_COLOR,
        flexDirection: 'row',
        padding:10
    },
    headerTitleStyle:{
        color: '#fff', 
        fontSize: theme.FONT_SIZE_PAGE_HEADER, 
        fontWeight: 'bold',
        flex:1,
        textAlign: 'center',
        marginLeft: 15,
        marginRight: 15
    },
    backButtonHolder:{
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute',
        // left:10,
        // top: 10,
        // zIndex: 999,
    },
    backButtonStyle:{
        width: theme.FONT_SIZE_PAGE_HEADER,
        height: theme.FONT_SIZE_PAGE_HEADER
    },
    rightButtonHolder:{
        // position: 'absolute',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    rightButtonStyle:{
        width: theme.FONT_SIZE_PAGE_HEADER,
        height: theme.FONT_SIZE_PAGE_HEADER
    },
    subHeaderStyle: {
        backgroundColor: theme.PRIMARY_COLOR,
        padding: 10,
    },
    cardStyle: {
        marginTop: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: theme.LIGHT_GREY_COLOR,
        backgroundColor: theme.WHITE_COLOR
    },
    whiteIconStyle: { 
        color: theme.WHITE_COLOR,
        fontSize: theme.FONT_SIZE_EXTRA_LARGE
    },
    greyIconStyle: { 
        color: theme.DARK_GREY_COLOR,
        fontSize: theme.FONT_SIZE_EXTRA_LARGE
    },
    darkGreyIconStyle: { 
        color: theme.BACKGROUND_COLOR_DARK,
        fontSize: theme.FONT_SIZE_EXTRA_LARGE
    },
    bottomView:{
        width: '100%', 
        backgroundColor: theme.BACKGROUND_COLOR_DARK, 
        justifyContent: 'center', 
        alignItems: 'center',
        // minHeight: 80,
        position: 'absolute',
        bottom: 0,
        left: 0,
        flex: 1,
        flexDirection: 'row',
        padding: 10
      },
      noTrackerError:{
          margin: 15,
          padding: 15,
          backgroundColor: themeStyle.WHITE_COLOR,
          borderWidth: 1,
          borderColor: themeStyle.LIGHT_GREY_COLOR,
          color: themeStyle.MID_GREY_COLOR,
          fontSize: themeStyle.FONT_SIZE_MEDIUM,
          fontWeight: themeStyle.FONT_WEIGHT_BOLD,
          borderRadius: 4,
          textAlign: 'center'
      },
      // Tabs row container
        tabsContainer: {
        flexDirection: 'row',               // Arrange tabs in a 
      },
      // Individual tab container
      tabContainer: {
        flex: 1,                            // Take up equal amount of space for each tab
        paddingVertical: 8,                // Vertical padding
        borderBottomWidth: 0,               // Add thick border at the bottom
        borderBottomColor: 'transparent',   // Transparent border for inactive tabs
        backgroundColor: theme.TAB_SELECTED_COLOR,
      },
      // Active tab container
      tabContainerActive: {
        backgroundColor: theme.WHITE_COLOR,
      },
      // Tab text
      tabText: {
        fontFamily: 'Arial',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: theme.FONT_SIZE_LARGE,
        color: theme.WHITE_COLOR,
      },
      // Tab text
      activeTabText: {
        color: theme.DARK_GREY_COLOR,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: theme.FONT_SIZE_LARGE,
      },
      activeTabText: {
        color: theme.DARK_GREY_COLOR,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: theme.FONT_SIZE_LARGE,
      },
      deactiveTabText: {
        color: theme.PRIMARY_COLOR,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: theme.FONT_SIZE_LARGE,
      },
      showView:{
        opacity: 1,
        flex: 1,
        height: '100%'
      },
      hideView: {
        opacity: 0,
        flex: 0,
        height: 0
      }
  });