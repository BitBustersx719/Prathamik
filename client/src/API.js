export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI0NGUwZDAwOC03ZTJhLTRlNzYtYTAwYS1mMGU2NWMzMTNlZGIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5NzM1NTg4MSwiZXhwIjoxNjk5OTQ3ODgxfQ.Xtp3xE_kWF1u59pcE_WpoCsO2-1iqTBq97LW1MG1veM";
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  const { roomId } = await res.json();
  return roomId;
};