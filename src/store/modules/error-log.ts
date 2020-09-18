import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'

interface MyErrorLog {
  err: Error;
  vm: any;
  info: string;
  url: string;
}

export interface MyErrorLogState {
  logs: MyErrorLog[];
}

@Module({ dynamic: true, store, name: 'errorLog' })
class ErrorLog extends VuexModule implements MyErrorLogState {
  public logs: MyErrorLog[] = []

  @Mutation
  private ADD_ERROR_LOG (log: MyErrorLog) {
    this.logs.push(log)
  }

  @Mutation
  private CLEAR_ERROR_LOG () {
    this.logs.splice(0)
  }

  @Action
  public AddErrorLog (log: MyErrorLog) {
    this.ADD_ERROR_LOG(log)
  }

  @Action
  public ClearErrorLog () {
    this.CLEAR_ERROR_LOG()
  }
}

export const ErrorLogModule = getModule(ErrorLog)
