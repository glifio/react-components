import useDesktopChromeBrowser from '.'
import { renderHook } from '@testing-library/react-hooks'

describe('useDesktopChromeBrowser', () => {
  const redirectUrl = 'test'

  test('it does not redirect to the error page on Mac Chrome desktop', async () => {
    const { navigator } = window

    window.chrome = { app: {}, runtime: {}, loadTimes: () => {}, csi: () => {} }
    delete window.navigator
    window.navigator = {
      vendor: 'Google Inc.',
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'
    }
    const mockRouterReplace = jest.fn(() => {})
    const useRouter = jest.spyOn(require('next/router'), 'useRouter')
    useRouter.mockImplementationOnce(() => ({
      replace: mockRouterReplace
    }))

    renderHook(() => useDesktopChromeBrowser())
    expect(mockRouterReplace).not.toHaveBeenCalled()
    window.navigator = navigator
  })

  test('it does redirect to the error page on Edge', async () => {
    const { navigator } = window
    const mockRouterReplace = jest.fn(() => {})
    const useRouter = jest.spyOn(require('next/router'), 'useRouter')
    useRouter.mockImplementationOnce(() => ({
      replace: mockRouterReplace
    }))

    delete window.navigator
    window.navigator = {
      vendor: 'Microsoft',
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Edge/537.36'
    }

    renderHook(() => useDesktopChromeBrowser(redirectUrl))
    expect(mockRouterReplace).toHaveBeenCalled()
    expect(mockRouterReplace).toHaveBeenCalledWith(redirectUrl)
    window.navigator = navigator
  })

  test('it redirects to the mobile error page on Android Chrome', async () => {
    const { navigator } = window
    const mockRouterReplace = jest.fn(() => {})
    const useRouter = jest.spyOn(require('next/router'), 'useRouter')
    useRouter.mockImplementationOnce(() => ({
      replace: mockRouterReplace
    }))

    delete window.navigator
    // @ts-ignore
    window.navigator = {
      vendor: 'Google Inc.',
      userAgent:
        'Mozilla/5.0 (Linux; Android 7.0; Moto G (5) Build/NPPS25.137-93-4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109'
    }

    renderHook(() => useDesktopChromeBrowser(redirectUrl))
    expect(mockRouterReplace).toHaveBeenCalled()
    expect(mockRouterReplace).toHaveBeenCalledWith(redirectUrl)
    window.navigator = navigator
  })
})
