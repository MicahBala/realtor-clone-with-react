import React from 'react'
import styled from 'styled-components'
import { FcGoogle } from 'react-icons/fc'

const Button = styled.button`
  width: 100%;
  background-color: red;
  color: #fff;
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 0.25rem;
  border: none;
  opacity: 0.8;
  transition: all 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 1;
  }
`

const OAuth = () => {
  return (
    <Button>
      <FcGoogle
        style={{
          backgroundColor: '#fff',
          borderRadius: '50%',
          fontSize: '1.2rem',
          marginRight: '0.5rem',
        }}
      />{' '}
      Continue with Google
    </Button>
  )
}

export default OAuth
