import React, { useEffect, useRef, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import io from 'socket.io-client';
const agoraAppId = "29447eacf962489299f833c012f37e15"; // Replace with your Agora App ID
const signalingServerUrl = 'http://localhost:3000'; // Replace with the URL of your signaling server

const Stream = () => {
  const remoteVideoRef = useRef(null);
  const screenShareRef = useRef(null);
  const localStream = useRef(null);
  const socketRef = useRef(null);
  const [streamStarted, setStreamStarted] = useState(false);

  useEffect(() => {
    connectToSignalingServer();
    return () => {
      stopAgoraStream();
    };
  }, []);

  const startVideo = async () => {
    const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    await client.join(agoraAppId, 'stream', null);

    const cameraTrack = await AgoraRTC.createCameraVideoTrack();
    await client.publish(cameraTrack);

    cameraTrack.play('local-video');

    localStream.current = { cameraTrack };

    client.on('user-published', async (user, mediaType) => {
      if (mediaType === 'video') {
        await client.subscribe(user, mediaType);
        const remoteVideoTrack = user.videoTrack;
        remoteVideoTrack.play(remoteVideoRef.current);
      }
    });
  };

  const startScreenShare = async () => {
    const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    await client.join(agoraAppId, 'stream', null);

    const screenTrack = await AgoraRTC.createScreenVideoTrack();
    await client.publish(screenTrack);

    screenTrack.play('share-screen');

    localStream.current = { screenTrack };

    client.on('user-published', async (user, mediaType) => {
      if (mediaType === 'video') {
        await client.subscribe(user, mediaType);
        const remoteVideoTrack = user.videoTrack;
        remoteVideoTrack.play(screenShareRef.current);
      }
    });
  };

  const startAudio = async () => {
    const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    await client.join(agoraAppId, 'stream', null);

    const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack();
    await client.publish(microphoneTrack);

    microphoneTrack.play('local-video');

    localStream.current = { microphoneTrack };

    client.on('user-published', async (user, mediaType) => {
      if(mediaType === 'audio') {
        await client.subscribe(user, mediaType);
        const remoteAudioTrack = user.audioTrack;
        remoteAudioTrack.play(remoteVideoRef.current);
      }
    });
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
    <div>
      <div id="local-video" style={{ width: '320px', height: '240px', border: '1px solid #ccc', marginBottom: '10px' }}></div>
      <div id="share-screen" style={{ width: '320px', height: '240px', border: '1px solid #ccc', marginBottom: '10px' }}></div>
      <video ref={remoteVideoRef} style={{ width: '320px', height: '240px', border: '1px solid #ccc', marginBottom: '10px' }}></video>
      <video ref={screenShareRef} id="share-screen" style={{ width: '320px', height: '240px', border: '1px solid #ccc', marginBottom: '10px' }}></video>
      <button onClick={startVideo}>Start Video</button>
      <button onClick={startScreenShare}>Start Screen Share</button>
      <button onClick={startAudio}>Start Audio</button>
    </div>
  );
}

export default Stream;