import chatpic from "../assets/chatpic.jpg";
import ChatGPT_logo from "../assets/ChatGPT_logo.webp";
import chat from "../assets/chat.png";
import arrow from "../assets/arrow.jpg";
import { useState } from "react";
import OpenAI from "openai";

const Chats = () => {
  const [question, setQuestion] = useState("");
  const [chats, setChats] = useState([]);
  const [disabled, setDisabled] = useState(false);

  var HandleSubmit = (e) => {
    e.preventDefault();
    if (question !== "") {
      setQuestion("Generating Response....");
      setDisabled(true);
      const openai = new OpenAI({
        apiKey: "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",
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
    <div className="font-custom_Nunito">
      <div className="flex flex-col items-center justify-center mt-12 h-96">
        <div
          className="flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{
            backgroundImage: `url(${chatpic})`,
            height: "100%",
            width: "100%",
          }}
          title="Woman holding a mug"
        ></div>
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-evenly leading-normal">
          <div className="mb-8 mt-2">
            <p className="text-sm text-gray-600 flex items-center">
              <svg
                className="fill-current text-gray-500 w-3 h-3 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
              </svg>
              Members only
            </p>
            <div className="text-gray-900 font-bold text-xl mb-1">
              How can we help you today?
            </div>
            {/* <p className="text-gray-700">
              ChatGPT, which stands for Chat Generative Pre-trained Transformer,
              is a large language model-based chatbot developed by OpenAI and
              launched on November 30, 2022, notable for enabling users to
              refine and steer a conversation towards a desired length, format,
              style, level of detail, and language used
            </p> */}
          </div>

          {chats?.map((item, index) => {
            if (item.role === "user") {
              return (
                <div key={index} className="mt-2 flex flex-row">
                  {/* <img
                    className="w-8 h-8 rounded-full mr-4"
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

          <div className="flex items-center">
           
    
          </div>

          <div className="flex flex-row border rounded overflow-hidden items-center m-3">
            <form onSubmit={(e) => HandleSubmit(e)}>
              <input
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
                required
                disabled={disabled}
                className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="ask me anything..."
              />

              <button type="submit">
                <img
                  className="w-5 h-5 m-2 hover:shadow-lg hover:rotate-45 transform hover:scale-90"
                  src={arrow}
                  alt="sent"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
