import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

let timer = null;

export default function Search() {
    const [data, setData] = useState([]);
    const [linea, setLinea] = useState("")

    useEffect(() => {

        return () => {
            if (timer) {
                clearInterval(timer)
            }
        }
    }, []);

    const handleSearch = async () => {
        Keyboard.dismiss();
        if (timer) {
            clearInterval(timer)
        }
        timer = setInterval(getBuses, 5000)
    };

    const getBuses = async () => {
        const response = await Axios.post(
            "http://www.montevideo.gub.uy/buses/rest/stm-online",
            {
                empresa: "50",
                lineas: [linea],
            }
        );

        setData(
            response.data.features.map((feature) => ({
                longitude: feature.geometry.coordinates[0],
                latitude: feature.geometry.coordinates[1],
                id: feature.properties.id,
            }))
        );
    };




    return (
        <View style={styles.container}>

            <TextInput
                placeholder="busca una linea..."
                value={linea}
                onChangeText={setLinea}
            />
            <Button title="Buscar" onPress={handleSearch} />

            <MapView style={styles.map} initialRegion={{
                latitude: -34.909557,
                longitude: -56.169695,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            }} >
                {data.map((item) => (<Marker key={item.id} coordinate={{ latitude: item.latitude, longitude: item.longitude }} />))}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: "90%",
        height: "60%",
        borderWidth: 1,
        marginTop: 20,
    }
})
