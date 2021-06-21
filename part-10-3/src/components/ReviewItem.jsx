import React from 'react';
import Text from './Text';
import { format } from 'date-fns';
import { View, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
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
    ratingContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: theme.colors.primary,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    languageLogo: {
        height: 30,
        backgroundColor: theme.colors.primary,
        flexShrink: 1,
        padding: 5,
        borderRadius: 10
    }
  });
const ReviewItem = ({ review }) => {

    const dateFormatter = (date) => {
      return(format(new Date(date),'dd.MM.yyyy'));
    };
  
    return(
      <View style = {{ backgroundColor: "white" }}>
        <View style={styles.container}>
            <View style={styles.tab}>
              <View style={styles.ratingContainer}>
                <Text fontWeight="bold" color="primary">{review.node.rating}</Text>
              </View>
            </View>
            <View style={styles.tab}>
                <Text fontWeight="bold" >{review.node.user.username}</Text>
                <Text>{dateFormatter(review.node.createdAt)}</Text>
                <Text>{review.node.text}</Text>
            </View>
        </View>
      </View>
    );
  };

export default ReviewItem;