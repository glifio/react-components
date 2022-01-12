import { useEffect } from 'react'
import { useRouter } from 'next/router'
import isMobileOrTablet from '../isMobileOrTablet'
import isDesktopChromeBrowser from '../isDesktopChromeBrowser'

export default function useDesktopBrowser(
  replaceUrl: string = '/error/use-chrome'
) {
  const { replace } = useRouter()
  useEffect(() => {
    const onMobileBrowser = isMobileOrTablet()
    const isChromeBrowser = isDesktopChromeBrowser()
    if (onMobileBrowser || !isChromeBrowser) replace(replaceUrl)
  })
}
