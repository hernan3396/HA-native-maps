import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>Ubicá tu bus</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 100,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "crimson",
        justifyContent: "center",
        alignItems: "center"
    },
    headerText: {
        color: "white",
        fontSize: 18
    }
})
