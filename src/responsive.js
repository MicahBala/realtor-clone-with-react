import { css } from 'styled-components'

export const small = (props) => {
  return css`
    @media only screen and (max-width: 350px) {
      ${props}
    }
  `
}

export const medium = (props) => {
  return css`
    @media only screen and (max-width: 768px) {
      ${props}
    }
  `
}
