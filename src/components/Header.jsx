import React from 'react'
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import { small } from '../responsive'

const HeaderWrapper = styled.div`
  border-bottom: solid 1px gray;
  background-color: #fff;
  box-shadow: 0 0 8px 0px #beb5b5;
  position: sticky;
  top: 0;
  z-index: 50;
`

const PageHeader = styled.header`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 12px; */
  max-width: 1152px;
`

const ImageWrapper = styled.div``

const Image = styled.img`
  height: 1.25rem;
  cursor: pointer;
`
const Menu = styled.nav``

const List = styled.ul`
  list-style: none;
  display: flex;
`

const ListItem = styled.li`
  margin-right: 2.5rem;
  padding: 12px 0;
  color: #5a5757;
  cursor: pointer;

  &.active {
    font-style: 14px;
    font-weight: 600;
    color: #000;
    border-bottom: solid 3px red;
  }

  &:last-child {
    margin-right: none;
  }
`

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }

  return (
    <HeaderWrapper>
      <PageHeader>
        <ImageWrapper>
          <Image
            src='https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg'
            alt='realtor logo'
            onClick={() => navigate('/')}
          />
        </ImageWrapper>
        <Menu>
          <List>
            <ListItem
              className={pathMatchRoute('/') && 'active'}
              onClick={() => navigate('/')}
            >
              Home
            </ListItem>
            <ListItem
              className={pathMatchRoute('/offers') && 'active'}
              onClick={() => navigate('/offers')}
            >
              Offers
            </ListItem>
            <ListItem
              className={pathMatchRoute('/sign-in') && 'active'}
              onClick={() => navigate('/sign-in')}
            >
              Sign in
            </ListItem>
          </List>
        </Menu>
      </PageHeader>
    </HeaderWrapper>
  )
}

export default Header
