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

  const startAgoraStream = async () => {
    const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    await client.join(agoraAppId, 'stream', null);

    const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack();
    const cameraTrack = await AgoraRTC.createCameraVideoTrack();
    const screenTrack = await AgoraRTC.createScreenVideoTrack();

    await client.publish(microphoneTrack, cameraTrack);
    await client.publish(screenTrack);

    cameraTrack.play('local-video');
    screenTrack.play('share-screen');

    localStream.current = { cameraTrack, screenTrack };

    client.on('user-published', async (user, mediaType) => {
      if (mediaType === 'video') {
        await client.subscribe(user, mediaType);
        const remoteVideoTrack = user.videoTrack;
        remoteVideoTrack.play(remoteVideoRef.current);
      }
    });

    // Emit the camera and screen tracks to the signaling server
    socketRef.current.emit('send_tracks', { cameraTrack, screenTrack });
  };

  const stopAgoraStream = () => {
    if (localStream.current) {
      localStream.current.cameraTrack.close();
      localStream.current.screenTrack.close();
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

    socketRef.current.on('receive_tracks', (tracks) => {
      const remoteVideoTrack = tracks.cameraTrack;
      const screenShareTrack = tracks.screenTrack;
      remoteVideoTrack.play(remoteVideoRef.current);
      screenShareTrack.play(screenShareRef.current);
    });
  };

  const handleStartStream = () => {
    if (!streamStarted) {
      startAgoraStream();
      setStreamStarted(true);
    }
  };

  return (
    <div>
      <div id="local-video" style={{ width: '320px', height: '240px', border: '1px solid #ccc', marginBottom: '10px' }}></div>
      <div ref={remoteVideoRef}></div>
      <div id="share-screen" style={{ width: '320px', height: '240px', border: '1px solid #ccc', marginBottom: '10px' }}></div>
      <video ref={remoteVideoRef} style={{ width: '320px', height: '240px', border: '1px solid #ccc', marginBottom: '10px' }}></video>
      <video ref={screenShareRef} id="share-screen" style={{ width: '320px', height: '240px', border: '1px solid #ccc', marginBottom: '10px' }}></video>
      <button onClick={handleStartStream}>Start Stream</button>
    </div>
  );
}

export default Stream;
