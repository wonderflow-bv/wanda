import {
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
  const fieldRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [iconSize, setIconSize] = useState<SymbolProps['dimension']>(16);
  const [iconStyle, setIconStyle] = useState<SymbolProps['weight']>();

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
      setIconSize(style === 'solid' ? 16 : 24);
    },
    [],
  );

  useEffect(() => {
    const currentValue = fieldRef?.current?.value;
    if (currentValue) setSearchTerm(currentValue);
  }, []);

  return (
    <Stack rowGap={48} className={styles.SearchSymbol}>
      <div className={styles.ToolBar}>
        <Stack direction="row" vAlign="center" hAlign="center" wrap columnGap={24} rowGap={16}>
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
          <Stack direction="row" fill={false} columnGap={24} inline>
            <Stack vAlign="center" direction="row" columnGap={8}>
              <Radio onChange={() => handleStyle('solid')} dimension="small" id="SolidStyle" name="iconstyle" value="solid" defaultChecked />
              <Text as="label" htmlFor="SolidStyle"><b>Solid</b></Text>
            </Stack>
            <Stack vAlign="center" direction="row" columnGap={8}>
              <Radio onChange={() => handleStyle('outline')} dimension="small" id="OutlineStyle" name="iconstyle" value="outline" />
              <Text as="label" htmlFor="OutlineStyle"><b>Outline</b></Text>
            </Stack>
            <Stack vAlign="center" direction="row" columnGap={8}>
              <Radio onChange={() => handleStyle('duotone')} dimension="small" id="DuotoneStyle" name="iconstyle" value="duotone" />
              <Text as="label" htmlFor="DuotoneStyle"><b>Duotone</b></Text>
            </Stack>
          </Stack>
        </Stack>
      </div>
      <Stack rowGap={8}>
        <Text textAlign="center" dimmed={5} size={16}>Click on the symbol to copy the name</Text>
        { filteredIcons.length === 0
          ? (
            <InfoState title="Nothing to show" icon="frown">
              Make sure you entered the correct name.
            </InfoState>
          )
          : (
            <Grid columnGap={2} rowGap={2} colMinWidth="8rem">
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
