import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from "react-router-native";
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});


const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    const onChangeSearch = query => props.setSearchQuery(query);

    return (
      <>
      <RNPickerSelect
        onValueChange={(value) => props.setSorting(value)}
        items={[
            { label: 'Latest repositories', value: 'latest' },
            { label: 'Highest rated repositories', value: 'highest' },
            { label: 'Lowest rated repositories', value: 'lowest' },
        ]}
        style={pickerSelectStyles}
        value={props.sorting}
      />
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={props.searchQuery}
      />
      </>
    );
  };

  render(){
    const props = this.props;
  
    const repositoryNodes = props.repositories
      ? props.repositories.edges.map(edge => edge.node)
      : [];
  
    const TouchableRepositoryItem = ({ item }) => {
      const onPress = () => {
        props.history.push(`/repo/${item.id}`);
      };
    
      return(
        <TouchableOpacity style={styles.button} onPress={onPress} >
          <RepositoryItem item={item} />
        </TouchableOpacity>  
      );
    };
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={TouchableRepositoryItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () =>{
  const [sorting, setSorting] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryDebounced] = useDebounce(searchQuery, 500);
  const { repositories, fetchMore } = useRepositories(sorting, searchQueryDebounced);
  const history = useHistory();

  const onEndReach = () => {
    fetchMore();
  };

  return(
    <RepositoryListContainer 
      repositories={repositories} sorting={sorting} setSorting={setSorting}
      searchQuery={searchQuery} setSearchQuery={setSearchQuery}
      history={history} onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;