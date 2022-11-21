import React from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import { RootStackParamList, SCREENS } from '../shared/constants/screens';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAssets } from '../shared/hooks/useAsset';
import AssetListItem from './AssetListItem';
import { IAsset } from '../shared/models/models';
import { COLORS } from '../shared/constants/styles';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'DASHBOARD'>;

export default function Dashboard({ navigation }: Props) {
  const assets = useAssets();
  const renderItem = ({ item }) => {
    return <AssetListItem asset={item}></AssetListItem>;
  };
  return (
    <View style={styles.screen}>
      <FlatList
        data={assets}
        renderItem={renderItem}
        keyExtractor={(item: IAsset) => item.key}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="+"
          style={styles.addButton}
          color={COLORS.TEXT_DEFAULT}
          onPress={() => navigation.navigate(SCREENS.ADD_ASSET.name)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.BG_DEFAULT,
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  addButton: {
    position: 'absolute',
    bottom: 50,
    right: 50,
    height: 50,
    width: 50,
    margin: 0,
    padding: 0,
    borderColor: COLORS.BORDER_DEFAULT,
    color: COLORS.TEXT_DEFAULT,
    backgroundColor: COLORS.BG_DEFAULT,
    borderWidth: 2,
    borderRadius: 0,
  },
  list: {
    width: '100%',
  },
  listItem: {},
});
