import { useRef, useState, useEffect } from 'react'
import Peer from 'simple-peer'
import io from 'socket.io-client'



const socket = io.connect('http://localhost:5001')
const VideoCall = ({ patientId }) => {

  const [me, setMe] = useState("")
  const [stream, setStream] = useState()
  const [receivingCall, setReceivingCall] = useState(false)
  const [caller, setCaller] = useState("")
  const [callerSignal, setCallerSignal] = useState()
  const [callAccepted, setCallAccepted] = useState(false)
  const [idToCall, setIdToCall] = useState("")
  const [callEnded, setCallEnded] = useState(false)
  const [name, setName] = useState("")
  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream)
      if (myVideo.current) myVideo.current.srcObject = stream
    })

    socket.on("me", (id) => {
      console.log('Id >> ', id)
      setMe(id)
    })

    socket.on("callUser", (data) => {
      setReceivingCall(true)
      setCaller(data.from)
      setName(data.name)
      setCallerSignal(data.signal)
    })
  }, [])

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream
    })
    peer.on("signal", (data) => {
      console.log(data);
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name
      })
    })
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream
    })
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true)
      peer.signal(signal)
    })

    connectionRef.current = peer
  }

  const answerCall = () => {
    setCallAccepted(true)
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream
    })
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller })
    })
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream
    })

    peer.signal(callerSignal)
    connectionRef.current = peer
  }

  const leaveCall = () => {
    setCallEnded(true)
    connectionRef.current.destroy()
  }

  return (
    <>
  <h1 className="text-center text-white">Zoomish</h1>
  <div className="container grid grid-cols-2 gap-10 justify-center items-center mt-20 ml-10">
    <div className="video">
      {stream && <video playsInline muted ref={myVideo} autoPlay className="w-72" />}
    </div>
    <div className="video">
      {callAccepted && !callEnded ? (
        <video playsInline ref={userVideo} autoPlay className="w-72" />
      ) : null}
    </div>
  </div>
  <div className="myId mr-20 rounded-md bg-gradient-to-r from-gray-300 to-blue-300 p-8 grid justify-center items-center">
    {/* <TextField
      id="filled-basic"
      label="Name"
      variant="filled"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="mb-8"
    /> */}
    {/* <CopyToClipboard text={me} className="mb-10">
      <Button variant="contained" color="primary" startIcon={<AssignmentIcon className="text-lg" />}>
        Copy ID
      </Button>
    </CopyToClipboard> */}

    {/* <TextField
      id="filled-basic"
      label="ID to call"
      variant="filled"
      value={idToCall}
      onChange={(e) => setIdToCall(e.target.value)}
    /> */}
    <div className="call-button mt-8">
      {callAccepted && !callEnded ? (
        <button variant="contained" color="secondary" onClick={leaveCall}>
          End Call
        </button>
      ) : (
        <button color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
          <span className="text-lg" >phone icon</span>
        </button>
      )}
      {idToCall}
    </div>
  </div>
  <div>
    {receivingCall && !callAccepted ? (
      <div className="caller">
        <h1>{name} is calling...</h1>
        <button variant="contained" color="primary" onClick={answerCall}>
          Answer
        </button>
      </div>
    ) : null}
  </div>
</>

  )
}

export default VideoCall