import {
  Card,
  Elevator,
  Grid,
  InfoState, Radio, Stack, Symbol, SymbolProps, Text, Textfield,
} from '@wonderflow/react-components';
import { SymbolNames } from '@wonderflow/symbols';
import IconsList from '@wonderflow/symbols/structure';
import { useDebounce } from 'ahooks';
import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';

import { BlankButton } from '@/components/shared/blank-button';
import { useResponsive } from '@/context/responsive';

import styles from './search-symbol.module.css';

const SymbolTile: React.FC<SymbolProps> = ({ source, weight, ...args }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = useCallback(
    (icon: any) => () => {
      navigator.clipboard.writeText(icon).then(() => {
        setCopied(true);
      }, () => {
        setCopied(false);
      });
      setTimeout(() => setCopied(false), 1000);
    },
    [],
  );

  return (
    <Stack
      as={BlankButton}
      onClick={handleCopy(source)}
      className={styles.SymbolTile}
      data-icon-style={weight}
      hAlign="center"
      data-icon-tile-copied={copied}
      vAlign="center"
      rowGap={24}
    >
      <Stack as="span" hAlign="center" vAlign="center" rowGap={16} fill={false}>
        <Symbol weight={weight} source={source} {...args} />
      </Stack>
    </Stack>
  );
};

export const SearchSymbol = () => {
  const { matches } = useResponsive();
  const fieldRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [iconSize] = useState<SymbolProps['dimension']>(24);
  const [iconStyle, setIconStyle] = useState<SymbolProps['weight']>('duotone');

  const debouncedSearchTerm = useDebounce(
    searchTerm,
    { wait: 300 },
  );

  const filteredIcons: SymbolNames[] = useMemo(
    () => IconsList.filter(iconName => iconName.includes(debouncedSearchTerm)) as SymbolNames[], [debouncedSearchTerm],
  );

  const handleSearch = useCallback(
    ({ currentTarget }) => {
      setSearchTerm(currentTarget.value);
    },
    [],
  );

  const handleStyle = useCallback(
    (style) => {
      setIconStyle(style);
    },
    [],
  );

  useEffect(() => {
    const currentValue = fieldRef?.current?.value;
    if (currentValue) setSearchTerm(currentValue);
  }, []);

  return (
    <Stack direction={matches.medium ? 'row-reverse' : 'column'} columnGap={24} rowGap={24} vAlign="start" className={styles.SearchSymbol}>
      <Elevator resting={2}>
        <Card
          bordered
          radius={matches.medium ? 16 : undefined}
          padding={24}
          className={styles.Tools}
        >
          <Stack vAlign="start" wrap columnGap={24} rowGap={16}>
            <Textfield
              ref={fieldRef}
              type="search"
              onChange={handleSearch}
              icon="magnifying-glass"
              iconPosition="left"
              data-search-icons-searched={!!debouncedSearchTerm}
              placeholder="Search icon names"
              dimension="big"
              autoFocus
            />
            <Stack fill={false} columnGap={24} rowGap={8}>
              <Stack
                as="label"
                fill={false}
                htmlFor="SolidStyle"
                className={styles.RadioButton}
                data-checked={iconStyle === 'solid'}
                vAlign="center"
                direction="row"
                columnGap={16}
                vPadding={16}
                hPadding={16}
              >
                <Radio
                  onChange={() => handleStyle('solid')}
                  dimension="small"
                  id="SolidStyle"
                  name="iconstyle"
                  value="solid"
                  defaultChecked={iconStyle === 'solid'}
                />
                <b>Solid</b>
              </Stack>
              <Stack
                as="label"
                fill={false}
                htmlFor="OutlineStyle"
                className={styles.RadioButton}
                data-checked={iconStyle === 'outline'}
                vAlign="center"
                direction="row"
                columnGap={16}
                vPadding={16}
                hPadding={16}
              >
                <Radio
                  onChange={() => handleStyle('outline')}
                  dimension="small"
                  id="OutlineStyle"
                  name="iconstyle"
                  value="outline"
                  defaultChecked={iconStyle === 'outline'}
                />
                <b>Outline</b>
              </Stack>
              <Stack
                as="label"
                fill={false}
                htmlFor="DuotoneStyle"
                className={styles.RadioButton}
                data-checked={iconStyle === 'duotone'}
                vAlign="center"
                hAlign="start"
                direction="row"
                columnGap={16}
                vPadding={16}
                hPadding={16}
              >
                <Radio
                  onChange={() => handleStyle('duotone')}
                  dimension="small"
                  id="DuotoneStyle"
                  name="iconstyle"
                  value="duotone"
                  defaultChecked={iconStyle === 'duotone'}
                />
                <b>Duotone</b>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </Elevator>
      <Stack rowGap={8}>
        <Text textAlign="center" dimmed={6} size={14}>Click on the symbol to copy the name</Text>
        { filteredIcons.length === 0
          ? (
            <InfoState title="Nothing to show" icon="frown">
              Make sure you entered the correct name.
            </InfoState>
          )
          : (
            <Grid columnGap={2} rowGap={2} colMinWidth="6rem">
              {filteredIcons.map(icon => (
                <Grid.Item key={icon}>
                  <SymbolTile key={`${icon}16`} source={icon} weight={iconStyle} dimension={iconSize} />
                </Grid.Item>
              ))}
            </Grid>
          )
          }
      </Stack>
    </Stack>
  );
};
