import React, { FC, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useMessageQuery } from '../../../generated/graphql'
import Box from '../../Box'
import { P, H2, HR } from '../../Typography'
import ButtonV2 from '../../Button/V2'
import { IconSpeedUp, IconCancel } from '../../Icons'

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

type MessageDetailProps = {
  cid: string
  speedUp?: () => void
  cancel?: () => void
}

export default function MessageDetail(props: MessageDetailProps) {
  const [seeMore, setSeeMore] = useState(false)
  const { data, loading, error } = useMessageQuery({
    variables: {
      cid: props.cid
    }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( {error.message}</p>

  return (
    <Box>
      <Box display='flex' alignItems='center' justifyContent='space-between' gridGap='1rem'>
        <H2 color='core.primary' fontSize='1.5rem' margin='0'>
          Message Overview
        </H2>
        <Box display='flex' gridGap='1rem'>
          {props.speedUp && (
            <ButtonV2 fontSize='1.5rem'>
              <IconSpeedUp width='1.75rem' />
              Speed up
            </ButtonV2>
          )}
          {props.cancel && (
            <ButtonV2 fontSize='1.5rem'>
              <IconCancel width='1.25rem' />
              Cancel
            </ButtonV2>
          )}
        </Box>
      </Box>
      <HR />
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
      <HR />
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
