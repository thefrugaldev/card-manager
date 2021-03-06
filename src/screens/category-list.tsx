import React, {FC} from 'react';
import {View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import Layout from '@shared/components/Layout';
import MockCategories from '../data/mock-categories';
import {Category} from '../shared/interfaces/Category';
import Screens from '.';
import CategoryDetailScreen from './category-detail';
import {Text} from 'react-native';
import {defaultStyles} from '@shared/styles/default-styles';

// TODO: Implement Search Component

const CategoryListStack = createStackNavigator();

const CategoryListStackScreen: FC = () => {
  return (
    <CategoryListStack.Navigator>
      <CategoryListStack.Screen
        name={`${Screens.CategoryList}`}
        component={CategoryListScreen}
      />
      <CategoryListStack.Screen
        name={`${Screens.CategoryDetail}`}
        component={CategoryDetailScreen}
        options={({route}: any) => ({
          title: route.params?.title,
        })}
      />
    </CategoryListStack.Navigator>
  );
};

const CategoryListScreen: FC<{navigation: any}> = ({
  navigation: {navigate},
}) => {
  const renderCategory = ({item: category}: any) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigate(`${Screens.CategoryDetail}`, {
            id: category.id,
            title: category.name,
          })
        }>
        <View>
          <Text style={defaultStyles.text}>{category.name || 'Test'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Layout>
      <FlatList
        data={MockCategories}
        renderItem={renderCategory}
        keyExtractor={(cat: Category) => `${cat.id}`}
      />
    </Layout>
  );
};

export default CategoryListStackScreen;
