import {
  Card,
  Grid,
  InfoState, Modal, OverlayContainer, Stack, SymbolProps, Text, Textfield, Title,
} from '@wonderflow/react-components';
import { SymbolNames } from '@wonderflow/symbols';
import SymbolsList from '@wonderflow/symbols/structure';
import { useDebounce } from 'ahooks';
import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';

import { Banner } from '@/components/shared/banner';
import { ClientOnly } from '@/components/shared/client-only';
import { useResponsive } from '@/context/responsive';

import { RadioButton } from './radio-button';
import styles from './search-symbol.module.css';
import { SymbolTile } from './symbol-tile';

const WEIGHTS = ['solid', 'outline', 'duotone'] as Array<SymbolProps['weight']>;

export const SearchSymbol = () => {
  const { matches } = useResponsive();
  const fieldRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [iconSize] = useState<SymbolProps['dimension']>(24);
  const [iconStyle, setIconStyle] = useState<SymbolProps['weight']>('duotone');

  const debouncedSearchTerm = useDebounce(
    searchTerm,
    { wait: 300 },
  );

  const filteredIcons: SymbolNames[] = useMemo(
    () => SymbolsList.filter(
      iconName => iconName.includes(debouncedSearchTerm),
    ) as SymbolNames[], [debouncedSearchTerm],
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
      <Card
        vibrant
        bordered
        dimmed={1}
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
          <Stack direction="row" columnGap={8} rowGap={8}>
            {WEIGHTS?.map(w => (
              <RadioButton
                key={w}
                onClick={() => handleStyle(w)}
                weight={w}
                checked={iconStyle === w}
              >
                <>
                  {w === 'solid' && (
                  <svg width={32} height={32} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 1a11 11 0 1 0 11 11A11.012 11.012 0 0 0 12 1Z" />
                  </svg>
                  )}

                  {w === 'outline' && (
                  <svg width={32} height={32} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" fill="none" stroke="currentColor" />
                  </svg>
                  )}

                  {w === 'duotone' && (
                  <svg width={32} height={32} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" fill="none" stroke="currentColor">
                      <path d="M19.778 4.222 4.222 19.778A11 11 0 0 0 19.778 4.222Z" opacity=".5" fill="currentColor" stroke="none" />
                      <path d="M19.778 4.222 4.222 19.778" />
                      <circle cx="12" cy="12" r="11" />
                    </g>
                  </svg>
                  )}
                </>
              </RadioButton>
            ))}
          </Stack>
          <Banner
            as="a"
            href="https://github.com/wonderflow-bv/wanda/issues/new?assignees=equinusocio&labels=feature&template=new_icons.yml&title=New+icons+request"
            target="_blank"
            rel="noopener noreferrer"
            icon="circle-question"
          >
            <Title as="h2" level="6">Didn&apos;t find the icon?</Title>
            <Text size={16} dimmed={6}>Ask for new icons on GitHub.</Text>
          </Banner>
        </Stack>
      </Card>

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
                <SymbolTile
                  key={`${icon}16`}
                  source={icon}
                  weight={iconStyle}
                  dimension={iconSize}
                  onClick={() => setIsModalOpen(true)}
                />
              </Grid.Item>
            ))}
          </Grid>
        )}

      <ClientOnly>
        <OverlayContainer
          onClose={() => setIsModalOpen(false)}
        >
          {isModalOpen && (
            <Modal>
              <Modal.Content title="Icon information">
                ciao
              </Modal.Content>
            </Modal>
          )}
        </OverlayContainer>
      </ClientOnly>
    </Stack>
  );
};