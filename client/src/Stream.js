import React, { useEffect, useRef, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import './Stream.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faVideo, faSquarePlus, faMicrophoneSlash, faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';
const agoraAppId = "3ec3dc68e69e4b539553415e34ce7b03"; // Replace with your Agora App ID
const signalingServerUrl = 'http://localhost:3000'; // Replace with the URL of your signaling server
const Stream = () => {
  const remoteVideoRef = useRef(null);
  const screenShareRef = useRef(null);
  const localStream = useRef(null);
  const socketRef = useRef(null);
  const [streamStarted, setStreamStarted] = useState(false);
  const [screenShareStarted, setScreenShareStarted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);

  const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

  useEffect( async () => {
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

    await client.join(agoraAppId, 'stream', null);
  }, []);

  useEffect(() => {
    connectToSignalingServer();
    return () => {
      stopAgoraStream();
    };
  }, []);

  const startVideo = async () => {
    if (screenShareStarted)
      localStream.current.screenTrack.close();
    setVideoStarted(true);
    // const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    // await client.join(agoraAppId, 'stream', null);

    const cameraTrack = await AgoraRTC.createCameraVideoTrack();
    // await client.publish(cameraTrack);

    cameraTrack.play('local-video');

    localStream.current = { cameraTrack };

    // client.on('user-published', async (user, mediaType) => {
    //   if (mediaType === 'video') {
    //     await client.subscribe(user, mediaType);
    //     const remoteVideoTrack = user.videoTrack;
    //     remoteVideoTrack.play(remoteVideoRef.current);
    //   }
    // });
  };

  const stopVideo = () => {
    if (videoStarted) {
      localStream.current.cameraTrack.close();
    }
    setVideoStarted(false);
  };

  const startScreenShare = async () => {
    if (videoStarted)
      localStream.current.cameraTrack.close();
    setScreenShareStarted(true);

    const screenTrack = await AgoraRTC.createScreenVideoTrack();
    // await client.publish(screenTrack);

    screenTrack.play('local-video');

    localStream.current = { screenTrack };

    // client.on('user-published', async (user, mediaType) => {
    //   if (mediaType === 'video') {
    //     await client.subscribe(user, mediaType);
    //     const remoteVideoTrack = user.videoTrack;
    //     remoteVideoTrack.play(screenShareRef.current);
    //   }
    // });
  };

  const stopScreenShare = () => {
    if (screenShareStarted) {
      localStream.current.screenTrack.close();
    }
    setScreenShareStarted(false);
  };

  const startAudio = async () => {
    setAudioStarted(true);
    // const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    // await client.join(agoraAppId, 'stream', null);

    const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack();
    await client.publish(microphoneTrack);

    client.on('user-published', async (user, mediaType) => {
      if (mediaType === 'audio') {
        await client.subscribe(user, mediaType);
        const remoteAudioTrack = user.audioTrack;
        remoteAudioTrack.play(remoteVideoRef.current);
      }
    });
  };

  const stopAudio = () => {
    if (audioStarted) {
      //
    }
    setAudioStarted(false);
  };

  const stopAgoraStream = () => {
    if (localStream.current) {
      localStream.current.cameraTrack.close();
      localStream.current.screenTrack.close();
      localStream.current.microphoneTrack.close();
    }
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
      {/* <div id="local-video" style={{ width: '320px', height: '240px', border: '1px solid #ccc', marginBottom: '10px' }}></div>
      <div id="share-screen" style={{ width: '320px', height: '240px', border: '1px solid #ccc', marginBottom: '10px' }}></div>
      <video ref={remoteVideoRef} style={{ width: '320px', height: '240px', border: '1px solid #ccc', marginBottom: '10px' }}></video>
      <video ref={screenShareRef} id="share-screen" style={{ width: '320px', height: '240px', border: '1px solid #ccc', marginBottom: '10px' }}></video>
      <button onClick={startVideo}>Start Video</button>
      <button onClick={startScreenShare}>Start Screen Share</button>
      <button onClick={startAudio}>Start Audio</button> */}
      <div className='videoBox' id="local-video"></div>
      <div className='stream-btns'>
        {!audioStarted && <button className='sxbtn' onClick={startAudio}><FontAwesomeIcon icon={faMicrophoneSlash} /></button>}
        {audioStarted && <button className='sbtn' onClick={stopAudio}><FontAwesomeIcon icon={faMicrophone} /></button>}
        {!videoStarted && <button className='sxbtn' onClick={startVideo}><FontAwesomeIcon icon={faVideoSlash} /></button>}
        {videoStarted && <button className='sbtn' onClick={stopVideo}><FontAwesomeIcon icon={faVideo} /></button>}
        {!screenShareStarted && <button className='sbtn' onClick={startScreenShare}><FontAwesomeIcon icon={faSquarePlus} /></button>}
      </div>
    </div>
  );
}

export default Stream;