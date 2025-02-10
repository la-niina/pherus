import { Block } from 'payload'

export const Charts: Block = {
  slug: 'charts',
  interfaceName: 'ChartBlock',
  fields: [
    {
      name: 'chatType',
      type: 'select',
      defaultValue: 'line',
      hasMany: false,
      options: [
        { label: 'Line Chart', value: 'line' },
        { label: 'Bar Chart', value: 'bar' },
        { label: 'Pie Chart', value: 'pie' },
      ],
    },
    {
      name: 'layoutType',
      type: 'select',
      defaultValue: 'inner',
      hasMany: false,
      options: [
        { label: 'Inner', value: 'inner' },
        { label: 'Outer', value: 'outer' },
      ],
    },
    {
      name: 'chartConfig',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'color',
          type: 'text',
        },
      ],
    },
    {
      name: 'chartData',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'value',
          type: 'number',
        },
        {
          name: 'fill',
          type: 'text',
        },
      ],
    },
  ],
}
