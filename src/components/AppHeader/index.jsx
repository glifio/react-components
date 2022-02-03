import { AppIconHeaderFooter } from '../Icons'
import ButtonV2 from '../Button/V2'
import { space } from '../theme'

export default function AppHeader() {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: '50px'
      }}
    >
      <a>
        <AppIconHeaderFooter iconStyle='dark' />
      </a>
      <nav
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          alignContent: 'flex-start'
        }}
      >
        <a>
          <ButtonV2>Blog</ButtonV2>
        </a>
        <a>
          <ButtonV2
            style={{
              marginLeft: space('default')
            }}
          >
            Code
          </ButtonV2>
        </a>
        <a>
          <ButtonV2
            style={{
              marginLeft: space('default')
            }}
          >
            Nodes
          </ButtonV2>
        </a>
      </nav>
    </header>
  )
}
