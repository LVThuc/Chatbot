import './NewPrompt.css'
import { useRef, useEffect, useState } from 'react'
import Upload from '../upload/Upload'
import { IKImage } from 'imagekitio-react'
import model from "../../lib/gemini"
import Markdown from "react-markdown"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from "@clerk/clerk-react";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
const NewPrompt = ({ data }) => {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "abc" }],
      },
      {
        role: "model",
        parts: [{ text: "abc" }],
      },
    ],
    generationConfig: {
      // maxOutputTokens: 1000,
    },
  })
  const endRef = useRef(null);
  const formRef = useRef(null);
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data, question, answer, img.dbData]);


  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ question, answer, img }) => {
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ question, answer, img }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', data._id] }).then(() => {
        formRef.current.reset();

        setQuestion("");
        setAnswer("");
        setImg({ isLoading: false, error: "", dbData: {}, aiData: {} });
      });
    },
    onError: (error) => {
      console.error("Error updating chat:", error);
    }
  });

  const add = async (text , isInitial) => {
    if(!isInitial) setQuestion(text);
    try {
      // Get the real chat history for Gemini context
      const token = await getToken();
      const updatedChat = await fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        credentials: 'include',
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => res.json());

      const safeHistory = (updatedChat?.history || []).map(msg => ({
        role: msg.role,
        parts: msg.parts.map(part => ({ text: part.text }))
      }));

      const chat = model.startChat({ history: safeHistory });
      let accumulatedText = "";
      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, text] : [text],
      );
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        accumulatedText += chunkText;
        setAnswer(accumulatedText);
      }
      // Save both user and AI message in one PUT
      mutation.mutate({ question: text, answer: accumulatedText, img: img.dbData.filePath || undefined });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const text = e.target.text.value;
    if (!text) return;

    add(text, false)


  }
  const hasRun = useRef(false);

  // useEffect(() => {
  //   if(!hasRun.current)
  //   {
  //     if(data?.history?.length === 1) {
  //       add(data?.history[0]?.parts[0]?.text, true);
  //     }
  //   }
  //   hasRun.current = true;
  // },[])

  return (
    <>
      {/* ADD NEW CHAT */}
      {img.isLoading && <div className=''>Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
      )}
      {
        question && <div className='message user'>
          {question}
        </div>
      }
      {
        answer && <div className='message'>
          <Markdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {answer}
          </Markdown>
        </div>
      }
      <div className="endChat" ref={endRef}></div>
      <form className='newForm' onSubmit={handleSubmit} ref ={formRef}>
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" name="text" placeholder='Ask anything...' />
        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  )
}

export default NewPrompt