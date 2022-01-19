import React from 'react'
import PropTypes from 'prop-types'
import { P } from '../../Typography'
import Box from '../../Box'

type PaginatorProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Paginator(props: PaginatorProps) {
  return (
    <Box display='flex' flexDirection='row' justifyContent='space-around'>
      <button
        disabled={props.currentPage === 1}
        onClick={() => props.onPageChange(1)}
      >
        First
      </button>
      <button
        disabled={props.currentPage === 1}
        onClick={() => props.onPageChange(props.currentPage - 1)}
      >
        {'<'}
      </button>
      <div>
        <P>
          Page {props.currentPage} of {props.totalPages}
        </P>
      </div>
      <button
        disabled={props.currentPage === props.totalPages}
        onClick={() => props.onPageChange(props.currentPage + 1)}
      >
        {'>'}
      </button>
      <button
        disabled={props.currentPage === props.totalPages}
        onClick={() => props.onPageChange(props.totalPages)}
      >
        Last
      </button>
    </Box>
  )
}

Paginator.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
}
