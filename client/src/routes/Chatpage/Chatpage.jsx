import NewPrompt from '../../components/NewPrompt/NewPrompt';
import './Chatpage.css';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from "@clerk/clerk-react";
import { useLocation } from 'react-router-dom';
import { IKImage } from "imagekitio-react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Markdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';

const mathJaxConfig = {
  loader: { load: ["[tex]/require"] },
  tex: {
    packages: { "[+]": ["require"] },
    inlineMath: [["$", "$"], ["\\(", "\\)"]],
    displayMath: [["$$", "$$"], ["\\[", "\\]"]],
  },
};

const Chatpage = () => {
  const path = useLocation().pathname;
  const chatId = path.split('/').pop();
  const { getToken } = useAuth();

  const { isPending, error, data } = useQuery({
    queryKey: ['chat', chatId],
    queryFn: async () => {
      const token = await getToken();
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
    },
  });

  return (
    <MathJaxContext version={3} config={mathJaxConfig}>
      <div className='Chatpage'>
        <div className="wrapper">
          <div className="chat">
            {isPending ? "loading..." : error ? "error" : data?.history?.map((message, i) => (
              <>
                {message.img && (
                  <IKImage
                    urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                    path={message.img}
                    height="300"
                    width="400"
                    transformation={[{ height: 300, width: 400, crop: "at_max" }]}
                    loading="lazy"
                    lqip={{ active: true, quality: 20 }}
                  />
                )}
                <div
                  className={
                    message.role === "user" ? "message user" : "message"
                  }
                  key={i}
                >
                  <Markdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeMathjax]}
                  >
                    {message.parts[0].text}
                  </Markdown>
                </div>
              </>
            ))}
            {data && <NewPrompt data={data} />}
          </div>
        </div>
      </div>
    </MathJaxContext>
  );
};

export default Chatpage;
