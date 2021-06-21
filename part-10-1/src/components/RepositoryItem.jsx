import React from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import Text from './Text';
import theme from '../theme';
import * as Linking from 'expo-linking';


const formatNumber = (num) => {
    if (num >= 1000) {
        return (`${Math.round(num / 1000 * 10) / 10}k`);
    }else{
        return num;
    }
};

const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      height: 100
    },
    containerStats: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        height: 50
      },
    tab: {
        flexGrow: 0,
        color: "white",
        justifyContent: "space-around",
        paddingTop: 5,
        paddingLeft: 15
    },
    tabStats: {
        flexGrow: 1,
        color: "white",
        justifyContent: "space-around",
        paddingTop: 5,
        paddingLeft: 15 
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    languageLogo: {
        height: 30,
        backgroundColor: theme.colors.primary,
        flexShrink: 1,
        padding: 5,
        borderRadius: 10
    }
  });

const StatsTab = ({text,number,testID}) => (
    <View style={styles.tabStats}>
        <Text testID={testID} fontWeight="bold">{formatNumber(number)}</Text> 
        <Text>{text}</Text>
    </View>
);

const RepositoryItem = ({ item }) => {
    return(
    <View style = {{ backgroundColor: "white" }}>
        <View style={styles.container}>
            <View style={styles.tab}>
                <Image
                style={styles.tinyLogo}
                source={{ uri: item.ownerAvatarUrl }}
                />
            </View>
            <View style={styles.tab}>
                <Text fontWeight="bold" testID="fullName">{item.fullName}</Text>
                <Text testID="description">{item.description}</Text>
                <View style={{display: "flex", flexDirection: "row"}}>
                    <Text color="white" fontWeight="bold" style={styles.languageLogo} testID="language">{item.language}</Text>
                </View>   
            </View>
        </View>
        <View style={styles.containerStats}>
            <StatsTab text="Stars" testID="stargazersCount" number={item.stargazersCount}/>
            <StatsTab text="Forks" testID="forksCount" number={item.forksCount}/>
            <StatsTab text="Reviews" testID="reviewCount" number={item.reviewCount}/>
            <StatsTab text="Rating" testID="ratingAverage" number={item.ratingAverage}/>
        </View>
        {item.singleView ? <Button onPress={()=> Linking.openURL(item.url)} title='Open in GitHub' /> : <></>}
    </View>
);};

export default RepositoryItem;