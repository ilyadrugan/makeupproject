
    import { View, Text, TouchableOpacity, Image } from 'react-native'
    import styles from '../../constant/styles';
    import  React, {useState,useEffect} from 'react';
    import { Icon } from 'react-native-elements';
    import urls from '../../modules/urls';
    import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import { i18n , lang} from '../../i18n';

    export default function CategoryProcedures({category,category_en_name,category_icon, navigation}) {
        const [procedures, setProcedures] = useState([])
        const [data, setData] = useState([])
        const [isLoading, setLoading] = useState(true);
        useEffect(() => {
            fetch(urls.procedures(), {
              method: "GET",
            })
            .then(resp => resp.json())
            .then(data => {
              console.log(data)
              let newArr = [];
              let dataArr = [];
              data.map((item,i)=>{
                console.log(item.category,category_en_name)
                if(item.category==category_en_name){
                    newArr.push(item)
                    let map = {"value":item[lang]}
                    dataArr.push(map)
                } 
              })
              console.log("dataArr",dataArr)
              setData(dataArr)
              setProcedures(newArr)
              setLoading(false)
            })
            .catch(error => console.log("Error is : ", error))
            
          }, [])

    
        return(

        <Dropdown
        label={category}
        data={data}
        baseColor={'transparent'}
      />


        );
    }