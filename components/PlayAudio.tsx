import React from 'react'
import ReactAudioPlayer from 'react-audio-player';

type PlayAudioType = {
  src: string;
}

export default function PlayAudio({src}: PlayAudioType) {
  return (
    <>
      <ReactAudioPlayer
        src={src}
        autoPlay
        controls
      />
    </>
  )
}
