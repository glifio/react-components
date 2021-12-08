import { AppIconHeaderFooter } from '../Icons'
import Button from '../Button/V2'
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
          <Button large round black>
            Blog
          </Button>
        </a>
        <a>
          <Button
            large
            round
            black
            style={{
              marginLeft: space('default')
            }}
          >
            Code
          </Button>
        </a>
        <a>
          <Button
            large
            round
            black
            style={{
              marginLeft: space('default')
            }}
          >
            Nodes
          </Button>
        </a>
      </nav>
    </header>
  )
}
