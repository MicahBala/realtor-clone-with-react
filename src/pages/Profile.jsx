import React, { useState } from 'react'
import styled from 'styled-components'
import { medium, small } from '../responsive'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { toast } from 'react-toastify'

const Section = styled.section`
  max-width: 72rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  margin-top: 1.5rem;
  font-weight: 700;
`

const FormWrapper = styled.div`
  width: 40%;
  margin: 0 auto;

  ${small({
    width: '100%',
    padding: '1.25rem',
  })};

  ${medium({
    width: '90%',
  })};
`

const Form = styled.form``

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  border-radius: 0.25rem;
  border: solid 1px rgb(209, 213, 219);
  color: rgb(55, 65, 81);
  background-color: #fff;
  transition: 0.25s ease-in-out;
  margin-bottom: 1.5rem;

  &:first-child {
    margin-top: 1.5rem;
  }
`

const AuthWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding: 0.5rem 0;
  margin-bottom: 1.5rem;

  ${small({
    fontSize: '0.875rem',
  })}

  ${medium({
    fontSize: '1.25rem',
  })}
`

const TextSmall = styled.small`
  color: rgb(55, 65, 81);
  padding: 0 0.2rem;
`

const Span = styled.span``

const Profile = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formData

  const handleSignOut = () => {
    auth.signOut()
    navigate('/')
    toast.info('Sign out successful!')
  }
  return (
    <>
      <Section>
        <Title>My Profile</Title>
        <FormWrapper>
          <Form>
            <Input type='text' name='name' value={name} disabled />
            <Input type='email' name='email' value={email} disabled />
          </Form>

          <AuthWrapper>
            <TextSmall>
              Do you want to change your name?{' '}
              <Span
                to='/sign-up'
                style={{
                  color: 'red',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                Edit
              </Span>
            </TextSmall>
            <TextSmall>
              <Span
                style={{
                  color: '#3B8DDD',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
                onClick={handleSignOut}
              >
                Sign out
              </Span>
            </TextSmall>
          </AuthWrapper>
        </FormWrapper>
      </Section>
    </>
  )
}

export default Profile
