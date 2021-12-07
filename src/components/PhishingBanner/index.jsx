import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function PhishingBanner({ url }) {
  const [closed, setClosed] = useState(false)
  return <div>Hi</div>
}

PhishingBanner.propTypes = {
  url: PropTypes.string.isRequired
}
