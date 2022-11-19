import { SCREEN_TITLES } from './labels'
import { IScreen } from '../models/models'
import { ScreenType } from './types'

const fillScreenOptions = (key: ScreenType) => ({
  name: key,
  title: SCREEN_TITLES[key],
})

export const SCREENS: { [key in ScreenType]: IScreen } = {
  DASHBOARD: {
    ...fillScreenOptions('DASHBOARD'),
  },
  ADD_ASSET: {
    ...fillScreenOptions('ADD_ASSET'),
  },
}

export type RootStackParamList = {
  [key in ScreenType]: any
}
