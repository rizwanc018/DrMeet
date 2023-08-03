import { useState, useRef, useEffect } from 'react';


const Dietitian = () => {
    const [typing, setTyping] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([
        {
            message: "How can I help you today",
            sender: "ChatGPT",
        },
    ]);

    const chatMessagesRef = useRef(null);
    const scrollToLastMessage = () => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToLastMessage();
    }, [messages]);


    const API_KEY = import.meta.env.VITE_OPENAI_API_KEY
    const systemMessage = {
        "role": "system", "content": "Explain like dietition"
    }


    const handleSend = async () => {
        if (userInput.trim() === '') {
            return;
        }

        const newMessage = {
            message: userInput,
            sender: "user",
            direction: "outgoing",
        };

        const newMessages = [...messages, newMessage]
        setMessages(newMessages)
        setUserInput('')
        setTyping(true)

        // setTimeout(() => {
        //     const aiResponse = {
        //         message: "I understand. Let me fetch the information for you.",
        //         sender: "ChatGPT",
        //         direction: "incoming",
        //     };
        //     setMessages((prevMessages) => [...prevMessages, aiResponse]);
        //     setTyping(false);
        // }, 500);
        await processMessageToChatGPT(newMessages);
    }

    async function processMessageToChatGPT(chatMessages) {
        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageObject.message }
        })

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages
            ]
        }

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            });

            const data = await response.json();
            setMessages([...chatMessages, {
                message: data.choices[0].message.content,
                sender: "ChatGPT"
            }]);
            setTyping(false);
        } catch (error) {
            console.log(error)
        }
    }



    const handleChange = (e) => {
        setUserInput(e.target.value);
    };

    return (
        <div className="chat-card  mt-10 flex-grow  bg-white rounded-5 shadow-md overflow-hidden sm:w-full sm:max-w-lg">
            <div className="chat-header p-4 bg-primary flex items-center">
                <div className="text-base font-bold text-black">Diet Bot</div>
            </div>
            <div className='h-full flex flex-col justify-between'>
                <div className="chat-body flex-1 max-h-[calc(100%-80px)] overflow-y-scroll p-4" ref={chatMessagesRef} >
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.direction === 'outgoing' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`message max-w-[85%] mb-6 p-4 rounded-5 ${msg.direction === 'outgoing' ? 'bg-green-200' : 'bg-blue-200'
                                    } `}
                            >
                                <p className="text-base text-gray-700">{msg.message}</p>
                            </div>
                        </div>
                    ))}
                    {typing && (
                        <div className="message w-fit mb-2 p-4 rounded-5 bg-blue-200 text-left animate-pulse">
                            <p className="text-base text-gray-700">Typing...</p>
                        </div>
                    )}
                </div>
                <div className="chat-footer border p-4 bg-gray-200 flex flex-col sm:flex-row sticky bottom-0 left-0 w-full">
                    <input
                        className="flex-grow p-2 border-none rounded-3 mb-2 sm:mb-0 sm:mr-2"
                        type="text"
                        placeholder="Type your message"
                        value={userInput}
                        onChange={handleChange}
                    />
                    <button
                        className="p-2  rounded border-none bg-blue-500 text-white font-bold cursor-pointer transition duration-300 hover:bg-green-500"
                        onClick={handleSend}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dietitian;