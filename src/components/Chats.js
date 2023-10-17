import React, { useState } from "react";
import OpenAI from "openai";
import chat from "../assets/chat.png";
import ChatGPT_logo from "../assets/chat1.png";
import arrow from "../assets/arrow.jpg";

const Chats = () => {
  const [question, setQuestion] = useState("");
  const [chats, setChats] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const API_KEY = "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";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question !== "") {
      setQuestion("Typing....");
      setDisabled(true);
      const openai = new OpenAI({
        apiKey: API_KEY,
        dangerouslyAllowBrowser: true,
      });
      openai.chat.completions
        .create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: question }],
          max_tokens: 2048,
          temperature: 1,
        })
        .then((res) => {
          let data = {
            msg: res.choices[0].message.content,
            role: "chatgpt",
          };
          let usermsg = {
            msg: question,
            role: "user",
          };
          let newdata = [...chats, usermsg, data];

          setChats(newdata);
          setDisabled(false);
          setQuestion("");
        })
        .catch((err) => {
          setDisabled(false);
          setQuestion("");
        });
    }
  };

  return (
    <div className="font-custom_Nunito flex">
      <div className="flex flex-col items-center justify-center  bg-slate-600 ">
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-evenly leading-normal">
          <div className="mb-8 mt-2">
            <div className="text-gray-900 font-bold text-3xl mb-4 pb-6 text-center">
              ChatAI
            </div>
            {/* <p className="text-gray-700 text-sm">
              This chatbot is designed to provide users with accurate and
              comprehensive information about anything

            </p> */}
          </div>

          {chats?.map((item, index) => {
            if (item.role === "user") {
              return (
                <div key={index} className="mt-2 flex flex-row ">
                  {/* <img
                    className="w-2 h-2 rounded-full mr-4"
                    src={chat}
                    alt="Avatar of Jonathan Reinink"
                  /> */}

                  <p className="px-2 py-1 border shadow-md rounded-md">
                    {item.msg}
                  </p>
                </div>
              );
            } else if (item.role === "chatgpt") {
              return (
                <div
                  key={index}
                  className="m-3 flex justify-start flex-row-reverse"
                >
                  {/* <img
                    className="w-8 h-8 rounded-full ml-2"
                    src={ChatGPT_logo}
                    alt="Avatar of Jonathan Reinink"
                  /> */}

                  <p className="px-2 py-1 border shadow-md rounded-md">
                    {item.msg}
                  </p>
                </div>
              );
            } else {
              return null;
            }
          })}

          <div className="flex flex-row border rounded overflow-hidden items-center m-3">
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
                required
                disabled={disabled}
                className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="ask me anything...."
                style={{ width: "100%" }} // Set the width to 100%
              />

              <button type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
