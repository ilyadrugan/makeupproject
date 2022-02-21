import React, { useState, useEffect } from 'react';
import {
  Button,
  Text,
  View,
  FlatList, 
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import styles, * as styleConstants from '../constant/styles';
import { i18n } from '../i18n';
import { useRoute } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;

export default function TimePicker({}) {
    const route = useRoute()
    // console.log("route",route.params.dataForm.datarequest)
    const [startDate, setStartDate] =useState(new Date())
    const [clickedTime, setClickedTime] = useState("")
    const [clickedDT, setClickedDT] = useState(startDate)
    const [timeBookedArr, setTimeBookedArr] = useState([])
    const [timeSpecss, setTimeSpecs]=useState({})
    const [isLoading, setLoading] = useState(true);
    const [timeCards, setTimeCards] = useState([])
    const [refr, setRefr] = useState(false)
    const [koeff, setKoeff] =useState(route.params.dataForm.datarequest.duration/15)
    let koef=1
    var timebook=[]
    let arr=[]
    async function getReqs() {
      try {
        setLoading(true);
        let response = await fetch(urls.requests());
        let data = await response.json();
        
        data.map((item)=>{
          arr.push({specialist:item.specialist, time:item.time, duration:item.duration})
        })
        setTimeBookedArr(arr)
        timebook = Array.from(arr)
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(()=>makeWorkTimes(startDate), 500)
      }
    }
    useEffect(() => {
      getReqs()
      setLoading(false)

    }, [])
    const makeWorkTimes=(date)=>{
        // setTimeSpecs({})
      let dayOfweek=date.getDay()
      switch (dayOfweek) {
        case 1:
          let timeArr = [];
          var timeSpecs={}
          route.params.specialist.map((item)=>{
            let startTime = item.monday_start
            let endTime = item.monday_end
            if (startTime == null){ return 0}
            startTime= startTime.slice(0,5).split(':')
            endTime=endTime.slice(0,5).split(':')
            let start = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(startTime[0], 10), parseInt(startTime[1], 10), 0))
            let end =new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(endTime[0], 10), parseInt(endTime[1], 10), 0))
            let timesbook=[]
            console.log("timebook",timebook)
            console.log("timeBookedArr",timeBookedArr)
            if (!timebook.length){
              timeBookedArr.map((it)=>{
                console.log(it)
                let dt=new Date(it.time)
                if (it.specialist==item.name && date.toDateString()==dt.toDateString()){
                  let n=it.duration/15
                  let tmpArr=[]
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.push(t)
                    dt.setMinutes(dt.getMinutes()+15)
                    n-=1
                  }
                  dt=new Date(it.time)
                  n=koeff
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.unshift(t)
                    dt.setMinutes(dt.getMinutes()-15)
                    n-=1
                  }
                  timesbook=timesbook.concat(tmpArr)
                }
              })
              let newEnd = end
              let tmpArr=[]
              let n=koeff-1
              while (n>0){
                newEnd.setMinutes(newEnd.getMinutes()-15)
                let t = (newEnd.getHours()<10?"0"+newEnd.getHours()-3:newEnd.getHours()-3)+":"+(newEnd.getMinutes()<10?"0"+newEnd.getMinutes():newEnd.getMinutes())
                tmpArr.push(t)
                n-=1
              }
              timesbook=timesbook.concat(tmpArr)
            }
            else{
              timebook.map((it)=>{
                let dt=new Date(it.time)
                if (it.specialist==item.name && date.toDateString()==dt.toDateString()){
                  let n=it.duration/15
                  let tmpArr=[]
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.push(t)
                    dt.setMinutes(dt.getMinutes()+15)
                    n-=1
                  }
                  dt=new Date(it.time)
                  n=koeff
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.unshift(t)
                    dt.setMinutes(dt.getMinutes()-15)
                    n-=1
                  }
                  timesbook=timesbook.concat(tmpArr)
                }
              })
              let newEnd = end
              let tmpArr=[]
              let n=koeff-1
              while (n>0){
                newEnd.setMinutes(newEnd.getMinutes()-15)
                let t = (newEnd.getHours()<10?"0"+newEnd.getHours()-3:newEnd.getHours()-3)+":"+(newEnd.getMinutes()<10?"0"+newEnd.getMinutes():newEnd.getMinutes())
                tmpArr.push(t)
                n-=1
              }
              timesbook=timesbook.concat(tmpArr)
            }
            
            var objs=timeSpecs
            while (start.getHours()!=end.getHours() || start.getMinutes()!=end.getMinutes()){
              koef=1
              var value=((start.getHours()-3)<10?"0"+(start.getHours()-3):start.getHours()-3)+":"+(start.getMinutes()<10?"0"+start.getMinutes():start.getMinutes())
              console.log(value)
              if (date.toDateString()==new Date().toDateString()){
                if (start.getHours()-3>new Date().getHours()){
                  let f=0
                    if (timesbook.includes(value)){
                      f=1
                    } 
                  !f?timeArr.push(value):null
                  if (!f && route.params.specialist.length>1){
                    objs[value]==undefined?objs[value]=[item.name]:objs[value].push(item.name)
                  }
                }
                else if (start.getHours()-3==new Date().getHours()){
                  if (start.getMinutes()>=new Date().getMinutes()){
                    let f=0
                    if (timesbook.includes(value)){
                      f=1
                    } 
                    !f?(timeArr.push(value)):null
                    if (!f && route.params.specialist.length>1){
                      objs[value]==undefined?objs[value]=[item.name]:objs[value].push(item.name)
                    }
                  }
                }
              }
              else{
                let f=0
                if (timesbook.includes(value)){
                  f=1
                } 
                !f?timeArr.push(value):null       
                if (!f && route.params.specialist.length>1){
                  objs[value]==undefined?objs[value]=[item.name]:objs[value].push(item.name)
                }       
              }
              start.setMinutes(start.getMinutes()+15*koef)
            }
            timeSpecs=objs
            setTimeSpecs(timeSpecs)
            console.log("objs",objs)
          })
          timeArr.sort()

          const mySet = new Set(timeArr);
          let arr =[]
          let sub = []
          let i = 1
          let k = 1
          for (time of mySet){
            sub.push(time)
            if (i%3==0 || i==mySet.size){
              let val = {id:k, times:sub}
              arr.push(val)
              sub=[]
              k+=1
            }
            i+=1
          }
          setTimeCards(arr)

          break;
        case 2:
          let timeArr2 = [];
          var timeSpecs={}
          route.params.specialist.map((item)=>{
            // console.log(item)
            let startTime = item.tuesday_start
            let endTime = item.tuesday_end
            if (startTime == null){ return 0}
            startTime= startTime.slice(0,5).split(':')
            endTime=endTime.slice(0,5).split(':')
            let start = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(startTime[0], 10), parseInt(startTime[1], 10), 0))
            let end =new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(endTime[0], 10), parseInt(endTime[1], 10), 0))
            let timesbook=[]
            console.log("timebook",timebook)
            if (!timebook.length){
              timeBookedArr.map((it)=>{
                console.log(it)
                let dt=new Date(it.time)
                if (it.specialist==item.name && date.toDateString()==dt.toDateString()){
                  let n=it.duration/15
                  let tmpArr=[]
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.push(t)
                    dt.setMinutes(dt.getMinutes()+15)
                    n-=1
                  }
                  dt=new Date(it.time)
                  n=koeff
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.unshift(t)
                    dt.setMinutes(dt.getMinutes()-15)
                    n-=1
                  }
                  timesbook=timesbook.concat(tmpArr)
                }
              })
              let newEnd = end
              let tmpArr=[]
              let n=koeff-1
              while (n>0){
                newEnd.setMinutes(newEnd.getMinutes()-15)
                let t = (newEnd.getHours()<10?"0"+newEnd.getHours()-3:newEnd.getHours()-3)+":"+(newEnd.getMinutes()<10?"0"+newEnd.getMinutes():newEnd.getMinutes())
                tmpArr.push(t)
                n-=1
              }
              timesbook=timesbook.concat(tmpArr)
            }
            else{
              timebook.map((it)=>{
                let dt=new Date(it.time)
                if (it.specialist==item.name && date.toDateString()==dt.toDateString()){
                  let n=it.duration/15
                  let tmpArr=[]
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.push(t)
                    dt.setMinutes(dt.getMinutes()+15)
                    n-=1
                  }
                  dt=new Date(it.time)
                  n=koeff
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.unshift(t)
                    dt.setMinutes(dt.getMinutes()-15)
                    n-=1
                  }
                  timesbook=timesbook.concat(tmpArr)
                }
              })
              let newEnd = end
              let tmpArr=[]
              let n=koeff-1
              while (n>0){
                newEnd.setMinutes(newEnd.getMinutes()-15)
                let t = (newEnd.getHours()<10?"0"+newEnd.getHours()-3:newEnd.getHours()-3)+":"+(newEnd.getMinutes()<10?"0"+newEnd.getMinutes():newEnd.getMinutes())
                tmpArr.push(t)
                n-=1
              }
              timesbook=timesbook.concat(tmpArr)
            }
            
            var objs=timeSpecs
            while (start.getHours()!=end.getHours() || start.getMinutes()!=end.getMinutes()){
              var value=((start.getHours()-3)<10?"0"+(start.getHours()-3):start.getHours()-3)+":"+(start.getMinutes()<10?"0"+start.getMinutes():start.getMinutes())
              if (date.toDateString()==new Date().toDateString()){
                if (start.getHours()-3>new Date().getHours()){
                  let f=0
                  if (timesbook.includes(value)){
                    f=1
                  } 
                if (!f && route.params.specialist.length>1){
                  objs[value]==undefined?objs[value]=[item.name]:objs[value].push(item.name)
                }
                  !f?timeArr2.push(value):null
                }
                else if (start.getHours()-3==new Date().getHours()){
                  if (start.getMinutes()>=new Date().getMinutes()){
                    let f=0
                    if (timesbook.includes(value)){
                      f=1
                    } 
                  if (!f && route.params.specialist.length>1){
                    objs[value]==undefined?objs[value]=[item.name]:objs[value].push(item.name)
                  }
                    !f?timeArr2.push(value):null

                  }
                }
              }
              else{
                let f=0
                if (timesbook.includes(value)){
                  f=1
                } 
              if (!f && route.params.specialist.length>1){
                objs[value]==undefined?objs[value]=[item.name]:objs[value].push(item.name)
              }
                !f?timeArr2.push(value):null              
              }
              
              start.setMinutes(start.getMinutes()+15*koef)
            }
            timeSpecs=objs
            setTimeSpecs(timeSpecs)
            console.log("objs",objs)

          })
          // console.log("timeArr2",timeArr2)
          timeArr2.sort()

          const mySet2 = new Set(timeArr2);
          console.log("mySet2",mySet2)

          let arr2 =[]
          let sub2 = []
          let i2 = 1
          let k2 = 1
          for (time of mySet2){
            sub2.push(time)
            if (i2%3==0 || i2==mySet2.size){
              let val = {id:k2, times:sub2}
              arr2.push(val)
              sub2=[]
              k2+=1
            }
            i2+=1
          }
          // arr2.splice(-1,koeff)
          setTimeCards(arr2)
           break;
        case 3:
          let timeArr3 = [];
          var timeSpecs={}
          route.params.specialist.map((item)=>{
            let startTime = item.wednesday_start
            let endTime = item.wednesday_end
            if (startTime == null){ return 0}
            startTime= startTime.slice(0,5).split(':')
            endTime=endTime.slice(0,5).split(':')
            let start = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(startTime[0], 10), parseInt(startTime[1], 10), 0))
            let end =new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(endTime[0], 10), parseInt(endTime[1], 10), 0))
            let timesbook=[]
            if (!timebook.length){
              timeBookedArr.map((it)=>{
                console.log(it)
                let dt=new Date(it.time)
                if (it.specialist==item.name && date.toDateString()==dt.toDateString()){
                  let n=it.duration/15
                  let tmpArr=[]
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.push(t)
                    dt.setMinutes(dt.getMinutes()+15)
                    n-=1
                  }
                  dt=new Date(it.time)
                  n=koeff
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.unshift(t)
                    dt.setMinutes(dt.getMinutes()-15)
                    n-=1
                  }
                  timesbook=timesbook.concat(tmpArr)
                }
              })
              let newEnd = end
              let tmpArr=[]
              let n=koeff-1
              while (n>0){
                newEnd.setMinutes(newEnd.getMinutes()-15)
                let t = (newEnd.getHours()<10?"0"+newEnd.getHours()-3:newEnd.getHours()-3)+":"+(newEnd.getMinutes()<10?"0"+newEnd.getMinutes():newEnd.getMinutes())
                tmpArr.push(t)
                n-=1
              }
              timesbook=timesbook.concat(tmpArr)
            }
            else{
              timebook.map((it)=>{
                let dt=new Date(it.time)
                if (it.specialist==item.name && date.toDateString()==dt.toDateString()){
                  let n=it.duration/15
                  let tmpArr=[]
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.push(t)
                    dt.setMinutes(dt.getMinutes()+15)
                    n-=1
                  }
                  dt=new Date(it.time)
                  n=koeff
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.unshift(t)
                    dt.setMinutes(dt.getMinutes()-15)
                    n-=1
                  }
                  timesbook=timesbook.concat(tmpArr)
                }
              })
              let newEnd = end
              let tmpArr=[]
              let n=koeff-1
              while (n>0){
                newEnd.setMinutes(newEnd.getMinutes()-15)
                let t = (newEnd.getHours()<10?"0"+newEnd.getHours()-3:newEnd.getHours()-3)+":"+(newEnd.getMinutes()<10?"0"+newEnd.getMinutes():newEnd.getMinutes())
                tmpArr.push(t)
                n-=1
              }
              timesbook=timesbook.concat(tmpArr)
            }
            
            var objs=timeSpecs

            while (start.getHours()!=end.getHours() || start.getMinutes()!=end.getMinutes()){
              koef=1
              var value=((start.getHours()-3)<10?"0"+(start.getHours()-3):start.getHours()-3)+":"+(start.getMinutes()<10?"0"+start.getMinutes():start.getMinutes())
              if (date.toDateString()==new Date().toDateString()){
                if (start.getHours()-3>new Date().getHours()){
                  let f=0
                  if (timesbook.includes(value)){
                    f=1
                  } 
                if (!f && route.params.specialist.length>1){
                  objs[value]==undefined?objs[value]=[item.name]:objs[value].push(item.name)
                }
                  !f?timeArr3.push(value):null
                }
                else if (start.getHours()-3==new Date().getHours()){
                  if (start.getMinutes()>=new Date().getMinutes()){
                    let f=0
                    if (timesbook.includes(value)){
                      f=1
                    } 
                  if (!f && route.params.specialist.length>1){
                    objs[value]==undefined?objs[value]=[item.name]:objs[value].push(item.name)
                  }
                    !f?timeArr3.push(value):null

                  }
                }
              }
              else{
                let f=0
                if (timesbook.includes(value)){
                  f=1
                } 
              if (!f && route.params.specialist.length>1){
                objs[value]==undefined?objs[value]=[item.name]:objs[value].push(item.name)
              }
                !f?timeArr3.push(value):null              
              }
              
              start.setMinutes(start.getMinutes()+15*koef)
            }
            timeSpecs=objs
            setTimeSpecs(timeSpecs)
            console.log("objs",objs)

          })          
          timeArr3.sort()

          const mySet3 = new Set(timeArr3);
          let arr3 =[]
          let sub3 = []
          let i3 = 1
          let k3 = 1
          for (time of mySet3){
            sub3.push(time)
            if (i3%3==0 || i3==mySet3.size){
              let val = {id:k3, times:sub3}
              arr3.push(val)
              sub3=[]
              k3+=1
            }
            i3+=1
          }
          setTimeCards(arr3)
          break;
        case 4:
          let timeArr4 = [];
          var timeSpecs={}
          route.params.specialist.map((item)=>{
            let startTime = item.thursday_start
            let endTime = item.thursday_end
            if (startTime == null){ return 0}
            startTime= startTime.slice(0,5).split(':')
            endTime=endTime.slice(0,5).split(':')
            let start = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(startTime[0], 10), parseInt(startTime[1], 10), 0))
            let end =new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(endTime[0], 10), parseInt(endTime[1], 10), 0))
            let timesbook=[]
            if (!timebook.length){
              timeBookedArr.map((it)=>{
                console.log(it)
                let dt=new Date(it.time)
                if (it.specialist==item.name && date.toDateString()==dt.toDateString()){
                  let n=it.duration/15
                  let tmpArr=[]
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.push(t)
                    dt.setMinutes(dt.getMinutes()+15)
                    n-=1
                  }
                  dt=new Date(it.time)
                  n=koeff
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.unshift(t)
                    dt.setMinutes(dt.getMinutes()-15)
                    n-=1
                  }
                  timesbook=timesbook.concat(tmpArr)
                }
              })
              let newEnd = end
              let tmpArr=[]
              let n=koeff-1
              while (n>0){
                newEnd.setMinutes(newEnd.getMinutes()-15)
                let t = (newEnd.getHours()<10?"0"+newEnd.getHours()-3:newEnd.getHours()-3)+":"+(newEnd.getMinutes()<10?"0"+newEnd.getMinutes():newEnd.getMinutes())
                tmpArr.push(t)
                n-=1
              }
              timesbook=timesbook.concat(tmpArr)
            }
            else{
              timebook.map((it)=>{
                let dt=new Date(it.time)
                if (it.specialist==item.name && date.toDateString()==dt.toDateString()){
                  let n=it.duration/15
                  let tmpArr=[]
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.push(t)
                    dt.setMinutes(dt.getMinutes()+15)
                    n-=1
                  }
                  dt=new Date(it.time)
                  n=koeff
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.unshift(t)
                    dt.setMinutes(dt.getMinutes()-15)
                    n-=1
                  }
                  timesbook=timesbook.concat(tmpArr)
                }
              })
              let newEnd = end
              let tmpArr=[]
              let n=koeff-1
              while (n>0){
                newEnd.setMinutes(newEnd.getMinutes()-15)
                let t = (newEnd.getHours()<10?"0"+newEnd.getHours()-3:newEnd.getHours()-3)+":"+(newEnd.getMinutes()<10?"0"+newEnd.getMinutes():newEnd.getMinutes())
                tmpArr.push(t)
                n-=1
              }
              timesbook=timesbook.concat(tmpArr)
            }
            
            var objs=timeSpecs

            while (start.getHours()!=end.getHours() || start.getMinutes()!=end.getMinutes()){
              koef=1
              var value=((start.getHours()-3)<10?"0"+(start.getHours()-3):start.getHours()-3)+":"+(start.getMinutes()<10?"0"+start.getMinutes():start.getMinutes())
              if (date.toDateString()==new Date().toDateString()){
                if (start.getHours()-3>new Date().getHours()){
                  let f=0
                  if (timesbook.includes(value)){
                    f=1
                  } 
                if (!f && route.params.specialist.length>1){
                  objs[value]==undefined?objs[value]=[item.name]:objs[value].push(item.name)
                }
                  !f?timeArr4.push(value):null
                }
                else if (start.getHours()-3==new Date().getHours()){
                  if (start.getMinutes()>=new Date().getMinutes()){
                    let f=0
                    if (timesbook.includes(value)){
                      f=1
                    } 
                  if (!f && route.params.specialist.length>1){
                    objs[value]==undefined?objs[value]=[item.name]:objs[value].push(item.name)
                  }
                    !f?timeArr4.push(value):null

                  }
                }
              }
              else{
                let f=0
                if (timesbook.includes(value)){
                  f=1
                } 
              if (!f && route.params.specialist.length>1){
                objs[value]==undefined?objs[value]=[item.name]:objs[value].push(item.name)
              }
                !f?timeArr4.push(value):null              
              }
              
              start.setMinutes(start.getMinutes()+15*koef)
            }
            timeSpecs=objs
            setTimeSpecs(timeSpecs)
            console.log("objs",objs)

          })
          timeArr4.sort()

          const mySet4 = new Set(timeArr4);
          let arr4 =[]
          let sub4 = []
          let i4 = 1
          let k4 = 1
          for (time of mySet4){
            sub4.push(time)
            if (i4%3==0 || i4==mySet4.size){
              let val = {id:k4, times:sub4}
              arr4.push(val)
              sub4=[]
              k4+=1
            }
            i4+=1
          }
          setTimeCards(arr4)
         
          break;
        case 5:
          let timeArr5 = [];
          var timeSpecs={}
          route.params.specialist.map((item)=>{
            let startTime = item.friday_start
            let endTime = item.friday_end
            if (startTime == null){ return 0}
            startTime= startTime.slice(0,5).split(':')
            endTime=endTime.slice(0,5).split(':')
            let start = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(startTime[0], 10), parseInt(startTime[1], 10), 0))
            let end =new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(endTime[0], 10), parseInt(endTime[1], 10), 0))
            let timesbook=[]
            if (!timebook.length){
              timeBookedArr.map((it)=>{
                console.log(it)
                let dt=new Date(it.time)
                if (it.specialist==item.name && date.toDateString()==dt.toDateString()){
                  let n=it.duration/15
                  let tmpArr=[]
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.push(t)
                    dt.setMinutes(dt.getMinutes()+15)
                    n-=1
                  }
                  dt=new Date(it.time)
                  n=koeff
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.unshift(t)
                    dt.setMinutes(dt.getMinutes()-15)
                    n-=1
                  }
                  timesbook=timesbook.concat(tmpArr)
                }
              })
              let newEnd = end
              let tmpArr=[]
              let n=koeff-1
              while (n>0){
                newEnd.setMinutes(newEnd.getMinutes()-15)
                let t = (newEnd.getHours()<10?"0"+newEnd.getHours()-3:newEnd.getHours()-3)+":"+(newEnd.getMinutes()<10?"0"+newEnd.getMinutes():newEnd.getMinutes())
                tmpArr.push(t)
                n-=1
              }
              timesbook=timesbook.concat(tmpArr)
            }
            else{
              timebook.map((it)=>{
                let dt=new Date(it.time)
                if (it.specialist==item.name && date.toDateString()==dt.toDateString()){
                  let n=it.duration/15
                  let tmpArr=[]
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.push(t)
                    dt.setMinutes(dt.getMinutes()+15)
                    n-=1
                  }
                  dt=new Date(it.time)
                  n=koeff
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.unshift(t)
                    dt.setMinutes(dt.getMinutes()-15)
                    n-=1
                  }
                  timesbook=timesbook.concat(tmpArr)
                }
              })
              let newEnd = end
              let tmpArr=[]
              let n=koeff-1
              while (n>0){
                newEnd.setMinutes(newEnd.getMinutes()-15)
                let t = (newEnd.getHours()<10?"0"+newEnd.getHours()-3:newEnd.getHours()-3)+":"+(newEnd.getMinutes()<10?"0"+newEnd.getMinutes():newEnd.getMinutes())
                tmpArr.push(t)
                n-=1
              }
              timesbook=timesbook.concat(tmpArr)
            }
            console.log("timesbook",timesbook)
            var objs=timeSpecs

            while (start.getHours()!=end.getHours() || start.getMinutes()!=end.getMinutes()){
              koef=1
              var value=((start.getHours()-3)<10?"0"+(start.getHours()-3):start.getHours()-3)+":"+(start.getMinutes()<10?"0"+start.getMinutes():start.getMinutes())
              if (date.toDateString()==new Date().toDateString()){
                if (start.getHours()-3>new Date().getHours()){
                  let f=0
                  if (timesbook.includes(value)){
                    f=1
                  } 
                if (!f && route.params.specialist.length>1){
                  objs[value]==undefined?objs[value]=[item.name]:objs[value].push(item.name)
                }
                  !f?timeArr5.push(value):null
                }
                else if (start.getHours()-3==new Date().getHours()){
                  if (start.getMinutes()>=new Date().getMinutes()){
                    let f=0
                    if (timesbook.includes(value)){
                      f=1
                    } 
                  if (!f && route.params.specialist.length>1){
                    objs[value]==undefined?objs[value]=[item.name]:objs[value].push(item.name)
                  }
                    !f?timeArr5.push(value):null

                  }
                }
              }
              else{
                let f=0
                if (timesbook.includes(value)){
                  f=1
                } 
              if (!f && route.params.specialist.length>1){
                objs[value]==undefined?objs[value]=[item.name]:objs[value].push(item.name)
              }
                !f?timeArr5.push(value):null              
              }
              
              start.setMinutes(start.getMinutes()+15*koef)
            }
            timeSpecs=objs
            setTimeSpecs(timeSpecs)
            console.log("objs",objs)

          })
          timeArr5.sort()
          // console.log("timeArr5",timeArr5)
          const mySet5 = new Set(timeArr5);
          let arr5 =[]
          let sub5 = []
          let i5 = 1
          let k5 = 1
          for (time of mySet5){
            sub5.push(time)
            if (i5%3==0 || i5==mySet5.size){
              let val = {id:k5, times:sub5}
              arr5.push(val)
              sub5=[]
              k5+=1
            }
            i5+=1
          }
          setTimeCards(arr5)
         
          break;
        case 6:
          let timeArr6 = [];
          var timeSpecs={}
          route.params.specialist.map((item)=>{
            let startTime = item.saturday_start
            let endTime = item.saturday_end
            if (startTime == null){ return 0}
            startTime= startTime.slice(0,5).split(':')
            endTime=endTime.slice(0,5).split(':')
            let start = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(startTime[0], 10), parseInt(startTime[1], 10), 0))
            let end =new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(endTime[0], 10), parseInt(endTime[1], 10), 0))
            let timesbook=[]
            if (!timebook.length){
              timeBookedArr.map((it)=>{
                console.log(it)
                let dt=new Date(it.time)
                if (it.specialist==item.name && date.toDateString()==dt.toDateString()){
                  let n=it.duration/15
                  let tmpArr=[]
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.push(t)
                    dt.setMinutes(dt.getMinutes()+15)
                    n-=1
                  }
                  dt=new Date(it.time)
                  n=koeff
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.unshift(t)
                    dt.setMinutes(dt.getMinutes()-15)
                    n-=1
                  }
                  timesbook=timesbook.concat(tmpArr)
                }
              })
              let newEnd = end
              let tmpArr=[]
              let n=koeff-1
              while (n>0){
                newEnd.setMinutes(newEnd.getMinutes()-15)
                let t = (newEnd.getHours()<10?"0"+newEnd.getHours()-3:newEnd.getHours()-3)+":"+(newEnd.getMinutes()<10?"0"+newEnd.getMinutes():newEnd.getMinutes())
                tmpArr.push(t)
                n-=1
              }
              timesbook=timesbook.concat(tmpArr)
            }
            else{
              timebook.map((it)=>{
                let dt=new Date(it.time)
                if (it.specialist==item.name && date.toDateString()==dt.toDateString()){
                  let n=it.duration/15
                  let tmpArr=[]
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.push(t)
                    dt.setMinutes(dt.getMinutes()+15)
                    n-=1
                  }
                  dt=new Date(it.time)
                  n=koeff
                  while(n>=0){
                    let t = (dt.getHours()<10?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes())
                    tmpArr.unshift(t)
                    dt.setMinutes(dt.getMinutes()-15)
                    n-=1
                  }
                  timesbook=timesbook.concat(tmpArr)
                }
              })
              let newEnd = end
              let tmpArr=[]
              let n=koeff-1
              while (n>0){
                newEnd.setMinutes(newEnd.getMinutes()-15)
                let t = (newEnd.getHours()<10?"0"+newEnd.getHours()-3:newEnd.getHours()-3)+":"+(newEnd.getMinutes()<10?"0"+newEnd.getMinutes():newEnd.getMinutes())
                tmpArr.push(t)
                n-=1
              }
              timesbook=timesbook.concat(tmpArr)
            }
            
            var objs=timeSpecs

            while (start.getHours()!=end.getHours() || start.getMinutes()!=end.getMinutes()){
              koef=1
              var value=((start.getHours()-3)<10?"0"+(start.getHours()-3):start.getHours()-3)+":"+(start.getMinutes()<10?"0"+start.getMinutes():start.getMinutes())
              if (date.toDateString()==new Date().toDateString()){
                if (start.getHours()-3>new Date().getHours()){
                  let f=0
                  if (timesbook.includes(value)){
                    f=1
                  } 
                if (!f && route.params.specialist.length>1){
                  objs[value]==undefined?objs[value]=[item.name]:objs[value].push(item.name)
                }
                  !f?timeArr6.push(value):null
                }
                else if (start.getHours()-3==new Date().getHours()){
                  if (start.getMinutes()>=new Date().getMinutes()){
                    let f=0
                    if (timesbook.includes(value)){
                      f=1
                    } 
                  if (!f && route.params.specialist.length>1){
                    objs[value]==undefined?objs[value]=[item.name]:objs[value].push(item.name)
                  }
                    !f?timeArr6.push(value):null

                  }
                }
              }
              else{
                let f=0
                if (timesbook.includes(value)){
                  f=1
                } 
              if (!f && route.params.specialist.length>1){
                objs[value]==undefined?objs[value]=[item.name]:objs[value].push(item.name)
              }
                !f?timeArr6.push(value):null              
              }
              
              start.setMinutes(start.getMinutes()+15*koef)
            }
            timeSpecs=objs
            setTimeSpecs(timeSpecs)
            console.log("objs",objs)

          })
          timeArr6.sort()
          const mySet6 = new Set(timeArr6);
          let arr6 =[]
          let sub6= []
          let i6 = 1
          let k6 = 1
          for (time of mySet6){
            sub6.push(time)
            if (i6%3==0 || i6==mySet6.size){
              let val = {id:k6, times:sub6}
              arr6.push(val)
              sub6=[]
              k6+=1
            }
            i6+=1
          }
          setTimeCards(arr6)
         
          break;
        default:
          setTimeCards([])
          break;
      }
      setLoading(false)

    }

    const clickButton=()=>{
      route.params.setTime(clickedTime)
      route.params.setDate(startDate)
      route.params.setNextFlag(false)
      route.params.specialist.length>1?route.params.dataForm.datarequest["specialist"]=timeSpecss[clickedTime][0]:null;
      route.params.dataForm.datarequest["date"]=clickedDT
      route.params.dataForm.datarequest["time"]=clickedTime
      route.params.navigation.goBack()
    
    }
    const onDateChange = (date) => {
      // setTimeSpecs({})
      setLoading(true)
      setStartDate(new Date(date))
      // setTimeout(()=>makeWorkTimes(new Date(date)), 500)
      makeWorkTimes(new Date(date))
      // setTimeout(()=>, 500)
      // setRefr(!refr)
    }
    const onClick =(time)=>{
      console.log(startDate)
      setClickedDT(startDate)
      setClickedTime(time)
  }
    const renderInsideItem = ({ item }) => 
    (
      <TouchableOpacity style={(clickedTime==item && clickedDT.toISOString()==startDate.toISOString())?styles.timeCardChecked:styles.timeCard} onPress={()=>onClick(item)}>
      <Text>{item}</Text>
  </TouchableOpacity>
    );
    const renderItem = ({ item }) => (

      <FlatList horizontal={true} data={item.times} renderItem={renderInsideItem}/>
    );
  return (
    <View style={[styles.containerPages,{backgroundColor:"#FFF1E0", padding:10}]}>
    <CalendarPicker
      onDateChange={onDateChange}
      minDate={new Date()}
      height={windowHeight*0.5}
      startFromMonday={true}
      weekdays={[i18n.t("mo"), i18n.t("tue"), i18n.t("wed"), i18n.t("thu"), i18n.t("fri"), i18n.t("sat"), i18n.t("sun")]}
      months={[i18n.t("january"), i18n.t("february"), i18n.t("march"), i18n.t("april"), i18n.t("may"), i18n.t("june"), i18n.t("july"), i18n.t("august"), i18n.t("september"), i18n.t("october"), i18n.t("november"), i18n.t("december")]}
      previousTitle={i18n.t("previous")}
      nextTitle={i18n.t("next")}
      selectedDayColor="#feccd5"
      // todayBackgroundColor="transparent"
      />

    <View style={{margin:10, alignItems:"center", maxHeight:windowHeight*0.45}}>
    {isLoading?<ActivityIndicator style={styles.containerIndicator} animating={true} size="large" color="#e9cf63"/>:<FlatList keyExtractor={item => item.id}  data={timeCards} extraData={refr} renderItem={renderItem}/>
}</View>
    <Button title={i18n.t("select")} onPress={clickButton}/>
  </View>


  )
};

