import { useRef, useState, useEffect } from 'react'
import Peer from 'simple-peer'
import socket from '../../config/socket.js'

// import io from 'socket.io-client'

// const socket = io.connect('http://localhost:5001')
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

    // socket.on("me", (id) => {
    //   console.log('me >> ', id)
    //   setMe(id)
    // })

    socket.emit("get-my-id", id => {
      console.log({ pat: id })
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
    console.log(id);
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
    // <>
    //   <h1 className="text-center text-white">Zoomish</h1>
    //   <div className="container grid grid-cols-2 gap-10 justify-center items-center mt-20 ml-10">
    //     <div className="video">
    //       {stream && <video playsInline muted ref={myVideo} autoPlay className="w-72" />}
    //     </div>
    //     <div className="video">
    //       {callAccepted && !callEnded ? (
    //         <video playsInline ref={userVideo} autoPlay className="w-72" />
    //       ) : null}
    //     </div>
    //   </div>
    //   <div className="myId mr-20 rounded-md bg-gradient-to-r from-gray-300 to-blue-300 p-8 grid justify-center items-center">


    //     <input
    //       id="filled-basic"
    //       placeholder="ID to call"
    //       value={idToCall}
    //       onChange={(e) => setIdToCall(e.target.value)}
    //     />
    //     <div className="call-button mt-8">
    //       {callAccepted && !callEnded ? (
    //         <button variant="contained" color="secondary" onClick={leaveCall}>
    //           End Call
    //         </button>
    //       ) : (
    //         <button color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
    //           <span className="text-lg" >phone icon</span>
    //         </button>
    //       )}
    //       {idToCall}
    //     </div>
    //   </div>
    //   <div>
    //     {receivingCall && !callAccepted ? (
    //       <div className="caller">
    //         <h1>{name} is calling...</h1>
    //         <button variant="contained" color="primary" onClick={answerCall}>
    //           Answer
    //         </button>
    //       </div>
    //     ) : null}
    //   </div>

    //   <div>VideoCall iam patient</div>
    // </>

    // <div className='relative min-h-screen bg-gray-100 flex flex-col items-center justify-center'>
    //   <div className="container grid grid-cols-2 gap-10 justify-center items-center mt-20 ml-10">
    //     <div className="video">
    //       {stream && <video playsInline muted ref={myVideo} autoPlay className="w-72" />}
    //     </div>
    //     <div className="video">
    //       {callAccepted && !callEnded ? (
    //         <video playsInline ref={userVideo} autoPlay className="w-72" />
    //       ) : null}
    //     </div>
    //   </div>
    //   <div className="myId p-2 grid justify-center items-center">
    //     <input
    //       id="filled-basic"
    //       placeholder="ID to call"
    //       value={idToCall}
    //       onChange={(e) => setIdToCall(e.target.value)}
    //     />
    //     <div className="call-button ">
    //       {callAccepted && !callEnded ? (
    //         <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-1 rounded" onClick={leaveCall}>
    //           End Call
    //         </button>
    //       ) : (
    //         <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-1 rounded" onClick={() => callUser(idToCall)}>
    //           <span className="text-lg">Call : </span>
    //         </button>
    //       )}
    //       {idToCall}
    //     </div>
    //   </div>
    //   <div>
    //     {receivingCall && !callAccepted ? (
    //       <div className="caller">
    //         <h1>{name} is calling...</h1>
    //         <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={answerCall}>
    //           Answer
    //         </button>
    //       </div>
    //     ) : null}
    //   </div>
    // </div>
<div className='relative min-h-screen bg-gray-100 flex flex-col items-center justify-center'>
  <div className="relative flex-1 w-full">
    <div className="video absolute bottom-4 right-4 w-48 h-36 bg-black z-10 border border-primary-600">
      {stream && <video playsInline muted ref={myVideo} autoPlay className="w-full h-full object-cover" />}
    </div>
    <div className="video absolute inset-0 bg-black">
      {callAccepted && !callEnded ? (
        <video playsInline ref={userVideo} autoPlay className="w-full h-full object-cover" />
      ) : null}
    </div>
  </div>
  <div className="relative mt-8">
    <input
      id="filled-basic"
      placeholder="ID to call"
      value={idToCall}
      onChange={(e) => setIdToCall(e.target.value)}
      className="p-2 rounded-md border border-gray-300"
    />
    <div className="mt-4">
      {callAccepted && !callEnded ? (
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={leaveCall}>
          End Call
        </button>
      ) : (
        <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded" onClick={() => callUser(idToCall)}>
          <span className="text-lg">Call : {idToCall}</span>
        </button>
      )}
      
    </div>
  </div>
  <div className="absolute bottom-20">
    {receivingCall && !callAccepted ? (
      <div className="flex justify-center items-center">
        <h1>{name} is calling...</h1>
        <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded" onClick={answerCall}>
          Answer
        </button>
      </div>
    ) : null}
  </div>
</div>



  )
}

export default VideoCall