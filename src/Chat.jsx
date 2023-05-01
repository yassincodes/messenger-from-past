import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { useLocation } from "react-router-dom";

import array5 from "./arrays/array5";
import array6 from "./arrays/array6";

const VITE_Open_AI_Key = import.meta.env.VITE_Open_AI_Key;

const combinedArray = [...array5, ...array6];


function getCharacterByUrl() {
    // Get the current location from React Router
    const location = useLocation();
  
    // Extract the route from the location pathname
    const route = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
  
    // Find the character object with the matching username
    const character = combinedArray.find((char) => char.username === route);
  
    return character;
  }

function Chat() {
  const character = getCharacterByUrl();

  const systemMessage = {
    role: "system",
    content: character.prompt,
  };

  const [messages, setMessages] = useState([
    {
      message: character.firstMessage,
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + VITE_Open_AI_Key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <MainContainer
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "right",
        borderRadius: "20px",
        marginTop: "10vh",
        marginRight: "4vh",
        marginLeft: "4vh",
      }}
      className="main-container"
    >
      <ChatContainer style={{ height: "80vh"}}>
        <MessageList
        direction="rtl"
          typingIndicator={
            isTyping ? (
              <TypingIndicator content={`${character.name} يقوم بالكتابة`}  />
            ) : null
          }
        >
          {messages.map((message, i) => {
            return <Message key={i} model={message} />;
          })}
        </MessageList>
        <MessageInput placeholder="أكتب سؤالك هنا" onSend={handleSend} />
      </ChatContainer>
    </MainContainer>
  );
}

export default Chat;
