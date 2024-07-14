import { Configurations, CredentialProvider, TopicClient } from "@gomomento/sdk-web";
import { useCallback, useEffect, useState } from "react";

export function Subscriber() {
    const token = import.meta.env.VITE_MOMENTO_API_KEY;
    const cacheName = import.meta.env.VITE_MOMENTO_CACHE_NAME;
    const topicName = import.meta.env.VITE_MOMENTO_TOPIC_NAME;

    const [messages, setMessages] = useState<string[]>([]);

    const saveMessage = useCallback((message: string) => {
        setMessages((prevMessages) => [message, ...prevMessages]);
    }, []);

    useEffect(() => {
        async function initializeTopicClient() {
            const topicClient = new TopicClient({
                configuration: Configurations.Browser.v1(),
                credentialProvider: CredentialProvider.fromString({ authToken: token }),
            });

            await topicClient.subscribe(cacheName, topicName, {
                onItem: (data) => {
                    saveMessage(data.valueString());
                },
                onError: (err) => console.log(err),
            });
        }

        initializeTopicClient();
    }, [token, cacheName, topicName, saveMessage]);

    return (
        <div className="container mx-auto max-w-2xl px-4">
            <div className="w-full flex justify-center items-center px-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                >
                    <path
                        fillRule="evenodd"
                        d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 0 0 1.28.53l4.184-4.183a.39.39 0 0 1 .266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0 0 12 2.25ZM8.25 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm2.625 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                        clipRule="evenodd"
                    />
                </svg>
                <h2 className="p-2">受信メッセージ</h2>
            </div>
            {messages.map((msg, index) => (
                <div className="chat chat-start pb-2" key={index}>
                    <div className="w-full mx-auto chat-bubble chat-bubble-success">{msg}</div>
                </div>
            ))}
        </div>
    );
}
