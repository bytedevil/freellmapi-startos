import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  /**
   * ======================== Setup (optional) =======================
   *
   * Fetch any resources or run any preliminary commands here.
   */
  console.info(i18n('Starting FreeLLMAPI!'))

  /**
   * ======================== Daemons ========================
   *
   * Define one or more daemons that make up the service runtime. Each daemon
   * declares a `ready` health check, run on every polling interval, that reports
   * its state to the user.
   *
   * The ids here ('freellmapi', 'freellmapi-image', 'freellmapi-data',
   * 'freellmapi-subcontainer') are arbitrary — rename them to suit your service.
   * 'freellmapi-image' must match an image key in startos/manifest/index.ts, and
   * 'freellmapi-data' must match an entry in the manifest `volumes` array.
   */
  return sdk.Daemons.of(effects).addDaemon('freellmapi', {
    subcontainer: sdk.SubContainer.of(
      effects,
      { imageId: 'freellmapi-image' },
      sdk.Mounts.of().mountVolume({
        volumeId: 'freellmapi-data',
        subpath: null,
        mountpoint: '/data',
        readonly: false,
      }),
      'freellmapi-subcontainer',
    ),
    // The pre-built image runs: node server/dist/index.js (port 3001 by default)
    exec: { command: ['node', 'server/dist/index.js'] },
    ready: {
      display: i18n('Web Interface'),
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: i18n('The web interface is ready'),
          errorMessage: i18n('The web interface is not ready'),
        }),
    },
    requires: [],
  })
})
