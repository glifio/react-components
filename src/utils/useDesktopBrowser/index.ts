import { useEffect } from 'react'
import { useRouter } from 'next/router'
import isMobileOrTablet from '../isMobileOrTablet'

export default function useDesktopBrowser(
  replaceUrl: string = '/error/use-desktop-browser'
) {
  const { replace } = useRouter()
  useEffect(() => {
    const onMobileBrowser = isMobileOrTablet()
    if (onMobileBrowser) replace(replaceUrl)
  })
}
