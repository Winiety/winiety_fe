import { createStore, createTypedHooks } from 'easy-peasy';
import userSettingsModel, { UserSettingsModel } from './userSettings';

interface StoreModel {
  userSettings: UserSettingsModel;
}

interface InitialState {
  userSettings: Pick<UserSettingsModel, 'isDarkTheme'>;
}

const storeModel: StoreModel = {
  userSettings: userSettingsModel,
};

const store = createStore<StoreModel, InitialState>(storeModel, {
  initialState: {
    userSettings: {
      isDarkTheme: window.matchMedia('(prefers-color-scheme: dark)').matches,
    },
  },
});

const typedHooks = createTypedHooks<StoreModel>();

export const { useStoreActions } = typedHooks;
export const { useStoreDispatch } = typedHooks;
export const { useStoreState } = typedHooks;

export default store;
