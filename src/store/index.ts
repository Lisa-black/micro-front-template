import Vue from 'vue'
import Vuex from 'vuex'
import { MyAppState } from './modules/app'
import { MyUserState } from './modules/user'
import { MyTagsViewState } from './modules/tags-view'
import { MyErrorLogState } from './modules/error-log'
import { MyPermissionState } from './modules/permission'
import { MySettingsState } from './modules/settings'

Vue.use(Vuex)

export interface MyRootState {
  app: MyAppState;
  user: MyUserState;
  tagsView: MyTagsViewState;
  errorLog: MyErrorLogState;
  permission: MyPermissionState;
  settings: MySettingsState;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<MyRootState>({})
