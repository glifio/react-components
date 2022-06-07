import PropTypes from 'prop-types'
import { Label } from './Label'
import { AddressLink } from '../AddressLink'

export const Info = ({
  vertical,
  centered,
  label,
  info,
  address,
  value
}: InfoProps) => (
  <Label vertical={vertical} centered={centered}>
    {vertical ? (
      <>
        {label && <span>{label}</span>}
        {info && <span className='info'>{info}</span>}
      </>
    ) : (
      <div>
        {label && <span>{label}</span>}
        {info && <span className='info'>{info}</span>}
      </div>
    )}
    <div className='info-wrapper'>
      {address && typeof value === 'string' ? (
        <AddressLink address={value} />
      ) : (
        value
      )}
    </div>
  </Label>
)

export interface InfoProps {
  vertical?: boolean
  centered?: boolean
  label?: string
  info?: string
  address?: boolean
  value?: string | number
}

Info.propTypes = {
  vertical: PropTypes.bool,
  centered: PropTypes.bool,
  label: PropTypes.string,
  info: PropTypes.string,
  address: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

Info.defaultProps = {
  vertical: false,
  centered: false,
  label: '',
  info: '',
  address: false,
  value: ''
}
