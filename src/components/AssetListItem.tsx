import React from 'react';
import { IAsset } from '../shared/models/models';
import { StyleSheet, View, Text } from 'react-native';
import { getAverageCost } from '../shared/helpers/assetHelper';
import { COLORS, FONTS } from '../shared/constants/styles';

export default function AssetListItem(props: { asset: IAsset }) {
  const asset = props.asset;
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Text
          style={styles.title}
          variant="body1">{`${asset.key} (${asset.name})`}</Text>
        <Text
          style={styles.text}
          variant="body2">{`Average cost: ${getAverageCost(asset)}`}</Text>
        <Text
          style={styles.text}
          variant="body2">{`Amount: ${asset.amount}`}</Text>
        <Text
          style={styles.text}
          variant="body2">{`Invested: $${asset.invested}`}</Text>
      </View>

      <View style={styles.itemRight}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: COLORS.BG_DEFAULT,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: COLORS.BORDER_DEFAULT,
  },
  itemLeft: {
    width: '50%',
    flex: 1,
    flexDirection: 'column',
  },
  itemRight: {
    width: '50%',
  },
  title: {
    fontFamily: FONTS.IBM_Plex_Bold,
    color: COLORS.TEXT_DEFAULT,
  },
  text: {
    fontFamily: FONTS.IBM_Plex_MediumItalic,
    color: COLORS.TEXT_DEFAULT,
  },
});
