import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Icon, Radio, Stack, Text, Textfield, IconProps, InfoState } from '@wonderflow/react-components'
import IconsList from '@wonderflow/icons/structure'
import { useDebounce } from 'ahooks'
import { BlankButton } from '@/components/blank-button'
import { Bleed } from '@/components/bleed'
import { SearchIcons as SearchIconsClass, IconTile as IconTileClass, Grid, Label, IconPreview, ToolBar } from './search-icons.module.css'
import { TokensTypes } from '@wonderflow/tokens/platforms/web'
import { IconNames } from '@wonderflow/icons'

type IconTileProps = {
  icon: IconNames;
  size: IconProps['dimension'];
}

const IconTile: React.FC<IconTileProps> = ({ icon, size }) => {
  const [copiedName, setCopiedName] = useState<string>('')
  const [copied, setCopied] = useState<boolean>(false)

  const handleCopy = useCallback(
    (icon: string) => () => {
      setCopied(true)
      navigator.clipboard.writeText(icon).then(() => {
        setCopiedName(icon)
      }, () => {
        setCopied(false)
      })
      setTimeout(() => setCopied(false), 1000)
    },
    [setCopiedName]
  )

  return (
    <Stack
      as={BlankButton}
      onClick={handleCopy(icon)}
      className={IconTileClass}
      horizontalAlign="center"
      data-icon-tile-copied={copied}
      verticalAlign="center"
      rowGap={24}
    >
      <Stack as="span" horizontalAlign="center" verticalAlign="center" rowGap={16} fill={false}>
        <Icon className={IconPreview} source={icon} dimension={size} />
        <Text size={14} responsive={false} textAlign="center" weight="bold">{icon}</Text>
      </Stack>
      {(copiedName && copied) && <Text size={14} weight="bold" className={Label}>COPIED</Text>}
    </Stack>
  )
}

export const SearchIcons = () => {
  const fieldRef = useRef<HTMLInputElement>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [iconSize, setIconSize] = useState<TokensTypes['icon']['size']>(16)
  const debouncedSearchTerm = useDebounce(
    searchTerm,
    { wait: 300 }
  )
  const filteredIcons = useMemo(() => IconsList.filter(iconName => iconName.includes(debouncedSearchTerm)), [debouncedSearchTerm])

  const handleSearch = useCallback(
    ({ currentTarget }) => {
      setSearchTerm(currentTarget.value)
    },
    []
  )

  useEffect(() => {
    const currentValue = fieldRef?.current?.value
    if (currentValue) setSearchTerm(currentValue)
  }, [])

  return (
    <Stack rowGap={48} className={SearchIconsClass}>
      <Bleed className={ToolBar}>
        <Stack direction="row" verticalAlign="center" horizontalAlign="center" wrap columnGap={24} rowGap={16}>
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
            <Stack verticalAlign="center" direction="row" columnGap={8}>
              <Radio onChange={() => setIconSize(16)} dimension="small" id="SolidStyle" source="iconstyle" value="solid" defaultChecked />
              <Text as="label" htmlFor="SolidStyle"><b>Solid</b></Text>
            </Stack>
            <Stack verticalAlign="center" direction="row" columnGap={8}>
              <Radio onChange={() => setIconSize(24)} dimension="small" id="OutlineStyle" source="iconstyle" value="outline" />
              <Text as="label" htmlFor="OutlineStyle"><b>Outline</b></Text>
            </Stack>
          </Stack>
        </Stack>
      </Bleed>
      <Bleed>
        { filteredIcons.length === 0
          ? (
            <InfoState title="Nothing to show" icon="frown">
              Make sure you entered the correct name.
            </InfoState>
            )
          : (
            <div className={Grid}>
              {filteredIcons.map((icon: IconNames) => <IconTile key={icon + '16'} icon={icon} size={iconSize} />)}
            </div>
            )
          }
      </Bleed>
    </Stack>
  )
}
