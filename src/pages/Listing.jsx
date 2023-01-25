import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaShare, FaBed, FaBath, FaParking } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { doc, db, getDoc } from '../firebase'
import Spinner from '../components/Spinner'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from 'swiper'
import 'swiper/css/bundle'
import { limitToLast } from 'firebase/firestore'
import { medium, small } from '../responsive'

const Main = styled.main``

const SliderContent = styled.div`
  width: 100%;
  overflow: hidden;
  height: 300px;
  position: relative;
  overflow: hidden;
`
const Tooltip = styled.span`
  background-color: #fff;
  color: #000;
  border: solid 1px #000;
  padding: 1rem;
  border-radius: 1rem;
  font-weight: bolder;
  position: absolute;
  top: 22%;
  right: 3%;
  z-index: 10;
`

const DetailWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 65rem;
  margin: 1rem auto;
  padding: 1.5rem;
  border-radius: 0.25rem;
  background-color: #fff;
  -webkit-box-shadow: 1px 4px 7px 2px rgba(143, 143, 143, 0.92);
  box-shadow: 1px 4px 7px 2px rgba(143, 143, 143, 0.92);
  gap: 1.5rem;

  ${medium({
    gap: '0',
  })};
`

const ListingDetail = styled.div`
  width: 100%;
  height: 400px;
  width: 48%;

  ${medium({
    width: '100%',
    height: '200px',
  })};
`

const MapDetail = styled.div`
  background-color: blue;
  width: 100%;
  height: 400px;
  width: 48%;
  overflow-x: hidden;
  z-index: 10;

  ${medium({
    width: '100%',
    height: '200px',
  })};
`
const Text = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #1e3a8a;
`

const Listing = () => {
  const params = useParams()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [linkCopied, setLinkCopied] = useState(false)
  SwiperCore.use([Autoplay, Navigation, Pagination])

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setListing(docSnap.data())
        setLoading(false)
      }
    }

    fetchListing()
  }, [listing, params.listingId])

  if (loading) {
    return <Spinner />
  }

  return (
    <Main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: 'progressbar' }}
        effect='fade'
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <SliderContent
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
            ></SliderContent>
          </SwiperSlide>
        ))}
      </Swiper>
      <FaShare
        style={{
          position: 'fixed',
          top: '13%',
          right: '3%',
          zIndex: '10',
          cursor: 'pointer',
          width: '3rem',
          height: '3rem',
          color: '#64748B',
          backgroundColor: '#fff',
          border: 'solid 2px #D3D3D3',
          borderRadius: '50%',
          padding: '0.8rem',
        }}
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          setLinkCopied(true)

          setTimeout(() => {
            setLinkCopied(false)
          }, 2000)
        }}
      />
      {linkCopied && <Tooltip>Link Copied!</Tooltip>}

      <DetailWrapper>
        <ListingDetail>
          <Text>
            {listing.name} - $
            {listing.offer
              ? listing.discount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : listing.price}
            {listing.type === 'rent' && ' / month'}
          </Text>
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            }}
          >
            <MdLocationOn style={{ fontSize: '1.2rem', color: '#42a535' }} />{' '}
            {listing.address}
          </p>
          <p
            style={{
              fontWeight: 'bolder',
              color: '#fff',
              backgroundColor: '#991B1B',
              width: '40%',
              padding: '0.5rem 0',
              textAlign: 'center',
              borderRadius: '0.5rem',
            }}
          >
            {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
          </p>
          <p
            style={{
              margin: '1.2rem 0',
              fontSize: '1.5rem',
            }}
          >
            <span
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: '#0a0a0a',
              }}
            >
              Description
            </span>
            - {listing.description}
          </p>
          <div
            style={{
              width: '80%',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <span>
              <FaBed /> {listing.bedrooms}{' '}
              {listing.bedrooms > 1 ? 'Beds' : 'Bed'}
            </span>
            <span>
              <FaBath /> {listing.bathrooms}
              {listing.bathrooms > 1 ? 'Baths' : 'Bath'}
            </span>
            <span>
              <FaParking /> {listing.parking ? 'Parking' : 'No Parking'}
            </span>
            <span>
              <FaParking /> {listing.furnished ? 'Furnished' : 'Not Furnished'}
            </span>
          </div>
          <div
            style={{
              backgroundColor: '#1D4ED8',
              color: '#fff',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              padding: '0.8rem 0',
              textAlign: 'center',
              borderRadius: '0.5rem',
              cursor: 'pointer',
            }}
          >
            Contact Landlord
          </div>
        </ListingDetail>
        <MapDetail></MapDetail>
      </DetailWrapper>
    </Main>
  )
}

export default Listing
