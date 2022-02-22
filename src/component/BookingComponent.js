import React, { useState, useEffect,useRef } from 'react';
import { View, Text,ActivityIndicator, Modal, Button,Pressable } from 'react-native'
import {i18n, lang} from '../i18n';
import styles, * as styleConstants from '../constant/styles';
import  urls  from '../modules/urls';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';



export default function BookingComponent({dataForm,navigation, stateChanger, data, stateLoadChanger,refreshing,setNextFlag}) {
    const [categories, setCategories] = useState([])
    const [categoriesForView, setCategoriesForView] = useState([])
    const [procedures, setProcedures] = useState([])
    const [proceduresForView, setProceduresForView] = useState([])
    const [specialistsForView, setSpecialistForView] = useState([])
    const [specialist, setSpecialist] = useState(i18n.t('prefspec'))
    const [specialistInfo, setSpecialistInfo]=useState([])
    const [dataRequest, setDataRequest] =useState([])
    const [sexCur, setSexCur] =useState([])
    const [categoryCur, setCategoryCur] =useState([])
    const [procedureCur, setProcedureCur] =useState([])
    const [dbStruct, setdbStruct] =useState([])
    const [f1, setf1] =useState(true)
    const [f2, setf2] =useState(true)
    const [f3, setf3] =useState(true)
    const [f4, setf4] =useState(true)
    const [timeChoosen, setTimeChoosen] =useState("")
    const [dateChoosen, setDateChoosen] =useState(new Date())
    const [dtFlag, setDtFlag] =useState(true)
    // const [nextFlag, setNextFlag] =useState(true)
    const [isLoading, setLoading] = useState(true)
    const [specsInfo, setSpecsInfo] = useState([])
    var options = {year: 'numeric', month: 'short', day: 'numeric', timezone:"UTC+2" };
    const sex=[{value:i18n.t('mens'), key:'mens'},{value:i18n.t('ladies'), key:'ladies'}]
    useEffect(() => {
        getCategories();
      }, [])

      const getCategories = () =>{
        setdbStruct([])
        fetch(urls.categories_procedures(), {
          method: "GET",
        })
        .then(resp => resp.json())
        .then(data => {
          let struct = {};
          let dataArr = [];
          data.map((item,i)=>{
                let map = {"value":item[lang]}
                struct[item["en_title"]]={}
                struct[item["en_title"]]["procedures"]=[]
                struct[item["en_title"]]["value"]=item[lang]
                dataArr.push(map)
          })
        //  console.log("struct",struct)
          setdbStruct(struct)
          setCategories(data)
          setLoading(false)
        })
        .catch(error => console.log("Error is : ", error))
      }
      const getProcedures = (sexs) =>{
        // console.log("selectedItem",sexs)
        setf1(true)
        setf2(true)
        setf3(true)
        setf4(true)
        setDtFlag(true)
        setdbStruct([])
        fetch(urls.procedures(), {
          method: "GET",
        })
        .then(resp => resp.json())
        .then(data => {
          let struct = dbStruct
          let dataArr = [];
          data.map((item,i)=>{
            let val = {"value":item[lang]}
            dataArr.push(val)
            struct[item["category"]]["procedures"].push(item)
          })
          sortCategories(struct, sexs["key"])
          setdbStruct(struct)
          setProcedures(data)
        })
        .catch(error => console.log("Error is : ", error))
      }
      const sortCategories = (struct, sexx) =>{
        // console.log(struct)
        setSexCur(sexx)
        let checker = sexx =="mens"?"price_men":"price_women"
        let forViewCats=[]
        for (var key in struct) {
          // console.log("key",key)
          
          struct[key]["procedures"].map((item, i) => {
            // console.log("item", key,item)
            if (item[checker]==0){
              struct[key]["procedures"].splice(i,1)
              console.log("item deleted")
            }
          });
          if (struct[key]["procedures"].length!=0) {
            let val = {"value":struct[key]["value"]}
            forViewCats.push(val)
          }
        }
        setdbStruct(struct)
        setCategoriesForView(forViewCats)
        setf1(false)
      }
      const sortProcedures = (value) =>{
        setCategoryCur(value)
        setf2(true)
        setf3(true)
        setf4(true)
        setDtFlag(true)
        let struct=dbStruct
        let forViewProc=[]
        for (var key in struct) {
         
          if (struct[key]["value"]==value){
            console.log(struct[key]["procedures"])
            struct[key]["procedures"].map((item)=>{
              let val = {"value":item[lang], "duration":item["duration"],"id":item["id"],"en_title":item["en_title"], "category_en":item["category"], "price": sexCur=="mens"?item["price_men"]:item["price_women"], "sex":sexCur}
              forViewProc.push(val)
            })
            
          }
        }
        let tmpArray = [];
        function itemCheck(item) {
            if (tmpArray.indexOf(item["value"]) === -1) {
                tmpArray.push(item["value"]);
                return true
            }
            return false;
        }
        forViewProc = forViewProc.filter((item) => itemCheck(item))
        setProceduresForView(forViewProc)
        setf2(false)
      }

      const choosenProcedure=(value)=> {
        setf4(true)
        
        setDtFlag(true)
        setProcedureCur(value)
        console.log(sexCur, categoryCur, value)
        value["category"]=categoryCur
        setDataRequest(value)
        dataForm.datarequest=value
        dataForm.datarequest["specialist"]=i18n.t("prefspec")
        getSpecialistsProcedures(value["id"])
        setf3(false)
        setf4(false)
      }
      const choosenSpecialist=(value)=> {
        if (value.value!=i18n.t('prefspec')){
          specsInfo.map((item)=>{
            if(item.name==value.value) {
              let a=[]
              a.push(item)
              return setSpecialistInfo(a)
            }
          })
        }
        setSpecialist(value.value)
        setTimeChoosen("")
        let spec = value
        value = dataRequest
        value["specialist"]=spec.value
        dataForm.datarequest["specialist"]=spec.value
        console.log("dataform",dataForm)
        setDataRequest(value)
      }
      const getSpecialists = (dataProcs) =>{
        fetch(urls.specialists(), {
          method: "GET",
        })
        .then(resp => resp.json())
        .then(data => {
         let dataArr=[{"value":i18n.t("prefspec")}]
         let tmpArr=[]
         data.map((spec, index)=>{
            if (dataProcs.includes(spec.id)){
              tmpArr.push(spec)
             let val = {"value":spec.name}
             dataArr.push(val)
         }
         })
         setSpecsInfo(tmpArr)
        setSpecialistForView(dataArr)
        })
        .catch(error => console.log("Error is : ", error))
      }
      const getSpecialistsProcedures = (procedure_id) =>{
        fetch(urls.staff(), {
          method: "GET",
        })
        .then(resp => resp.json())
        .then(data => {
        let dataProcs=[]
          data.map((item,i)=>{
              if (procedure_id==item["procedure"]){
             let val = item["specialist_name"]
             dataProcs.push(val)
         }
         })
        getSpecialists(dataProcs)
        })
        .catch(error => console.log("Error is : ", error))
      }
    return (
            <View  style={styles.flatlistyle}>
            {isLoading?<ActivityIndicator style={styles.containerIndicator} animating={true} size="large" color="#e9cf63"/>:
            <Dropdown
        icon='chevron-down'
        label={i18n.t('sex')}
        data={sex}
        baseColor={'transparent'}
        onChangeText={(value, index, data)=>getProcedures(data[index])}
      />}
        {f1?null:
        <Dropdown
        
        icon='chevron-down'
        label={i18n.t('category')}
        data={categoriesForView}
        baseColor={'transparent'}
        onChangeText={(value, index, data)=>sortProcedures(value)}
      />}
       {f2?null:
        <Dropdown
        
        icon='chevron-down'
        label={i18n.t('procedures')}
        data={proceduresForView}
        baseColor={'transparent'}
        onChangeText={(value, index, data)=>choosenProcedure(data[index])}
      />}
             {f4?null:
        <Dropdown
        value={i18n.t('prefspec')}
        icon='chevron-down'
        label={i18n.t('specialist')}
        data={specialistsForView}
        baseColor={'transparent'}
        onChangeText={(value, index, data)=>choosenSpecialist(data[index])}
      />}
             {f3?null: (<View style={{flexDirection:"row", justifyContent:"space-between", marginBottom:4, marginHorizontal:10}}>
                <Button onPress={() => navigation.navigate('TimePicker', {specialist: specialist==i18n.t('prefspec')?specsInfo:specialistInfo, setDate:setDateChoosen, setTime:setTimeChoosen, navigation:navigation, setNextFlag:setNextFlag, dataForm:dataForm})} title={i18n.t("chooseday")}/>
                <Text>{dateChoosen.toLocaleDateString(i18n.locale, options)} {timeChoosen}</Text>
                </View>)}


      {timeChoosen==""?null:( 
          <View style={styles.buttonContainer}>
                <Text style={{fontSize:18}}>{dataRequest.price} €</Text>
                </View>)}
                          
            </View>
        


    );
  }