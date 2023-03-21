import styled from '@emotion/styled'
import { Button as _Button, Donut as _Donut, Flex } from 'theme-ui'

export const Container = styled(Flex)`
  align-items: center;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  position: relative;
`

export const Donut = styled(_Donut)`
  position: absolute;
  top: 0;
  z-index: -1;
`

export const Controls = styled(Flex)`
  gap: 1em;
`

export const Button = styled(_Button)`
  width: 100px;
`
