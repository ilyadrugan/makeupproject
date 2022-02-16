import React, { useState, useEffect,useRef } from 'react';
import { View, Text,ActivityIndicator, TextInput, Button, } from 'react-native'
import CategoryProcedures from '../component/forRequest/CategoryProcedures'
import {i18n, lang} from '../i18n';
import styles, * as styleConstants from '../constant/styles';
import  urls  from '../modules/urls';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';


export default function Booking({navigation}) {
    const [categories, setCategories] = useState([])
    const [categoriesForView, setCategoriesForView] = useState([])
    const [procedures, setProcedures] = useState([])
    const [proceduresForView, setProceduresForView] = useState([])
    const [dataRequest, setDataRequest] =useState([])
    const [sexCur, setSexCur] =useState([])
    const [categoryCur, setCategoryCur] =useState([])
    const [procedureCur, setProcedureCur] =useState([])

    const [dbStruct, setdbStruct] =useState([])
    // const sexD = useRef(null);
    // const categoryD = useRef(null);
    // const procedureD = useRef(null);
    const [f1, setf1] =useState(true)
    const [f2, setf2] =useState(true)
    const [f3, setf3] =useState(true)
    const [isLoading, setLoading] = useState(true);
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
         console.log("struct",struct)
          setdbStruct(struct)
          setCategories(data)
          setLoading(false)
        })
        .catch(error => console.log("Error is : ", error))
      }
      const getProcedures = (sexs) =>{
        console.log("selectedItem",sexs)
        setf1(true)
        setf2(true)
        setf3(true)
        setdbStruct([])
        
        fetch(urls.procedures(), {
          method: "GET",
        })
        .then(resp => resp.json())
        .then(data => {
         
          let struct = dbStruct
          // console.log("getProcedures",struct)
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
          console.log("key",key)
          
          struct[key]["procedures"].map((item, i) => {
            console.log("item", key,item)
            if (item[checker]==0){
              struct[key]["procedures"].splice(i,1)
              console.log("item deleted")
            }
          });
          console.log(key,struct[key])
          // console.log(struct[key]["procedures"], key)
          if (struct[key]["procedures"].length!=0) {
            console.log(struct[key]["value"])
            let val = {"value":struct[key]["value"]}
            forViewCats.push(val)
            
          }
        }
        console.log(struct, forViewCats)
        setdbStruct(struct)
        // console.log(forViewCats)
        setCategoriesForView(forViewCats)
        setf1(false)
      }
      const sortProcedures = (value) =>{
        setCategoryCur(value)
        setf2(true)
        setf3(true)
        let struct=dbStruct
        
        let forViewProc=[]
        for (var key in struct) {
          console.log("sortProcedures",struct[key]["value"])
         
          if (struct[key]["value"]==value){
            console.log(struct[key]["procedures"])
            struct[key]["procedures"].map((item)=>{
              let val = {"value":item[lang], "id":item["id"],"en_title":item["en_title"], "category_en":item["category"], "price": sexCur=="mens"?item["price_men"]:item["price_women"], "sex":sexCur}
              forViewProc.push(val)
            })
            
          }
        }
        console.log(forViewProc)
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
        console.log(dbStruct)
        setf2(false)
      }

      const choosenProcedure=(value)=> {
        setf3(false)
        setProcedureCur(value)
        console.log(dbStruct)
        console.log(sexCur, categoryCur, value)
        value["category"]=categoryCur
        setDataRequest(value)
      }

    
    return (


      <View style={[styles.containerPages,{backgroundColor:"#FFF1E0"}]}>
          <View style={styles.container2}>
            <View  style={styles.flatlistyle}>
            {isLoading?<ActivityIndicator style={styles.containerIndicator}style={styles.containerIndicator} animating={true} size="large" color="#e9cf63"/>:<Dropdown
       
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


              {f3?null:( <View style={styles.buttonContainer}>
                <Text style={{fontSize:18}}>{dataRequest.price} €</Text>
                <Button onPress={() => navigation.navigate('PersonalDataForm', {dataRequest: dataRequest, navigation:navigation})}  style={styles.buttonNext} title={i18n.t('next')}/>
                </View>)}
                          
            </View>
           
            
        </View>
        
      </View>


    );
  }