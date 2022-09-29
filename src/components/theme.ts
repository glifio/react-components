export const deviceWidths = {
  phone: 480,
  tablet: 868,
  desktop: 1124
}

export const devices = {
  phone: `${deviceWidths.phone}px`,
  tablet: `${deviceWidths.tablet}px`,
  desktop: `${deviceWidths.desktop}px`
}

export enum Colors {
  BLACK = 'var(--black)',
  WHITE = 'var(--white)',
  WHITE_BROKEN = 'var(--white-broken)',

  GRAY_LIGHT = 'var(--gray-light)',
  GRAY_MEDIUM = 'var(--gray-medium)',
  GRAY_DARK = 'var(--gray-dark)',

  PURPLE_LIGHT = 'var(--purple-light)',
  PURPLE_MEDIUM = 'var(--purple-medium)',
  PURPLE_DARK = 'var(--purple-dark)',

  GREEN_LIGHT = 'var(--green-light)',
  GREEN_MEDIUM = 'var(--green-medium)',
  GREEN_DARK = 'var(--green-dark)',

  YELLOW_LIGHT = 'var(--yellow-light)',
  YELLOW_DARK = 'var(--yellow-dark)',

  RED_LIGHT = 'var(--red-light)',
  RED_MEDIUM = 'var(--red-medium)',
  RED_DARK = 'var(--red-dark)',

  BLUE_GRAY = 'var(--blue-gray)',
  BLUE_LIGHT = 'var(--blue-light)',
  BLUE_MEDIUM = 'var(--blue-medium)',
  BLUE_DARK = 'var(--blue-dark)'
}
