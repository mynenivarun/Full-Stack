import React from 'react';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import { useParams } from "react-router-native";
import { FlatList, View, StyleSheet } from 'react-native';
import theme from '../theme';
import ReviewItem from './ReviewItem';

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

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryView = () => {
  const { id } = useParams();
  const { repositories, fetchMore } = useRepository( id );

  if (repositories === undefined){return(<></>);}

  repositories.singleView = true;

  const onEndReach = () => {
    fetchMore();
  };

  return(
    
    <FlatList
      data={repositories.reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => <RepositoryItem item = {repositories} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};


export default RepositoryView;