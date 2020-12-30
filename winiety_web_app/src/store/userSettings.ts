import { action, Action } from 'easy-peasy';

export interface UserSettingsModel {
  isDarkTheme: boolean;
  changeTheme: Action<UserSettingsModel, boolean>;
}

const userSettingsModel: UserSettingsModel = {
  isDarkTheme: false,
  changeTheme: action((state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state.isDarkTheme = payload;
  }),
};

export default userSettingsModel;
