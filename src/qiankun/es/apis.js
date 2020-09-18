import { __assign, __awaiter, __generator, __read, __rest, __spread } from 'tslib'
import { mountRootParcel, registerApplication, start as startSingleSpa } from 'single-spa'
import { loadApp } from './loader'
import { doPrefetchStrategy } from './prefetch'
import { Deferred } from './utils'
window.__POWERED_BY_QIANKUN__ = true
let microApps = [] // eslint-disable-next-line import/no-mutable-exports

export var frameworkConfiguration = {}
const frameworkStartedDefer = new Deferred()
export function registerMicroApps (apps, lifeCycles) {
  const _this = this // Each app only needs to be registered once

  const unregisteredApps = apps.filter(function (app) {
    return !microApps.some(function (registeredApp) {
      return registeredApp.name === app.name
    })
  })
  microApps = __spread(microApps, unregisteredApps)
  unregisteredApps.forEach(function (app) {
    const name = app.name
    const activeRule = app.activeRule
    const props = app.props
    const appConfig = __rest(app, ['name', 'activeRule', 'props'])

    registerApplication({
      name: name,
      app: function app () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [4,
                /* yield */
                  frameworkStartedDefer.promise]

              case 1:
                _a.sent()

                return [2,
                /* return */
                  loadApp(__assign({
                    name: name,
                    props: props
                  }, appConfig), frameworkConfiguration, lifeCycles)]
            }
          })
        })
      },
      activeWhen: activeRule,
      customProps: props
    })
  })
}
export function loadMicroApp (app, configuration) {
  if (configuration === void 0) {
    configuration = frameworkConfiguration
  }

  const props = app.props
  const appConfig = __rest(app, ['props'])

  return mountRootParcel(function () {
    return loadApp(appConfig, configuration)
  }, __assign({
    domElement: document.createElement('div')
  }, props))
}
export function start (opts) {
  if (opts === void 0) {
    opts = {}
  }

  frameworkConfiguration = __assign({
    prefetch: true,
    singular: true,
    sandbox: true
  }, opts)

  const prefetch = frameworkConfiguration.prefetch
  const sandbox = frameworkConfiguration.sandbox
  const singular = frameworkConfiguration.singular
  const urlRerouteOnly = frameworkConfiguration.urlRerouteOnly
  const importEntryOpts = __rest(frameworkConfiguration, ['prefetch', 'sandbox', 'singular', 'urlRerouteOnly'])

  if (prefetch) {
    doPrefetchStrategy(microApps, prefetch, importEntryOpts)
  }

  if (sandbox) {
    if (!window.Proxy) {
      console.warn('[qiankun] Miss window.Proxy, proxySandbox will degenerate into snapshotSandbox') // 快照沙箱不支持非 singular 模式

      if (!singular) {
        console.error('[qiankun] singular is forced to be true when sandbox enable but proxySandbox unavailable')
        frameworkConfiguration.singular = true
      }
    }
  }

  startSingleSpa({
    urlRerouteOnly: urlRerouteOnly
  })
  frameworkStartedDefer.resolve()
}
