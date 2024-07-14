import { Configurations, CredentialProvider, TopicClient } from "@gomomento/sdk-web";
import { useEffect, useRef, useState } from "react";

export function Publisher() {
    const token = import.meta.env.VITE_MOMENTO_API_KEY;
    const cacheName = import.meta.env.VITE_MOMENTO_CACHE_NAME;
    const topicName = import.meta.env.VITE_MOMENTO_TOPIC_NAME;

    const [inputValue, setInputValue] = useState("");
    const [topicClient, setTopicClient] = useState<TopicClient | null>(null);
    const topicClientRef = useRef(topicClient);

    useEffect(() => {
        async function initializeTopicClient() {
            const client = new TopicClient({
                configuration: Configurations.Browser.v1(),
                credentialProvider: CredentialProvider.fromString({ authToken: token }),
            });

            setTopicClient(client);
            topicClientRef.current = client;
        }

        if (!topicClient) {
            initializeTopicClient();
        }
    }, [token, topicClient]);

    // SEND ボタンクリック処理
    const sendMessage = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        if (inputValue) {
            topicClient?.publish(cacheName, topicName, inputValue);
            setInputValue("");
        }
    };

    return (
        <div className="container mx-auto max-w-2xl px-4">
            <div className="w-full">
                <div className="chat chat-start pb-4">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img alt="codemountains avatar" src="/squirrel.svg" />
                        </div>
                    </div>
                    <div className="chat-bubble">Momento Topics を試そう！</div>
                </div>
                <textarea
                    className="w-full textarea textarea-bordered textarea-lg"
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    placeholder="メッセージを入力してください"
                ></textarea>
            </div>
            <div className="w-full px-4 my-2 flex justify-center ">
                <button className="btn btn-primary btn-wide" onClick={sendMessage}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                    >
                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                    </svg>
                    送信する
                </button>
            </div>
        </div>
    );
}
