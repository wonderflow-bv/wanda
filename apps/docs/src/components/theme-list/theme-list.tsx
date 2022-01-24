import React, { Fragment } from 'react'
import { Swatch } from '@/components/swatch'
import { Stack, Title, Separator } from '@wonderflow/react-components'

import { Grid } from './theme-list.module.css'

type ThemeListProps = {
  theme: Record<string, string>
}

export const ThemeList: React.FC<ThemeListProps> = ({
  theme,
  ...props
}) => {
  const dataKeys = Object.keys(theme)

  const groupedData = dataKeys.reduce((result, currKey) => {
    // Pull out the group name from the key
    const group = currKey.split('-')[0]
    // Check if the group exists, if not, create it
    const hasGroup = result[group] !== undefined
    if (!hasGroup) result[group] = {}
    // Add the current entry to the result
    result[group][currKey] = theme[currKey]
    return result
  }, {})

  const themeKeys = Object.keys(groupedData)

  return (
    <Stack rowGap={56} verticalPadding={32} {...props}>
      {
        themeKeys.map((item, i) => (
          <Fragment key={item}>
            {i !== 0 && <Separator aria-hidden="true" />}
            <Stack rowGap={24}>
              <Title level="5">
                {item.charAt(0).toUpperCase() + item.slice(1)}
                {' '}
                colors
              </Title>
              <div className={Grid}>
                {Object.keys(groupedData[item]).map(color => (
                  <Swatch
                    showCopy={false}
                    key={groupedData[item][color] + color}
                    color={groupedData[item][color]}
                    name={color}
                  />
                ))}
              </div>
            </Stack>
          </Fragment>
        ))
      }
    </Stack>
  )
}
