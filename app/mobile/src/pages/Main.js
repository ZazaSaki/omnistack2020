import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, View, Text, TextInput, TouchableOpacity} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
import {MaterialIcons} from '@expo/vector-icons';

function Main({navigation}){
    
    const[currentRegion, setCurrentRegion] = useState(null);
    
    useEffect(()=>{
        async function loadInicialPosition(){
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy:true,
                });

                const {latitude, longitude} = coords; 

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                });
            }
        }

        loadInicialPosition();
    },[]);
    
    if (!currentRegion) {
        return null;
    }

    return (
        <>
            <MapView initialRegion={currentRegion} style = {styles.map}>
                <Marker coordinate = {{latitude: 39.8210705,longitude: -7.4974984}}>
                    <Image style = {styles.avatar} source = {{uri: 'https://scontent.flis4-1.fna.fbcdn.net/v/t31.0-1/p160x160/14206172_1015936295185979_6994080133933888413_o.jpg?_nc_cat=101&_nc_ohc=s3Zt-Zv-fzEAX8fl-yk&_nc_ht=scontent.flis4-1.fna&_nc_tp=1002&oh=fd4581f5af6c08f5f610d8c07e074dc8&oe=5E9CE873'}} />
                    <Callout onPress={()=>{
                        navigation.navigate('Profile', {github_username:"ZazaSaki"});
                    }}>
                        <View style = {styles.callout}>
                            <Text style = {styles.devName}>Isac Cruz</Text>
                            <Text style = {styles.devBio}>Saki bio yea</Text>
                            <Text style = {styles.devTechs}>Java, NodeJS, C#</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>
            <View style = {styles.searchForm} >
                    <TextInput 
                        style = {styles.searchInput}
                        placeholder = "Buscar Dev's por techs...."
                        placeholderTextColor = "#999"
                        autoCapitalize = "words"
                        autoCorrect = {false} 
                    ></TextInput>

                    <TouchableOpacity onPress={() => {}} style = {styles.loadButton} >
                        <MaterialIcons name= "my-location" size={20} color = "#FFF" ></MaterialIcons>
                    </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    map : {
        flex : 1,
    },

    avatar: {
        width : 30,
        height : 30,
    },
    
    callout:{
        width : 300,
    },

    devName: {
        fontWeight: "bold",
        fontSize: 20,
    },

    devBio: {
        color: '#666',
        marginTop: 5,
    },

    devTechs: {
        marginTop:5,
    },

    searchForm: {
        position:'absolute',
        top: 20,
        left:20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },

    searchInput:{
        flex:1,
        height:50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset:{
            width:4,
            height:4,
        },
        elevation:2,
    },

    loadButton:{
        width: 50,
        height:50,
        backgroundColor: '#8E4DFF',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:15,

    },


});

export default Main;