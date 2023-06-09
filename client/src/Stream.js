import React, { useEffect, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const agoraAppId = "#########"// Replace with your Agora App ID

const Stream = () => {
  const remoteVideoRef = useRef(null);
  const localStream = useRef(null);

  useEffect(() => {
    startAgoraStream();

    return () => {
      stopAgoraStream();
    };
  }, []);

  const startAgoraStream = async () => {
    const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    await client.join(agoraAppId, 'stream', null);

    const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack();
    const cameraTrack = await AgoraRTC.createCameraVideoTrack();
    await client.publish(microphoneTrack, cameraTrack);

    cameraTrack.play('local-video');
    localStream.current = cameraTrack;

    client.on('user-published', async (user, mediaType) => {
      if (mediaType === 'video') {
        await client.subscribe(user, mediaType);
        const remoteVideoTrack = user.videoTrack;
        remoteVideoTrack.play(remoteVideoRef.current);
      }
    });
  };

  const stopAgoraStream = () => {
    if (localStream.current) {
      localStream.current.close();
    }
  };

  return (
    <div>
      <div className="local-video"></div>
      <div ref={remoteVideoRef}></div>
    </div>
  );
};

export default Stream;
