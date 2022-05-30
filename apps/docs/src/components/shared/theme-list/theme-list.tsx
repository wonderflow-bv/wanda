import {
  Grid, Separator, Stack, Title,
} from '@wonderflow/react-components';
import React, { Fragment } from 'react';

import { Swatch } from '@/components/shared/swatch';

type ThemeListProps = {
  theme: Record<string, string>;
}

export const ThemeList: React.FC<ThemeListProps> = ({
  theme,
  ...props
}) => {
  const dataKeys = Object.keys(theme);

  const groupedData = dataKeys.reduce((result, currKey) => {
    const groups = result;
    // Pull out the group name from the key
    const group = currKey.split('-')[0];
    // Check if the group exists, if not, create it
    const hasGroup = result[group] !== undefined;
    if (!hasGroup) {
      groups[group] = {};
    }
    // Add the current entry to the result
    groups[group][currKey] = theme[currKey];
    return groups;
  }, {});

  const themeKeys = Object.keys(groupedData);

  return (
    <Stack rowGap={56} vPadding={32} {...props}>
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
              <Grid colMinWidth="15rem" columnGap={16} rowGap={24}>
                {Object.keys(groupedData[item]).map(color => (
                  <Grid.Item key={color}>
                    <Swatch
                      showCopy={false}
                      color={groupedData[item][color]}
                      name={color}
                    />
                  </Grid.Item>
                ))}
              </Grid>
            </Stack>
          </Fragment>
        ))
      }
    </Stack>
  );
};
