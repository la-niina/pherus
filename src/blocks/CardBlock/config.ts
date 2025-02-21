import { linkGroup } from '@/environments/fields/linkGroup'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const Cards: Block = {
  slug: 'cards',
  interfaceName: 'CardBlock',
  fields: [
    {
      name: 'cardType',
      type: 'select',
      defaultValue: 'widecard',
      options: [
        { label: 'Wide Card', value: 'widecard' },
        { label: 'Grid Cards', value: 'gridcard' },
      ],
    },
    {
      name: 'wideCards',
      type: 'array',
      fields: [
        {
          name: 'wideRichText',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
        },
        linkGroup({
          overrides: {
            maxRows: 2,
          },
        }),
        {
          name: 'wideImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData.cardType === 'widecard',
      },
    },
    {
      name: 'gridCards',
      type: 'array',
      fields: [
        {
          name: 'gridRichText',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData.cardType === 'gridcard',
      },
    },
  ],
}
