import { createStore, createTypedHooks, persist } from 'easy-peasy';
import userSessionModel, { UserSessionModel } from './userSession';
import userSettingsModel, { UserSettingsModel } from './userSettings';

interface StoreModel {
  userSettings: UserSettingsModel;
  userSession: UserSessionModel;
}

interface InitialState {
  userSettings: Pick<UserSettingsModel, 'isDarkTheme'>;
  userSession: Pick<UserSessionModel, 'isAuthenticated'>;
}

const storeModel: StoreModel = {
  userSettings: persist(userSettingsModel),
  userSession: persist(userSessionModel),
};

const store = createStore<StoreModel, InitialState>(storeModel, {
  initialState: {
    userSettings: {
      isDarkTheme: window.matchMedia('(prefers-color-scheme: dark)').matches,
    },
    userSession: {
      isAuthenticated: false,
    },
  },
});

const typedHooks = createTypedHooks<StoreModel>();

export const { useStoreActions } = typedHooks;
export const { useStoreDispatch } = typedHooks;
export const { useStoreState } = typedHooks;

export default store;
