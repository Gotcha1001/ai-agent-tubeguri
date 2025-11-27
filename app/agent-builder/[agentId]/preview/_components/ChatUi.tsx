// import { Button } from "@/components/ui/button";
// import { Agent } from "@/types/AgentType";
// import { RefreshCcwIcon, Send } from "lucide-react";
// import React, { useState } from "react";

// type Props = {
//   GenerateAgentToolConfig: () => void;
//   loading: boolean;
//   agentDetail: Agent;
// };

// function ChatUi({ GenerateAgentToolConfig, loading, agentDetail }: Props) {
//   return (
//     <div>
//       <div className="flex justify-between items-center border-b p-4">
//         <h2>{agentDetail.name}</h2>
//         <Button onClick={GenerateAgentToolConfig} disabled={loading}>
//           <RefreshCcwIcon className={`${loading && "animate-spin"}`} /> Refresh
//         </Button>
//       </div>
//       <div className="w-full h-[90vh] p-4 flex flex-col">
//         {/* message section */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
//           {/* Hardcoded messages */}
//           <div className="flex justify-start">
//             <div className="p-2 rounded-lg max-w-[80%] bg-gray-300">
//               <h2 className="text-sm">Welcome! This is a demo chat...</h2>
//             </div>
//           </div>
//           <div className="flex justify-end">
//             <div className="p-2 rounded-lg max-w-[80%] bg-gray-300">
//               <h2 className="text-sm">Sure! I suggest a modern dashboard</h2>
//             </div>
//           </div>
//           <div className="flex justify-end">
//             <div className="p-2 rounded-lg max-w-[80%] bg-gray-100">
//               <h2 className="text-sm">Great! Can we add dark mode?</h2>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* footer */}
//       <div className="p-1 mt-3 border-t flex items-center gap-2">
//         <textarea
//           placeholder="Type your message here..."
//           className="flex-1 resize-none border rounded-lg px-3 py-2"
//         />
//         <Button>
//           <Send />
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default ChatUi;

// import { Button } from "@/components/ui/button";
// import { RefreshCw, Send, User, Bot } from "lucide-react";
// import React, { useState } from "react";

// // Mock types for demo
// type Agent = {
//   name: string;
// };

// type Props = {
//   GenerateAgentToolConfig: () => void;
//   loading: boolean;
//   agentDetail: Agent;
//   conversationId: string | null;
// };

// function ChatUi({
//   GenerateAgentToolConfig,
//   loading,
//   agentDetail,
//   conversationId,
// }: Props) {
//   const [message, setMessage] = useState("");

//   const [userInput, setUserInput] = useState<string>("");

//   const handleSend = () => {
//     if (message.trim()) {
//       // Handle send logic here
//       setMessage("");
//     }
//   };

//   const OnSendMsg = async () => {
//     const res = await fetch("/api/agent-chat", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         agentName: agentDetail?.name,
//         agents: agentDetail?.config.agents || [],
//         tools: agentDetail?.config?.tools || [],
//         input: userInput,
//         conversationId: conversationId,
//       }),
//     });
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-50">
//       {/* Header */}
//       <div className="flex justify-between items-center border-b bg-white p-4 shadow-sm">
//         <div className="flex items-center gap-3">
//           <div>
//             <h2 className="font-semibold text-lg">{agentDetail.name}</h2>
//             <p className="text-xs text-gray-500">AI Assistant</p>
//           </div>
//         </div>
//         <Button
//           onClick={GenerateAgentToolConfig}
//           disabled={loading}
//           variant="outline"
//           size="sm"
//         >
//           <RefreshCw className={`w-4 h-4 mr-2 ${loading && "animate-spin"}`} />
//           Refresh
//         </Button>
//       </div>

//       {/* Messages Container */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {/* Agent Message */}
//         <div className="flex justify-start gap-3">
//           <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
//             <Bot className="w-4 h-4 text-blue-600" />
//           </div>
//           <div className="flex flex-col max-w-[70%]">
//             <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm p-3 shadow-sm">
//               <p className="text-sm text-gray-800">
//                 Welcome! This is a demo chat. How can I assist you today?
//               </p>
//             </div>
//             <span className="text-xs text-gray-400 mt-1 ml-2">10:30 AM</span>
//           </div>
//         </div>

//         {/* User Message */}
//         <div className="flex justify-end gap-3">
//           <div className="flex flex-col max-w-[70%] items-end">
//             <div className="bg-blue-600 rounded-2xl rounded-tr-sm p-3 shadow-sm">
//               <p className="text-sm text-white">
//                 Can you help me design a modern dashboard?
//               </p>
//             </div>
//             <span className="text-xs text-gray-400 mt-1 mr-2">10:31 AM</span>
//           </div>
//           <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
//             <User className="w-4 h-4 text-gray-600" />
//           </div>
//         </div>

//         {/* Agent Message */}
//         <div className="flex justify-start gap-3">
//           <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
//             <Bot className="w-4 h-4 text-blue-600" />
//           </div>
//           <div className="flex flex-col max-w-[70%]">
//             <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm p-3 shadow-sm">
//               <p className="text-sm text-gray-800">
//                 Sure! I suggest a modern dashboard with clean cards, data
//                 visualization, and intuitive navigation. Would you like me to
//                 create a prototype?
//               </p>
//             </div>
//             <span className="text-xs text-gray-400 mt-1 ml-2">10:31 AM</span>
//           </div>
//         </div>

//         {/* User Message */}
//         <div className="flex justify-end gap-3">
//           <div className="flex flex-col max-w-[70%] items-end">
//             <div className="bg-blue-600 rounded-2xl rounded-tr-sm p-3 shadow-sm">
//               <p className="text-sm text-white">
//                 Great! Can we add dark mode support?
//               </p>
//             </div>
//             <span className="text-xs text-gray-400 mt-1 mr-2">10:32 AM</span>
//           </div>
//           <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
//             <User className="w-4 h-4 text-gray-600" />
//           </div>
//         </div>
//       </div>

//       {/* Input Footer */}
//       <div className="border-t bg-white p-4 shadow-lg">
//         <div className="flex items-end gap-2 max-w-4xl mx-auto">
//           <textarea
//             value={message}
//             onChange={(e) => setUserInput(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSend();
//               }
//             }}
//             placeholder="Type your message here..."
//             className="flex-1 resize-none border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-32 min-h-[44px]"
//             rows={1}
//           />
//           <Button
//             onClick={OnSendMsg}
//             disabled={!message.trim()}
//             className="h-11 px-4"
//           >
//             <Send className="w-4 h-4" />
//           </Button>
//         </div>
//         <p className="text-xs text-gray-400 text-center mt-2">
//           Press Enter to send, Shift+Enter for new line
//         </p>
//       </div>
//     </div>
//   );
// }

// export default ChatUi;
import { Button } from "@/components/ui/button";
import { RefreshCw, Send, User, Bot, Loader2Icon } from "lucide-react";
import React, { useState } from "react";
import Markdown from "react-markdown";
// import remarkGfm from "remark-gfm";

// Mock types for demo
type Agent = {
  name: string;
  agentToolConfig?: {
    parsedJson?: {
      agents?: any[];
      tools?: any[];
    };
  };
};

type Props = {
  GenerateAgentToolConfig: () => void;
  loading: boolean;
  agentDetail: Agent;
  conversationId: string | null;
};

function ChatUi({
  GenerateAgentToolConfig,
  loading,
  agentDetail,
  conversationId,
}: Props) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [userInput, setUserInput] = useState<string>("");
  const [loadingMsg, setLoadingMsg] = useState(false);

  const OnSendMsg = async () => {
    setLoadingMsg(true);

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);
    const currentInput = userInput;
    setUserInput("");

    const res = await fetch("/api/agent-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agentName: agentDetail?.name,
        agents: agentDetail?.agentToolConfig?.parsedJson?.agents || [],
        tools: agentDetail?.agentToolConfig?.parsedJson?.tools || [],
        input: currentInput, //userInput/currentInput
        conversationId: conversationId,
      }),
    });

    if (!res.body) return;
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let done = false;

    // Add empty assistant message that we'll update
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      if (value) {
        const chunk = decoder.decode(value);
        console.log("VALUE:", chunk);

        setMessages((prev) => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;
          updated[lastIndex] = {
            role: "assistant",
            content: (updated[lastIndex]?.content || "") + chunk,
          };
          return updated;
        });
      }
    }
    setLoadingMsg(false);
  };

  const handleSend = () => {
    if (userInput.trim()) {
      OnSendMsg();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center border-b bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="font-semibold text-lg">{agentDetail.name}</h2>
            <p className="text-xs text-gray-500">AI Assistant</p>
          </div>
        </div>
        <Button
          onClick={GenerateAgentToolConfig}
          disabled={loading}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading && "animate-spin"}`} />
          Refresh
        </Button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Initial welcome message */}
        {messages.length === 0 && (
          <div className="flex justify-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex flex-col max-w-[70%]">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm p-3 shadow-sm">
                <p className="text-sm text-gray-800">
                  Welcome! How can I assist you today?
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic messages */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
            )}

            <div
              className={`flex flex-col max-w-[70%] ${
                msg.role === "user" ? "items-end" : ""
              }`}
            >
              <div
                className={`rounded-2xl p-3 shadow-sm ${
                  msg.role === "user"
                    ? "bg-radial from-purple-500 to-indigo-900 rounded-tr-sm"
                    : "bg-white border border-gray-200 rounded-tl-sm"
                }`}
              >
                <div
                  className={`text-sm prose prose-sm max-w-none ${
                    msg.role === "user"
                      ? "text-white prose-invert"
                      : "text-gray-800"
                  }`}
                >
                  <Markdown>{msg.content}</Markdown>
                </div>
              </div>
            </div>

            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Footer */}
      <div className="border-t bg-white p-4 shadow-lg">
        <div className="flex items-end gap-2 max-w-4xl mx-auto">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your message here..."
            className="flex-1 resize-none border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-32 min-h-[44px]"
            rows={1}
          />
          <Button
            onClick={handleSend}
            disabled={loadingMsg || !userInput.trim()}
            className="h-11 px-4"
          >
            {loadingMsg ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-gray-400 text-center mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}

export default ChatUi;
