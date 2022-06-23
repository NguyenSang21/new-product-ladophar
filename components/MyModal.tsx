import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Fireworks } from 'fireworks-js'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import RenderTime from './RenderTimer'
import PlayAudio from './PlayAudio'

type MyModalType = {
  isOpen: boolean;
  onClose: () => void;
}

const AUDIO_1 = 'countdown.mp3';
const AUDIO_2 = 'phao-hoa.mp3';

export default function MyModal({isOpen, onClose}: MyModalType) {
  const [openCountdown, setOpenCountdown] = React.useState(false);
  const [audioUrl, setAudioUrl] = React.useState('');

  const handleCountdown = () => {
    setAudioUrl(AUDIO_1);
    setTimeout(() => {
      setOpenCountdown(true);
    },1000);
  }

  const handleEndTime = () => {
    const boxElement: any = document.querySelector(".dialog-panel");
    setAudioUrl(AUDIO_2);
    // hidden box
    if(boxElement) {
      boxElement.style.display = "none"
    }
    // start firework
    startFirework();
    // on blur
    opacityTimer();
  }

  const opacityTimer = () => {
    let opacity: number = 0.9;
    const bgElement: any = document.querySelector(".fireworks-container");
    if(bgElement) {
      const interval = setInterval(() => {
        bgElement.style.opacity = opacity;
        opacity = opacity - 0.1;
        opacity = +opacity.toFixed(1);
        console.log(opacity);
        if(opacity === 0.0) {
          clearInterval(interval);
          onClose();
        }
      }, 2000);
    }
  }

  const startFirework = () => {
    const container = document.querySelector('.fireworks-container')
    console.log(container);
    if(container) {
      const fireworks = new Fireworks(container, {
        traceSpeed: 1,
        flickering: 100,
        intensity: 60,
       })
      fireworks.start()
    }
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => false}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-100 fireworks-container" style={{transition: 'opacity 1s'}} />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all flex flex-col justify-center items-center dialog-panel">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {openCountdown ? 'COUNT DOWN' : 'ARE YOU READY TO LAUCH A NEW SUCESSFULL STORY?' } 
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                    {openCountdown ? 'Remaining time' : 'Press start button to count down'}
                    </p>
                  </div>
                  <div className="mt-4">
                    {
                      openCountdown ? (
                        <CountdownCircleTimer
                          isPlaying
                          duration={10}
                          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                          colorsTime={[10, 6, 3, 0]}
                        >
                          {({remainingTime}) => <RenderTime remainingTime={remainingTime} endtime={handleEndTime} />}
                        </CountdownCircleTimer>
                      ) : <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleCountdown}
                    >
                      Start
                    </button>
                    }
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {
        audioUrl && <PlayAudio src={audioUrl} />
      }
    </>
  )
}
