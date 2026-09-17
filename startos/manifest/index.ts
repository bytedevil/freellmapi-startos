import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'freellmapi',
  title: 'FreeLLMAPI',
  license: 'MIT',
  packageRepo: 'https://github.com/bytedevil/freellmapi-startos',
  upstreamRepo: 'https://github.com/tashfeenahmed/freellmapi',
  marketingUrl: 'https://freellmapi.co',
  donationUrl: null,
  description: { short, long },
  volumes: ['freellmapi-data'],
  images: {
    'freellmapi-image': {
      source: { dockerTag: 'ghcr.io/tashfeenahmed/freellmapi:sha-65c7d2f' },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {},
})
