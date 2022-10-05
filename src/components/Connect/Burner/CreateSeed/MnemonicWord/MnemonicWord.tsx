import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ReactNode } from 'react'

const MnemonicWordEl = styled.span`
  display: flex;
  gap: 0.5em;
  font-size: 1.125em;
  text-align: center;
  line-height: 2em;

  .num {
    width: 1.5em;
    flex: 0 0 auto;
  }

  .word {
    flex: 1 0 auto;
  }
`

export const MnemonicWord = ({ num, children }: MnemonicWordProps) => {
  return (
    <MnemonicWordEl>
      <span className='num'>{num}</span>
      <span className='word'>{children}</span>
    </MnemonicWordEl>
  )
}

interface MnemonicWordProps {
  num: number
  children: ReactNode
}

MnemonicWord.propTypes = {
  num: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
