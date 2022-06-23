import React from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import MyModal from '../components/MyModal'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import PlayAudio from '../components/PlayAudio'

const BG_AUDIO = 'nhac-nen.mp3';

const Home: NextPage = () => {
  const [isOpen, setOpenModal] = React.useState(true);
  const [isOpenConfetti, setOpenConfetti] = React.useState(false);
  const [audioUrl, setAudioUrl] = React.useState('');
  const { width, height } = useWindowSize();

  const handleOnClose = () => {
    setOpenModal(false);
    setOpenConfetti(true);
    // setTimeout(() => {
    //   setOpenConfetti(false);
    // }, 25000);
    // setAudioUrl(BG_AUDIO);
  }

  return (
    <>
      {
        isOpenConfetti ? (
        <Confetti
          width={1900}
          height={1000}
        />
        ): null
      }
      <div>
        <Image
          alt='Mountains'
          src='/banner1.png'
          quality={100}
          width={1980} 
          height={1080}
        />
      </div>
      <div className="flex content-center items-center py-10">
        <div className="flex w-1/2 justify-center">
          <Image
            alt='Mountains'
            src='/ladophar_phone.gif'
            width={700}
            height={700}
          />
        </div>
        <div className="flex w-1/2 justify-center">
          <div className="text-center text-4xl text-[#5F4C8B] font-semibold">
            <p>Giao hàng và sản phẩm Ladophar</p>
            <p>trên ứng dụng ECO Merchant</p>
          </div>
        </div>
      </div>
      <div>
        <Image
          alt='Mountains'
          src='/LADOPHAR_LP-04.png'
          layout='responsive'
          quality={100}
          width={1980} 
          height={1080}
        />
      </div>
      <div>
        <Image
          alt='Mountains'
          src='/banner2.png'
          quality={100}
          width={1980} 
          height={1080}
        />
      </div>
      <div>
        <Image
          alt='Mountains'
          src='/LADOPHAR_LP-06.png'
          quality={100}
          width={1980} 
          height={1394}
        />
      </div>
      <div>
        <Image
          alt='Mountains'
          src='/LADOPHAR_LP-07.png'
          quality={100}
          width={1980} 
          height={351}
        />
      </div>
      {
        isOpen ? <MyModal isOpen={isOpen} onClose={handleOnClose} /> : null
      }
      {
        audioUrl ? <PlayAudio src={audioUrl} /> : null
      }
    </>
  )
}

export default Home
