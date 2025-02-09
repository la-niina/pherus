import { Config } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  EXPERIMENTAL_TableFeature,
  UploadFeature,
  BlocksFeature,
  AlignFeature,
  HeadingFeature,
  ChecklistFeature,
  SubscriptFeature,
  BlockquoteFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'
import { link } from './link'
import { Banner } from '@/blocks/Banner/config'
import { Code } from '@/blocks/Code/config'

export const defaultLexical: Config['editor'] = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures.filter((feature) => feature.key !== 'link'),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    HeadingFeature({
      enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    }),
    ChecklistFeature(),
    SubscriptFeature(),
    BlockquoteFeature(),
    AlignFeature(),
    ParagraphFeature(),
    UnderlineFeature(),
    BoldFeature(),
    ItalicFeature(),
    EXPERIMENTAL_TableFeature(),
    UploadFeature({
      collections: {
        media: {
          fields: [
            {
              name: 'enableLink',
              type: 'checkbox',
              label: 'Enable Link',
            },
            link({
              appearances: false,
              disableLabel: true,
              overrides: {
                admin: {
                  condition: (_, data) => Boolean(data?.enableLink),
                },
              },
            }),
          ],
        },
      },
    }),
    LinkFeature({
      enabledCollections: ['pages', 'posts'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: ({ linkType }) => linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: (value: any, options: any) => {
              if (options?.siblingData?.linkType === 'internal') {
                return true // no validation needed, as no url should exist for internal links
              }
              return value ? true : 'URL is required'
            },
          },
        ]
      },
    }),
    BlocksFeature({
      blocks: [
        {
          slug: 'br',
          fields: [
            {
              name: 'ignore',
              type: 'text',
            },
          ],

          interfaceName: 'BrBlock',
        },
        Banner,
        Code,
      ],
    }),
  ],
})
