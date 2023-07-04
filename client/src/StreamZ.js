import "./StreamZ.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    MeetingProvider,
    MeetingConsumer,
    useMeeting,
    useParticipant,
} from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "./API";
import ReactPlayer from "react-player";

function JoinScreen({ getMeetingAndToken }) {
    const [meetingId, setMeetingId] = useState(null);
    const onClick = async () => {
        await getMeetingAndToken(meetingId);
    };
    return (
        <div>
            <input
                type="text"
                placeholder="Enter Meeting Id"
                onChange={(e) => {
                    setMeetingId(e.target.value);
                }}
            />
            <button onClick={onClick}>Join</button>
            {" or "}
            <button onClick={onClick}>Create Meeting</button>
        </div>
    );
}

const PresenterView = ({ presenterId }) => {
    const { screenShareAudioStream, isLocal, screenShareStream, screenShareOn } =
    useParticipant(presenterId);
    
    const mediaStream = useMemo(() => {
        if (screenShareOn && screenShareStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(screenShareStream.track);
            return mediaStream;
        }
    }, [screenShareStream, screenShareOn]);

    const audioPlayer = useRef();

    useEffect(() => {
        if (
          !isLocal &&
          audioPlayer.current &&
          screenShareOn &&
          screenShareAudioStream
        ) {
          const mediaStream = new MediaStream();
          mediaStream.addTrack(screenShareAudioStream.track);
    
          audioPlayer.current.srcObject = mediaStream;
          audioPlayer.current.play().catch((err) => {
            if (
              err.message ===
              "play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD"
            ) {
              console.error("audio" + err.message);
            }
          });
        } else {
          audioPlayer.current.srcObject = null;
        }
      }, [screenShareAudioStream, screenShareOn, isLocal]);

    return (
        <>
            <ReactPlayer
                playsinline
                playIcon={<></>}
                pip={false}
                light={false}
                controls={false}
                muted={true}
                playing={true}
                url={mediaStream}
                height={"100%"}
                width={"100%"}
                onError={(err) => {
                    console.log(err, "presenter video error");
                }}
            />
            <audio autoPlay playsInline controls={false} ref={audioPlayer} />
        </>
    );
};

function ParticipantView(props) {
    const micRef = useRef(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
        useParticipant(props.participantId, { onStreamEnabled, onStreamDisabled });

    function onStreamEnabled(stream) {
        if (stream.kind === 'share') {
            console.log("Share Stream On: onStreamEnabled", stream);
        }
    }

    function onStreamDisabled(stream) {
        if (stream.kind === 'share') {
            console.log("Share Stream Off: onStreamDisabled", stream);
        }
    }

    const videoStream = useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [webcamStream, webcamOn]);

    useEffect(() => {
        if (micRef.current) {
            if (micOn && micStream) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(micStream.track);

                micRef.current.srcObject = mediaStream;
                micRef.current
                    .play()
                    .catch((error) =>
                        console.error("videoElem.current.play() failed", error)
                    );
            } else {
                micRef.current.srcObject = null;
            }
        }
    }, [micStream, micOn]);

    return (
        <div>
            <p>
                Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                {micOn ? "ON" : "OFF"}
            </p>
            <audio ref={micRef} autoPlay playsInline muted={isLocal} />
            {webcamOn && (
                <ReactPlayer
                    playsinline
                    pip={false}
                    light={false}
                    controls={false}
                    muted={true}
                    playing={true}
                    url={videoStream}
                    height={"300px"}
                    width={"300px"}
                    onError={(err) => {
                        console.log(err, "participant video error");
                    }}
                />
            )}
        </div>
    );
}

function Controls(props) {
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    return (
        <div>
            <button onClick={() => leave()}>Leave</button>
            <button onClick={() => toggleMic()}>toggleMic</button>
            <button onClick={() => toggleWebcam()}>toggleWebcam</button>
            <button onClick={() => props.handleEnableScreenShare()}>Enable Screen Share</button>
            <button onClick={() => props.handleDisableScreenShare()}>Disable Screen Share</button>
            <button onClick={() => props.handleToggleScreenShare()}>Toggle Screen Share</button>
        </div>
    );
}

function MeetingView(props) {
    const [joined, setJoined] = useState(null);
    const { enableScreenShare, disableScreenShare, toggleScreenShare } = useMeeting();

    const handleEnableScreenShare = () => {
        enableScreenShare();
    }

    const handleDisableScreenShare = () => {
        disableScreenShare();
    }

    const handleToggleScreenShare = () => {
        toggleScreenShare();
    }

    function onPresenterChanged(presenterId) {
        if (presenterId) {
            console.log(presenterId, "started screen share");
        } else {
            console.log("someone stopped screen share");
        }
    }

    const { join, participants } = useMeeting({
        onMeetingJoined: () => {
            setJoined("JOINED");
        },
        onPresenterChanged,
        onMeetingLeft: () => {
            props.onMeetingLeave();
        },
    });
    const joinMeeting = () => {
        setJoined("JOINING");
        join();
    };

    const { presenterId } = useMeeting();

    return (
        <div className="container">
            <h3>Meeting Id: {props.meetingId}</h3>
            {joined && joined == "JOINED" ? (
                <div>
                    <Controls handleEnableScreenShare={handleEnableScreenShare} handleDisableScreenShare={handleDisableScreenShare} handleToggleScreenShare={handleToggleScreenShare} />
                    {[...participants.keys()].map((participantId) => (
                        <ParticipantView
                            participantId={participantId}
                            key={participantId}
                        />
                    ))}
                </div>
            ) : joined && joined == "JOINING" ? (
                <p>Joining the meeting...</p>
            ) : (
                <button onClick={joinMeeting}>Join</button>
            )}
            {presenterId && <PresenterView presenterId={presenterId} />}
        </div>
    );
}

function StreamZ(props) {
    const [meetingId, setMeetingId] = useState(null);

    const getMeetingAndToken = async (id) => {
        const meetingId =
            id == null ? await createMeeting({ token: authToken }) : id;
        setMeetingId(meetingId);
    };

    const onMeetingLeave = () => {
        setMeetingId(null);
    };

    return authToken && meetingId ? (
        <MeetingProvider
            config={{
                meetingId,
                micEnabled: true,
                webcamEnabled: true,
                name: "Niladri",
            }}
            token={authToken}
        >
            <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
        </MeetingProvider>
    ) : (
        <JoinScreen getMeetingAndToken={getMeetingAndToken} />
    );
}

export default StreamZ;