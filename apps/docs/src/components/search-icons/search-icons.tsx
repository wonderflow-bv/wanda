import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Icon, Radio, Stack, Text, Textfield, IconProps, InfoState } from '@wonderflow/react-components'
import IconsList from '@wonderflow/icons/structure'
import { useDebounce } from 'ahooks'
import { BlankButton } from '@/components/blank-button'
import { Bleed } from '@/components/bleed'
import { SearchIcons as SearchIconsClass, IconTile as IconTileClass, Grid, IconPreview, ToolBar } from './search-icons.module.css'
import { IconNames } from '@wonderflow/icons'

const IconTile: React.FC<IconProps> = ({ source, style, ...args }) => {
  const [copied, setCopied] = useState<boolean>(false)

  const handleCopy = useCallback(
    (icon: any) => () => {
      navigator.clipboard.writeText(icon).then(() => {
        setCopied(true)
      }, () => {
        setCopied(false)
      })
      setTimeout(() => setCopied(false), 1000)
    },
    []
  )

  return (
    <Stack
      as={BlankButton}
      onClick={handleCopy(source)}
      className={IconTileClass}
      data-icon-style={style}
      horizontalAlign="center"
      data-icon-tile-copied={copied}
      verticalAlign="center"
      rowGap={24}
    >
      <Stack as="span" horizontalAlign="center" verticalAlign="center" rowGap={16} fill={false}>
        <Icon className={IconPreview} style={style} source={source} {...args} />
        <Text size={14} responsive={false} textAlign="center" weight="bold">{source}</Text>
      </Stack>
    </Stack>
  )
}

export const SearchIcons = () => {
  const fieldRef = useRef<HTMLInputElement>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [iconSize, setIconSize] = useState<IconProps['dimension']>(16)
  const [iconStyle, setIconStyle] = useState<IconProps['style']>()

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

  const handleStyle = useCallback(
    (style) => {
      setIconStyle(style)
      setIconSize(style === 'solid' ? 16 : 24)
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
              <Radio onChange={() => handleStyle('solid')} dimension="small" id="SolidStyle" name="iconstyle" value="solid" defaultChecked />
              <Text as="label" htmlFor="SolidStyle"><b>Solid</b></Text>
            </Stack>
            <Stack verticalAlign="center" direction="row" columnGap={8}>
              <Radio onChange={() => handleStyle('outline')} dimension="small" id="OutlineStyle" name="iconstyle" value="outline" />
              <Text as="label" htmlFor="OutlineStyle"><b>Outline</b></Text>
            </Stack>
            <Stack verticalAlign="center" direction="row" columnGap={8}>
              <Radio onChange={() => handleStyle('duotone')} dimension="small" id="DuotoneStyle" name="iconstyle" value="duotone" />
              <Text as="label" htmlFor="DuotoneStyle"><b>Duotone</b></Text>
            </Stack>
          </Stack>
        </Stack>
      </Bleed>
      <Bleed>
        <Stack rowGap={8}>
          <Text textAlign="center" dimmed={5} size={16}>Click on a tile to copy the icon name</Text>
          { filteredIcons.length === 0
            ? (
              <InfoState title="Nothing to show" icon="frown">
                Make sure you entered the correct name.
              </InfoState>
              )
            : (
              <div className={Grid}>
                {filteredIcons.map((icon: IconNames) => <IconTile key={icon + '16'} source={icon} style={iconStyle} dimension={iconSize} />)}
              </div>
              )
          }
        </Stack>
      </Bleed>
    </Stack>
  )
}
