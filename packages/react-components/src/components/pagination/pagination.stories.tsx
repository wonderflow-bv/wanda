import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useEffect, useState } from 'react'
import { Pagination } from '../..'

export default {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
  args: {
    itemsPerPage: 3,
    items: [
      {
        ip: '212.5.90.2',
        os: 'MacOS Sierra',
        date: '11/01/2017 @ 07:16:59',
        status: 'ok',
        browser: 'Mozilla Firefox',
        position: 'Dana',
        application: 'Contactdata'
      },
      {
        ip: '213.177.67.223',
        os: 'Windows 7',
        date: '01/01/2017 @ 05:07:22',
        status: 'ok',
        browser: 'Google Chrome 56',
        position: 'Crawfordsville',
        application: 'Engagement marketing'
      },
      {
        ip: '134.208.149.245',
        os: 'Windows 7',
        date: '24/01/2017 @ 03:35:37',
        status: 'ok',
        browser: 'Internet Explorer 11',
        position: 'Summerset',
        application: 'Engagement marketing'
      },
      {
        ip: '39.235.115.34',
        os: 'OSX Mavericks',
        date: '16/02/2017 @ 08:39:05',
        status: 'error',
        browser: 'Google Chrome 56',
        position: 'Ribera',
        application: 'Contacthub'
      },
      {
        ip: '20.48.229.177',
        os: 'Windows 7',
        date: '10/01/2017 @ 08:37:03',
        status: 'ok',
        browser: 'Mozilla Firefox',
        position: 'Dragoon',
        application: 'Contacthub'
      },
      {
        ip: '159.121.81.234',
        os: 'Windows 7',
        date: '19/02/2017 @ 02:59:23',
        status: 'ok',
        browser: 'Google Chrome 56',
        position: 'Manila',
        application: 'Contacthub'
      },
      {
        ip: '219.133.21.227',
        os: 'Windows 7',
        date: '27/01/2017 @ 07:41:17',
        status: 'ok',
        browser: 'Mozilla Firefox',
        position: 'Nogal',
        application: 'Contactdata'
      },
      {
        ip: '30.93.233.36',
        os: 'OSX Mavericks',
        date: '03/02/2017 @ 12:41:08',
        status: 'error',
        browser: 'Mozilla Firefox',
        position: 'Trexlertown',
        application: 'Engagement marketing'
      },
      {
        ip: '241.144.240.107',
        os: 'Windows 10',
        date: '28/01/2017 @ 02:04:30',
        status: 'ok',
        browser: 'Microsoft Edge',
        position: 'Yettem',
        application: 'Contacthub'
      },
      {
        ip: '186.8.3.194',
        os: 'OSX Mavericks',
        date: '04/02/2017 @ 08:17:19',
        status: 'error',
        browser: 'Microsoft Edge',
        position: 'Collins',
        application: 'Contacthub'
      },
      {
        ip: '187.75.121.92',
        os: 'Windows 7',
        date: '17/02/2017 @ 04:06:22',
        status: 'error',
        browser: 'Microsoft Edge',
        position: 'Bascom',
        application: 'Contactsend'
      },
      {
        ip: '161.197.46.151',
        os: 'Windows 7',
        date: '09/01/2017 @ 02:44:20',
        status: 'ok',
        browser: 'Internet Explorer 11',
        position: 'Manchester',
        application: 'Contactsend'
      },
      {
        ip: '131.151.132.175',
        os: 'MacOS Sierra',
        date: '07/02/2017 @ 12:38:21',
        status: 'error',
        browser: 'Google Chrome 56',
        position: 'Silkworth',
        application: 'Engagement marketing'
      },
      {
        ip: '58.255.154.169',
        os: 'Windows 10',
        date: '10/02/2017 @ 05:54:32',
        status: 'ok',
        browser: 'Google Chrome 56',
        position: 'Mansfield',
        application: 'Engagement marketing'
      },
      {
        ip: '203.10.238.46',
        os: 'OSX Mavericks',
        date: '06/01/2017 @ 06:14:43',
        status: 'error',
        browser: 'Microsoft Edge',
        position: 'Barstow',
        application: 'Engagement marketing'
      },
      {
        ip: '135.247.125.72',
        os: 'OSX Mavericks',
        date: '18/02/2017 @ 05:48:51',
        status: 'error',
        browser: 'Google Chrome 56',
        position: 'Titanic',
        application: 'Contactdata'
      },
      {
        ip: '5.112.149.5',
        os: 'Windows 7',
        date: '10/02/2017 @ 03:32:51',
        status: 'ok',
        browser: 'Google Chrome 56',
        position: 'Bagtown',
        application: 'Contactplan'
      },
      {
        ip: '122.200.149.137',
        os: 'Windows 7',
        date: '04/01/2017 @ 12:23:37',
        status: 'ok',
        browser: 'Mozilla Firefox',
        position: 'Fivepointville',
        application: 'Contacthub'
      },
      {
        ip: '212.5.90.2',
        os: 'MacOS Sierra',
        date: '11/01/2017 @ 07:16:59',
        status: 'ok',
        browser: 'Mozilla Firefox',
        position: 'Dana',
        application: 'Contactdata'
      },
      {
        ip: '213.177.67.223',
        os: 'Windows 7',
        date: '01/01/2017 @ 05:07:22',
        status: 'ok',
        browser: 'Google Chrome 56',
        position: 'Crawfordsville',
        application: 'Engagement marketing'
      },
      {
        ip: '134.208.149.245',
        os: 'Windows 7',
        date: '24/01/2017 @ 03:35:37',
        status: 'ok',
        browser: 'Internet Explorer 11',
        position: 'Summerset',
        application: 'Engagement marketing'
      },
      {
        ip: '39.235.115.34',
        os: 'OSX Mavericks',
        date: '16/02/2017 @ 08:39:05',
        status: 'error',
        browser: 'Google Chrome 56',
        position: 'Ribera',
        application: 'Contacthub'
      },
      {
        ip: '20.48.229.177',
        os: 'Windows 7',
        date: '10/01/2017 @ 08:37:03',
        status: 'ok',
        browser: 'Mozilla Firefox',
        position: 'Dragoon',
        application: 'Contacthub'
      },
      {
        ip: '159.121.81.234',
        os: 'Windows 7',
        date: '19/02/2017 @ 02:59:23',
        status: 'ok',
        browser: 'Google Chrome 56',
        position: 'Manila',
        application: 'Contacthub'
      },
      {
        ip: '219.133.21.227',
        os: 'Windows 7',
        date: '27/01/2017 @ 07:41:17',
        status: 'ok',
        browser: 'Mozilla Firefox',
        position: 'Nogal',
        application: 'Contactdata'
      },
      {
        ip: '30.93.233.36',
        os: 'OSX Mavericks',
        date: '03/02/2017 @ 12:41:08',
        status: 'error',
        browser: 'Mozilla Firefox',
        position: 'Trexlertown',
        application: 'Engagement marketing'
      },
      {
        ip: '241.144.240.107',
        os: 'Windows 10',
        date: '28/01/2017 @ 02:04:30',
        status: 'ok',
        browser: 'Microsoft Edge',
        position: 'Yettem',
        application: 'Contacthub'
      },
      {
        ip: '186.8.3.194',
        os: 'OSX Mavericks',
        date: '04/02/2017 @ 08:17:19',
        status: 'error',
        browser: 'Microsoft Edge',
        position: 'Collins',
        application: 'Contacthub'
      },
      {
        ip: '187.75.121.92',
        os: 'Windows 7',
        date: '17/02/2017 @ 04:06:22',
        status: 'error',
        browser: 'Microsoft Edge',
        position: 'Bascom',
        application: 'Contactsend'
      },
      {
        ip: '161.197.46.151',
        os: 'Windows 7',
        date: '09/01/2017 @ 02:44:20',
        status: 'ok',
        browser: 'Internet Explorer 11',
        position: 'Manchester',
        application: 'Contactsend'
      },
      {
        ip: '131.151.132.175',
        os: 'MacOS Sierra',
        date: '07/02/2017 @ 12:38:21',
        status: 'error',
        browser: 'Google Chrome 56',
        position: 'Silkworth',
        application: 'Engagement marketing'
      },
      {
        ip: '58.255.154.169',
        os: 'Windows 10',
        date: '10/02/2017 @ 05:54:32',
        status: 'ok',
        browser: 'Google Chrome 56',
        position: 'Mansfield',
        application: 'Engagement marketing'
      },
      {
        ip: '203.10.238.46',
        os: 'OSX Mavericks',
        date: '06/01/2017 @ 06:14:43',
        status: 'error',
        browser: 'Microsoft Edge',
        position: 'Barstow',
        application: 'Engagement marketing'
      },
      {
        ip: '135.247.125.72',
        os: 'OSX Mavericks',
        date: '18/02/2017 @ 05:48:51',
        status: 'error',
        browser: 'Google Chrome 56',
        position: 'Titanic',
        application: 'Contactdata'
      },
      {
        ip: '5.112.149.5',
        os: 'Windows 7',
        date: '10/02/2017 @ 03:32:51',
        status: 'ok',
        browser: 'Google Chrome 56',
        position: 'Bagtown',
        application: 'Contactplan'
      },
      {
        ip: '122.200.149.137',
        os: 'Windows 7',
        date: '04/01/2017 @ 12:23:37',
        status: 'ok',
        browser: 'Mozilla Firefox',
        position: 'Fivepointville',
        application: 'Contacthub'
      },
      {
        ip: '213.177.67.223',
        os: 'Windows 7',
        date: '01/01/2017 @ 05:07:22',
        status: 'ok',
        browser: 'Google Chrome 56',
        position: 'Crawfordsville',
        application: 'Engagement marketing'
      },
      {
        ip: '134.208.149.245',
        os: 'Windows 7',
        date: '24/01/2017 @ 03:35:37',
        status: 'ok',
        browser: 'Internet Explorer 11',
        position: 'Summerset',
        application: 'Engagement marketing'
      },
      {
        ip: '39.235.115.34',
        os: 'OSX Mavericks',
        date: '16/02/2017 @ 08:39:05',
        status: 'error',
        browser: 'Google Chrome 56',
        position: 'Ribera',
        application: 'Contacthub'
      },
      {
        ip: '20.48.229.177',
        os: 'Windows 7',
        date: '10/01/2017 @ 08:37:03',
        status: 'ok',
        browser: 'Mozilla Firefox',
        position: 'Dragoon',
        application: 'Contacthub'
      },
      {
        ip: '159.121.81.234',
        os: 'Windows 7',
        date: '19/02/2017 @ 02:59:23',
        status: 'ok',
        browser: 'Google Chrome 56',
        position: 'Manila',
        application: 'Contacthub'
      },
      {
        ip: '219.133.21.227',
        os: 'Windows 7',
        date: '27/01/2017 @ 07:41:17',
        status: 'ok',
        browser: 'Mozilla Firefox',
        position: 'Nogal',
        application: 'Contactdata'
      },
      {
        ip: '30.93.233.36',
        os: 'OSX Mavericks',
        date: '03/02/2017 @ 12:41:08',
        status: 'error',
        browser: 'Mozilla Firefox',
        position: 'Trexlertown',
        application: 'Engagement marketing'
      },
      {
        ip: '241.144.240.107',
        os: 'Windows 10',
        date: '28/01/2017 @ 02:04:30',
        status: 'ok',
        browser: 'Microsoft Edge',
        position: 'Yettem',
        application: 'Contacthub'
      }
    ]
  }
} as ComponentMeta<typeof Pagination>

export const Default: ComponentStory<typeof Pagination> = ({
  // @ts-expect-error
  items,
  itemsPerPage,
  ...args
}) => {
  const [currentItems, setCurrentItems] = useState<any>(null)
  const [itemOffset, setItemOffset] = useState(0)

  useEffect(() => {
    const endOffset = itemOffset + (itemsPerPage || 10)
    setCurrentItems(items.slice(itemOffset, endOffset))
  }, [itemOffset, items, itemsPerPage])

  const handlePageClick = (data: any) => {
    setItemOffset(data.offset)
  }

  return (
    <>
      {currentItems && currentItems.map((item: any) => (
        <h3 key={item.ip}>
          {item.ip}
        </h3>
      ))}
      <Pagination
        {...args}
        itemsCount={items.length}
        onPageClick={(data) => handlePageClick(data)}
      />
    </>
  )
}
