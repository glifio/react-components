import { ReactNode } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Colors, FontSizes, Spaces } from '../theme'

/*
 * Apply the margin and font size from a standard h2 element to the page
 * title wrapper, this allows for collapsing margins with elements below
 */
const PageTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${Spaces.LARGE};
  margin: 1em 0;
  font-size: ${FontSizes.XLARGE};

  .side-bar {
    display: flex;
    align-items: center;
    gap: ${Spaces.MEDIUM};
    font-size: 1rem;
  }
`

/*
 * Remove margins from the h2 element as they are applied to the wrapper
 */
const PageTitleH2 = styled.h2`
  margin: 0;
  color: ${Colors.PURPLE_MEDIUM};
`

/*
 * PageTitle
 */
export const PageTitle = ({ children, sideContent }: PageTitleProps) => (
  <PageTitleWrapper>
    <PageTitleH2>{children}</PageTitleH2>
    {sideContent && <div className='side-bar'>{sideContent}</div>}
  </PageTitleWrapper>
)

interface PageTitleProps {
  children: ReactNode
  sideContent?: ReactNode
}

PageTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  sideContent: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
