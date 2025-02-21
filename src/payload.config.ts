// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { resendAdapter } from '@payloadcms/email-resend'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { getServerSideURL } from '@/environments/getURL'
import { Media, Pages, Posts, Tags, Users, Comments } from './collections'
import { defaultLexical } from '@/environments/fields/defaultLexical'
import { Header } from './components/Header/config'
import { Footer } from './components/Footer/config'
import { plugins } from '@/environments/plugins'
import defaultMeta from '@/environments/metaConfig'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const Brand = './components/Logo/Brand.tsx'
const Icon = './components/Logo/Icons.tsx'

export default buildConfig({
  serverURL: process.env.NODE_ENV === 'production' ? getServerSideURL() : undefined,
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
      graphics: {
        Icon: Icon,
        Logo: Brand,
      },
    },
    meta: defaultMeta,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    avatar: 'default',
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [Pages, Posts, Media, Tags, Users, Comments],
  globals: [Header, Footer],
  cors: [getServerSideURL()].filter(Boolean),
  csrf: [getServerSideURL()].filter(Boolean),
  plugins: [...plugins],
  secret: process.env.PAYLOAD_SECRET,
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_DEFAULT_EMAIL || '',
    defaultFromName: process.env.RESEND_FROM_NAME || '',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  graphQL: {
    disablePlaygroundInProduction: false,
  },
  sharp,
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
