import { MetaConfig } from 'payload'

const defaultMeta: MetaConfig = {
  defaultOGImageType: 'dynamic',
  titleSuffix: ' - Pherus administrative dashboard',
  description: 'Pherus administrative dashboard',
  openGraph: {
    description: 'Pherus administrative dashboard',
  },
  icons: [
    {
      url: `${process.env.PAYLOAD_PUBLIC_SERVER_URL || ''}/favicon.svg`,
      fetchPriority: 'high',
      type: 'image/svg',
      rel: 'icon',
      sizes: 'any',
    },
  ],
}

export default defaultMeta
