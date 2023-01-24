import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaShare } from 'react-icons/fa'
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

const Main = styled.main``

const SliderContent = styled.div`
  width: 100%;
  overflow: hidden;
  height: 300px;
  position: relative;
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
    </Main>
  )
}

export default Listing
