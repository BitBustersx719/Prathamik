import WhiteWebSdk from 'white-web-sdk';
import { v4 as uuidv4 } from 'uuid';

// Generate a UUID
const useruserid = uuidv4();
console.log('UUID:', useruserid);

// Generate a random UID
const userid = Math.floor(Math.random() * 1000000);
console.log('UID:', userid);

// Generate a random Room ID
const roomId = Math.floor(Math.random() * 1000000);
console.log('Room ID:', roomId);
// Initialize WhiteWebSdk
const whiteWebSdk = new WhiteWebSdk({
  appIdentifier: 'Your App Identifier',
  region: 'us-sv',
});

// Join the whiteboard room
function joinWhiteboardRoom(uuid, uid, roomToken) {
  const joinRoomParams = {
    uuid: useruserid,
    uid: userid,
    roomToken: roomId,
  };

  return whiteWebSdk.joinRoom(joinRoomParams);
}

// Create the whiteboard
function createWhiteboard(room) {
  // Get the HTML element where the whiteboard will be displayed
  const whiteboardElement = document.getElementById('whiteboard');

  // Bind the room to the whiteboard element
  room.bindHtmlElement(whiteboardElement);

  // Set up event listeners for whiteboard tools
  // Add your code here to handle whiteboard tools (e.g., color changes, erasers, shapes, etc.)

  // Example event listener for color changes
  const colorPicker = document.getElementById('colorPicker');
  colorPicker.addEventListener('change', (event) => {
    const color = event.target.value;
    room.setMemberState({ currentColor: color });
  });
}

// Export the functions
export { joinWhiteboardRoom, createWhiteboard };
