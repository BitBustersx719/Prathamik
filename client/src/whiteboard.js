import React, { useEffect } from "react";
import request from "request";
import whiteWebSdk from 'white-web-sdk'

const Whiteboard = () => {
  useEffect(() => {
    const createRoom = () => {
      const createRoomOptions = {
        method: "POST",
        url: "https://api.netless.link/v5/rooms",
        headers: {
          token: "NETLESSSDK_YWs9V20tWE1leXplVFJ1Vmd0ZiZub25jZT1lMzI5MzIzMC0xMWZkLTExZWUtOTBlYi0yZjYwMTQyNDhjZGImcm9sZT0wJnNpZz02ODgwNDhjYjI0MmYwMjE1MGVmZmUwMDg4NGYxMjY0N2Y0ZWM1Y2RjZjEzMTliNmQ5MTNhNDhlNDljY2RkNDE5",
          "Content-Type": "application/json",
          region: "us-sv",
        },
        body: JSON.stringify({
          isRecord: false,
        }),
      };

      request(createRoomOptions, function (error, response, body) {
        if (error) throw new Error(error);
        const { uuid } = JSON.parse(body);
        createRoomToken(uuid);
      });
    };

    const createRoomToken = (roomUUID) => {
      const roomTokenOptions = {
        method: "POST",
        url: `https://api.netless.link/v5/tokens/rooms/${roomUUID}`,
        headers: {
          token: "NETLESSSDK_YWs9V20tWE1leXplVFJ1Vmd0ZiZub25jZT1lMzI5MzIzMC0xMWZkLTExZWUtOTBlYi0yZjYwMTQyNDhjZGImcm9sZT0wJnNpZz02ODgwNDhjYjI0MmYwMjE1MGVmZmUwMDg4NGYxMjY0N2Y0ZWM1Y2RjZjEzMTliNmQ5MTNhNDhlNDljY2RkNDE5",
          "Content-Type": "application/json",
          region: "in-mum",
        },
        body: JSON.stringify({ lifespan: 3600000, role: "admin" }),
      };

      request(roomTokenOptions, function (error, response, body) {
        if (error) throw new Error(error);
        const { token } = JSON.parse(body);
        initializeWhiteboard(token, roomUUID);
      });
    };

    const initializeWhiteboard = (roomToken, roomUUID) => {
      const whiteWebSdk = new window.WhiteWebSdk({
        appIdentifier: "JnjjQA6FEe6NdMG0QBrsCw/ZDpaiGBmY7KXOQ",
        region: "us-sv",
      });

      const joinRoomParams = {
        uuid: roomUUID,
        uid: "user uid",
        roomToken: roomToken,
      };

      whiteWebSdk
        .joinRoom(joinRoomParams)
        .then(function (room) {
          room.bindHtmlElement(document.getElementById("whiteboard"));
        })
        .catch(function (err) {
          console.error(err);
        });
    };

    createRoom();
  }, []);

  return <div id="whiteboard" style={{ width: "100%", height: "100vh" }}></div>;
};

export default Whiteboard;
