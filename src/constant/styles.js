import { StyleSheet } from "react-native";

import { Dimensions } from 'react-native';

const mainColor = "#000000";
const backColor = "#f2e0d0";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const inconSize = 48;
const styles = StyleSheet.create({
  
  containerPages:{
    backgroundColor: backColor,
    width:windowWidth,
    height:windowHeight,
  },
  contactContainer:{
    flex: 1,
    flexDirection: 'column',
    justifyContent:"flex-start"
  },
  contactCard:{
    marginVertical:"5%",
    paddingHorizontal:"2%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  contactCardImage:{
    resizeMode: 'contain',
    width: 100,
    height: 100,  
  },
  contactCardText:{
    marginLeft:14,
    flex: 1,
    flexDirection: "column",
    height: 100,  
    justifyContent:"center"
  },
  contactCardMainText:{
    fontSize:20,
  },
  contactCardSecondText:{
    fontSize:16,
    color:"#808080"
  },
  contactLine:{
    paddingHorizontal:"4%",
    width:windowWidth,
    height:50,
    justifyContent:"space-between",
    flexDirection:"row",
    alignItems: "center",
    borderBottomWidth: 1,
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

  container2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "flex-start",
  },

  icon: {
    height: inconSize,
    width: inconSize,
    borderColor: "#000000",
    position: "absolute",
  },
  ramkastyle:{
    borderBottomWidth:1,
    borderTopWidth:1,
  },
  image: {
    width: windowWidth,
    height: windowHeight /4,
    resizeMode:"contain",
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
    height: windowHeight*0.18,  
  
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
    width:"100%",
    flex:1,
    alignItems: "center",
    textAlign:"center",
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
    justifyContent:"space-between",
    flexDirection:"row",
    alignItems: "center",
  },

  procedureContainerStyle:{
    // borderBottomWidth: 1,
    flex:1,
    flexDirection:"row",
    alignItems: "center",
  },
  containerIndicator: {
    top:windowHeight*0.4,
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  flatlistyle:{
    maxHeight :0.6*windowHeight
  },
  buttonNext:{
    width:120,
    height:80,
    
  },
  buttonContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginHorizontal:6,
    padding:10,
  },
  textInputstyle:{
    height: 40,
    margin: 6,
    borderBottomWidth: 1,
    padding: 6,
    borderRadius:1,
    fontSize:18
  },
  carouselContIndicator:{
    width: windowWidth*0.94 - 20,
    height: windowHeight / 3 -20,
  },
  timeCard:{
    width:windowWidth/4,
    height:50,
    borderWidth:1,
    alignItems:"center",
    justifyContent:"center",
    margin:10,
    backgroundColor:"#FFF1E0"
  },
  timeCardChecked:{
    width:windowWidth/4,
    height:50,
    borderWidth:1,
    alignItems:"center",
    justifyContent:"center",
    margin:10,
    backgroundColor:"#feccd5",
    borderColor:"#feccd5"
  },
  flatPD:{
    maxHeight:windowHeight/1.75,
  }
});

export default styles;