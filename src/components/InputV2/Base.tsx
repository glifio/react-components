import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Label } from './Label'
import { IconClose } from '../Icons'
import { space } from '../theme'

const BaseLabel = styled(Label)`
  .button-wrapper {
    display: flex;
    align-items: center;
    gap: var(--space-m);

    > *:first-child {
      flex: 1 0 auto;
    }

    > *:not(:first-child) {
      flex: 0 0 auto;
      transition: transform 0.1s ease-out;

      &:hover:not(:active) {
        transform: scale(1.2);
      }

      &:active {
        transition: none;
      }
    }
  }

  .unit-wrapper {
    position: relative;

    input {
      width: 100%;
    }

    .unit {
      position: absolute;
      top: 50%;
      right: 1em;
      transform: translateY(-50%);
      color: var(--purple-medium);

      ${props =>
        props.error &&
        css`
          color: var(--red-dark) !important;
        `}

      ${props =>
        props.disabled &&
        css`
          color: var(--gray-dark) !important;
        `}
    }
  }
`

export const BaseInput = ({
  deletable,
  vertical,
  centered,
  className,
  label,
  info,
  error,
  name,
  type,
  autoFocus,
  autoComplete,
  disabled,
  placeholder,
  min,
  max,
  step,
  value,
  unit,
  onChange,
  onFocus,
  onBlur,
  onClick,
  onEnter,
  onDelete
}: BaseInputProps) => (
  <BaseLabel
    disabled={disabled}
    vertical={vertical}
    centered={centered}
    error={!!error}
  >
    {vertical ? (
      <>
        {label && <span>{label}</span>}
        {info && <span className='info'>{info}</span>}
      </>
    ) : (
      <div>
        {label && <span>{label}</span>}
        {info && <span className='info'>{info}</span>}
        {error && <span className='error'>{error}</span>}
      </div>
    )}
    <div className='button-wrapper'>
      <div className='unit-wrapper'>
        <input
          className={[
            ...(className ? [className] : []),
            ...(error ? ['error'] : [])
          ].join(' ')}
          name={name}
          type={type}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          disabled={disabled}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          onClick={onClick}
          onKeyDown={e => e.key === 'Enter' && onEnter()}
          style={{ paddingRight: `${1 + 0.75 * unit.length}em` }}
        />
        {unit && <span className='unit'>{unit}</span>}
      </div>
      {deletable && <IconClose onClick={onDelete} />}
    </div>
    {vertical && error && <span className='error'>{error}</span>}
  </BaseLabel>
)

export interface BaseInputProps {
  deletable?: boolean
  vertical?: boolean
  centered?: boolean
  className?: string
  label?: string
  info?: string
  error?: string
  name?: string
  type?: string
  autoFocus?: boolean
  autoComplete?: 'on' | 'off'
  disabled?: boolean
  placeholder?: string
  min?: number | string
  max?: number | string
  step?: number | string
  value?: string
  unit?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  onClick?: () => void
  onEnter?: () => void
  onDelete?: () => void
}

export const BaseInputPropTypes = {
  deletable: PropTypes.bool,
  vertical: PropTypes.bool,
  centered: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.oneOf(['on', 'off']),
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.string,
  unit: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onEnter: PropTypes.func,
  onDelete: PropTypes.func
}

BaseInput.propTypes = BaseInputPropTypes
BaseInput.defaultProps = {
  deletable: false,
  vertical: false,
  centered: false,
  className: '',
  label: '',
  info: '',
  error: '',
  name: '',
  type: 'text',
  autoFocus: false,
  autoComplete: 'on',
  disabled: false,
  placeholder: '',
  min: '',
  max: '',
  step: 'any',
  value: '',
  unit: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onClick: () => {},
  onEnter: () => {},
  onDelete: () => {}
}
