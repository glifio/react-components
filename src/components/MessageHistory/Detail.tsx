import React, { FC, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'
import { MessageConfirmed } from './types'
import { MESSAGE_CONFIRMED } from './queries'
import Box from '../Box'
import { P, H2 } from '../Typography'
import { ButtonV2 } from '..'

const SeeMore = styled(P).attrs(() => ({
  color: 'core.primary',
  role: 'button'
}))`
  cursor: pointer;
`

const Status: FC<{ exitCode: number }> = ({ exitCode }) => {
  return (
    <div>
      <P>{exitCode === 0 ? 'SUCCESS' : 'ERROR'}</P>
    </div>
  )
}

// TODO - goal 4
// eslint-disable-next-line
const Confidence: FC<{ height: number }> = ({ height }) => {
  return (
    <div>
      <P>High</P>
    </div>
  )
}

export default function MessageDetail(props: {
  cid: string
  speedUp?: () => void
  cancel?: () => void
}) {
  const { loading, error, data } = useQuery<
    { message: MessageConfirmed },
    { cid: string }
  >(MESSAGE_CONFIRMED, { variables: { cid: props.cid } })

  const [seeMore, setSeeMore] = useState(false)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( {error.message}</p>
  return (
    <Box>
      <H2 color='core.primary'>Message Overview</H2>
      {props.speedUp && <ButtonV2 onClick={props.speedUp}>Speed up</ButtonV2>}
      {props.cancel && <ButtonV2 onClick={props.cancel}>Cancel</ButtonV2>}
      {/* ? CSS GRID ? */}
      <span>
        <P>CID</P>
        <P>{props.cid}</P>
      </span>
      <span>
        <P>Status and Confidence</P>
        <Status exitCode={data.message.exitCode} />
        <Confidence height={data.message.height} />
      </span>
      {/* Details go here */}
      {seeMore ? (
        <SeeMore onClick={() => setSeeMore(!seeMore)}>
          Click to see less
        </SeeMore>
      ) : (
        <SeeMore onClick={() => setSeeMore(!seeMore)}>
          Click to see more
        </SeeMore>
      )}
      {seeMore && <>{/* See more details */}</>}
    </Box>
  )
}

MessageDetail.propTypes = {
  cid: PropTypes.string.isRequired,
  speedUp: PropTypes.func,
  cancel: PropTypes.func
}
