import { MetaConfig } from 'payload'

const defaultMeta: MetaConfig = {
  defaultOGImageType: 'dynamic',
  description: 'This is my custom CMS built with Payload.',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon.svg',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon.svg',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon.svg',
    },
    {
      rel: 'manifest',
      url: '/manifest.json',
    },
  ],
  title: 'Pherus - CMS',
  titleSuffix: 'Pherus - ',
}

export default defaultMeta
