import React, { useEffect, useRef, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import './Stream.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faVideo, faSquarePlus, faMicrophoneSlash, faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';

const agoraAppId = "3ec3dc68e69e4b539553415e34ce7b03";
const signalingServerUrl = 'http://localhost:4000';

const Stream = () => {
  const remoteVideoRef = useRef(null);
  const screenShareRef = useRef(null);
  const localStream = useRef({
    cameraTrack: null,
    screenTrack: null,
    microphoneTrack: null
  });
  const socketRef = useRef(null);
  const [screenShareStarted, setScreenShareStarted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);

  const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

  useEffect(() => {
    connectToSignalingServer();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    client.on('user-published', async (user, mediaType) => {
      if (mediaType === 'video') {
        await client.subscribe(user, mediaType);
        const remoteVideoTrack = user.videoTrack;
        remoteVideoTrack.play(remoteVideoRef.current);
      }
    });

    client.on('user-published', async (user, mediaType) => {
      if (mediaType === 'video') {
        await client.subscribe(user, mediaType);
        const remoteVideoTrack = user.videoTrack;
        remoteVideoTrack.play(screenShareRef.current);
      }
    });

    client.on('user-published', async (user, mediaType) => {
      if (mediaType === 'audio') {
        await client.subscribe(user, mediaType);
        const remoteAudioTrack = user.audioTrack;
        remoteAudioTrack.play(remoteVideoRef.current);
      }
    });

    try {
      console.log('Joining channel');
      client.join(agoraAppId, 'stream', null);
    } catch (error) {
      console.log('Error joining Agora channel:', error);
    }

    return () => {
      stopAgoraStream();
    };
  }, []);

  const startVideo = async () => {
    if (screenShareStarted) {
      stopScreenShare();
    }

    if (!videoStarted) {
      setVideoStarted(true);

      const cameraTrack = await AgoraRTC.createCameraVideoTrack();
      await client.publish(cameraTrack);

      cameraTrack.play('local-video');

      localStream.current.cameraTrack = cameraTrack;
    }
  };

  const startScreenShare = async () => {
    if (videoStarted) {
      stopVideo();
    }

    if (!screenShareStarted) {
      setScreenShareStarted(true);

      const screenTrack = await AgoraRTC.createScreenVideoTrack();
      await client.publish(screenTrack);

      screenTrack.play('local-video');

      localStream.current.screenTrack = screenTrack;
    }
  };

  const startAudio = async () => {
    if (!audioStarted) {
      setAudioStarted(true);

      const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack();
      await client.publish(microphoneTrack);
      localStream.current.microphoneTrack = microphoneTrack;
    }
  };

  const stopVideo = () => {
    if (videoStarted) {
      localStream.current.cameraTrack.close();
      client.off(localStream.current.cameraTrack);
      localStream.current.cameraTrack = null;
      setVideoStarted(false);
    }
  };

  const stopScreenShare = () => {
    if (screenShareStarted) {
      localStream.current.screenTrack.close();
      client.off(localStream.current.screenTrack);
      localStream.current.screenTrack = null;
      setScreenShareStarted(false);
    }
  };

  const stopAudio = () => {
    if (audioStarted) {
      client.off(localStream.current.microphoneTrack);
      setAudioStarted(false);
    }
  };

  const stopAgoraStream = () => {
    stopVideo();
    stopScreenShare();
    stopAudio();
  };

  const connectToSignalingServer = () => {
    socketRef.current = io(signalingServerUrl);

    socketRef.current.on('connect', () => {
      console.log('Connected to signaling server');
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from signaling server');
    });
  };

  return (
    <div className='stream-body'>
      <div className='videoBox' id="local-video"></div>
      <div className='stream-btns'>
        {!audioStarted && <button className='sxbtn' onClick={startAudio}><FontAwesomeIcon icon={faMicrophoneSlash} /></button>}
        {audioStarted && <button className='sbtn' onClick={stopAudio}><FontAwesomeIcon icon={faMicrophone} /></button>}
        {!videoStarted && <button className='sxbtn' onClick={startVideo}><FontAwesomeIcon icon={faVideoSlash} /></button>}
        {videoStarted && <button className='sbtn' onClick={stopVideo}><FontAwesomeIcon icon={faVideo} /></button>}
        {!screenShareStarted && <button className='sbtn' onClick={startScreenShare}><FontAwesomeIcon icon={faSquarePlus} /></button>}
        <video ref={remoteVideoRef} style={{ width: '320px', height: '240px', border: '1px solid #ccc', marginBottom: '10px' }}></video>
        <video ref={screenShareRef} id="share-screen" style={{ width: '320px', height: '240px', border: '1px solid #ccc', marginBottom: '10px' }}></video>
      </div>
    </div>
  );
};
