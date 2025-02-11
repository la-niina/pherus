'use client'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import type { ChartBlock as ChartBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  Rectangle,
  Sector,
  XAxis,
} from 'recharts'
import { PieSectorDataItem } from 'recharts/types/polar/Pie'

export type ChartBlockPropper = ChartBlockProps & {
  className?: string
}

export const ChartBlock: React.FC<ChartBlockPropper> = (props) => {
  const { className, chatType, layoutType, chartData, chartConfig } = props
  const chartDatas: Array<{ label: string; value: number; fill: string }> = (chartData || []).map(
    (item) => ({
      label: item.label || 'unknown', // Fallback for missing label
      value: item.value || 0, // Fallback for missing value
      fill: item.fill || 'var(--color-chrome)', // Fallback for missing fill
    }),
  )

  const getChartConfig = (label: string, index: number): { label: string; color: string } => {
    const config = chartConfig?.find((config) => config.label === label)
    return {
      label: config?.label || label, // Fallback to the label itself
      color: config?.color || `hsl(var(--chart-${index + 1}))`, // Default color if not found
    }
  }

  const chartConfigs = (chartData || []).reduce(
    (acc, item, index) => {
      const label = item.label || 'unknown'
      acc[label] = getChartConfig(label, index)
      return acc
    },
    {} as Record<string, { label: string; color: string }>,
  ) satisfies ChartConfig

  const totalVisitors = React.useMemo(() => {
    return chartDatas.reduce((acc, curr) => acc + curr.value, 0)
  }, [])

  return (
    <div className={cn(layoutType === 'inner' ? `${className}` : 'container my-6')}>
      <div className="flex flex-col gap-3 items-center justify-center">
        {layoutType === 'outer' && (
          <div className="flex flex-col gap-3 items-center justify-center">
            <h2>Chart Block</h2>
          </div>
        )}

        {chatType === 'bar' && (
          <div className={cn('flex flex-1 w-full max-w-sm')}>
            <ChartContainer className="w-full" config={chartConfigs}>
              <BarChart data={chartDatas}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="label" // Corrected from "lable" to "label"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => {
                    const config = chartConfigs[value as keyof typeof chartConfigs]
                    return config ? config.label : 'Unknown' // Provide a default value
                  }}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar
                  dataKey="value"
                  strokeWidth={2}
                  radius={8}
                  activeIndex={2}
                  activeBar={({ ...props }) => {
                    return (
                      <Rectangle
                        {...props}
                        fillOpacity={0.8}
                        stroke={props.payload.fill}
                        strokeDasharray={4}
                        strokeDashoffset={4}
                      />
                    )
                  }}
                />
              </BarChart>
            </ChartContainer>
          </div>
        )}

        {chatType === 'pie' && (
          <div className={cn('flex flex-1 w-full max-w-sm')}>
            <ChartContainer
              config={chartConfigs}
              className="mx-auto w-full aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={chartDatas}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={60}
                  strokeWidth={5}
                  activeIndex={0}
                  activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                    <Sector {...props} outerRadius={outerRadius + 10} />
                  )}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Total
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
        )}
        {chatType === 'line' && (
          <div className={cn('flex flex-1 w-full max-w-lg')}>
            <ChartContainer className="w-full" config={chartConfigs}>
              <LineChart
                accessibilityLayer
                data={chartDatas}
                dataKey={'label'}
                margin={{
                  top: 20,
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" nameKey="label" hideLabel />}
                />
                <Line
                  dataKey="value"
                  type="natural"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={{
                    fill: 'var(--color-chrome)',
                  }}
                  activeDot={{
                    r: 6,
                  }}
                >
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                    dataKey="label"
                    formatter={(value: keyof typeof chartConfig) => chartConfigs[value]?.label}
                  />
                </Line>
              </LineChart>
            </ChartContainer>
          </div>
        )}
      </div>
    </div>
  )
}
