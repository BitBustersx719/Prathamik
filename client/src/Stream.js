import React, { useEffect, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const agoraAppId = "29447eacf962489299f833c012f37e15"// Replace with your Agora App ID

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
    const cameraTrack = await AgoraRTC.createCameraVideoTrack({
      encoderConfig: {
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      }
    });
    const ShareScreen= await AgoraRTC.createScreenVideoTrack()
    await client.publish(microphoneTrack, cameraTrack);
    await client.publish(ShareScreen)
    cameraTrack.play('local-video');
    ShareScreen.play('share_screen')
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
      <div id="local-video" style={{ width: '320px', height: '240px', border: '1px solid #ccc', marginBottom: '10px' }}></div>
      <div ref={remoteVideoRef}></div>
      <div id="share_screen" style={{ width: '320px', height: '240px', border: '1px solid #ccc', marginBottom: '10px' }}></div>
      <div ref={remoteVideoRef}></div>
    </div>
  );
};

export default Stream;
