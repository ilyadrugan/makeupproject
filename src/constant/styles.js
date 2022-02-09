import { StyleSheet } from "react-native";

import { Dimensions } from 'react-native';

const mainColor = "#000000";
const backColor = "#F2E0D0";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const inconSize = 48;
const styles = StyleSheet.create({
  containerPages:{
    backgroundColor: backColor,
    width:windowWidth,
    height:windowHeight,
  },

  container: {
   padding:"3%",
    backgroundColor: backColor,
    width:windowWidth,
    height:windowHeight,
  },
  containerChoose: {
    flex: 1,
    marginTop:200,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: "8%",
    justifyContent: "space-evenly",
  },
  containerSecondary: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  containerCenter: {

    flex: 1,
    backgroundColor: backColor,
    alignItems: "center",
    justifyContent: "center",
    width:windowWidth,
    height:windowHeight,
  },
  containerBottom: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 110,
  },
  containerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "flex-start",
   
  },

  titleText: {
    fontSize: 25,
  },

  textError: {
    borderColor: "red",
    backgroundColor: "rgba(255,0,47, 0.1)",
  },

  icon: {
    height: inconSize,
    width: inconSize,
    borderColor: "#000000",
    position: "absolute",
  },

  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
  },

  button: {
    margin: 8,
    alignSelf: "center",
    borderColor: mainColor,
    borderWidth: 2,
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
  buttontext: {
    fontSize: 20,
    color: mainColor,
    textAlign: "center",
  },
  buttonMargin: {
    marginVertical: 20,
  },

  dialog: {
    padding: 20,
    width: "90%",
    maxWidth: 400,
    borderRadius: 10,
    borderWidth: 3,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  mainimage:{
    resizeMode: 'contain',
    width: undefined,
    height: windowHeight*0.16,  
    marginTop:10,
  
  },
  iconimage:{
    resizeMode: 'contain',
    width: 30,
    height: 30,  
  },

  footerContainer1:{
    flex:1,
    flexDirection: 'row',
    justifyContent: "space-around",
  },
  containerFooter:{
    marginTop:90,
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-evenly",
  },
  iconContainer:{
    alignItems:"center",
    height:70,
    flexDirection: 'column',
    justifyContent: "space-around",
  },
  iconText:{
    marginTop:20
  },
  headerStyle:{
    
    alignItems: "center",
    width:"100%",
    textAlign:"center",
    marginVertical:windowHeight*0.04
  },
  webviewheaderStyle:{
    alignItems: "center",
    width:"100%",
    textAlign:"center",
    marginBottom:8
  },
  backStyle:{
    position: "absolute",
    left:windowWidth*0.08,
  },

  headerText:{
    color:"#47525E",
    fontSize:26
  },
  wrkTextContainerStyle:{
    backgroundColor:"#FFF1E0",
    paddingHorizontal:"4%",
    width:windowWidth,
    height:50,
    flex:1,
    justifyContent:"space-between",
    flexDirection:"row",
    alignItems: "center",
  },

  procedureContainerStyle:{
    backgroundColor:"#FFF1E0",
    flex:1,
    flexDirection:"row",
    alignItems: "center",
  },
  containerIndicator: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default styles;