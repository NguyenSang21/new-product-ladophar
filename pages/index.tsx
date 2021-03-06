import React from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import MyModal from '../components/MyModal'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import PlayAudio from '../components/PlayAudio'
import {  Element, scroller } from 'react-scroll'

const BG_AUDIO = 'nhac-nen.mp3';

const Home: NextPage = () => {
  const [isOpen, setOpenModal] = React.useState(true);
  const [isOpenConfetti, setOpenConfetti] = React.useState(false);
  const [audioUrl, setAudioUrl] = React.useState('');
  const { width } = useWindowSize();

  const handleOnClose = () => {
    setOpenModal(false);
    setOpenConfetti(true);
    setTimeout(() => {
      setOpenConfetti(false);
      handleAutoScroll();
    }, 10000);
    setAudioUrl(BG_AUDIO);
  }

  const handleAutoScroll = () => {
    let scrollID = 1;
    const i = setInterval(() => {
      if(scrollID > 5) {
        clearInterval(i);
      }
      scroller.scrollTo(`scroll-to-${scrollID}`, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      })
      scrollID += 1
    }, 5000);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {
        isOpenConfetti ? (
        <Confetti
          width={width}
          height={1000}
        />
        ): null
      }
      <div>
        <Image
          alt='Mountains'
          src='/banner1.png'
          quality={100}
          width={1920} 
          height={1196}
        />
      </div>
      <Element name="scroll-to-1">
        <div className="flex content-center items-center py-10">
          <div className="flex w-1/2 justify-center">
            <Image
              alt='Mountains'
              src='/ladophar_phone.gif'
              width={1080}
              height={932}
            />
          </div>
          <div className="flex w-1/2 justify-center">
            <div className="text-center text-5xl text-[#5F4C8B] font-semibold space-y-2">
              <p>Gian hàng và sản phẩm Ladophar</p>
              <p>trên ứng dụng ECO Merchant</p>
            </div>
          </div>
        </div>
      </Element>
      <Element name="scroll-to-2">
        <Image
          alt='Mountains'
          src='/LADOPHAR_LP-04.png'
          layout='responsive'
          quality={100}
          width={1920} 
          height={806}
        />
      </Element>
      <Element name="scroll-to-3">
        <Image
          alt='Mountains'
          src='/banner2.png'
          quality={100}
          width={1920} 
          height={889}
        />
      </Element>
      <Element name="scroll-to-4">
        <Image
          alt='Mountains'
          src='/LADOPHAR_LP-05.png'
          quality={100}
          width={1920} 
          height={1394}
        />
      </Element>
      <Element name="scroll-to-5">
        <Image
          alt='Mountains'
          src='/LADOPHAR_LP-07.png'
          quality={100}
          width={1920} 
          height={351}
        />
      </Element>
      {
        isOpen ? <MyModal isOpen={isOpen} onClose={handleOnClose} /> : null
      }
      {
        audioUrl ? <PlayAudio src={audioUrl} /> : null
      }
    </div>
  )
}

export default Home
