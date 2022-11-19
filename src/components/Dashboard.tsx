import { FAB } from '@react-native-material/core'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { StyleSheet, View } from 'react-native'
import { RootStackParamList } from '../shared/constants/screens'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<RootStackParamList, 'DASHBOARD'>

export default function Dashboard({ navigation }: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <FAB
          style={styles.addButton}
          useNativeDriver={false}
          icon={(props) => (
            <Icon
              name="plus"
              onPress={() => navigation.navigate('DASHBOARD')}
              {...props}
            />
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#5A9BD4',
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
  },
})
