import { useMemo, useState } from "react";
import { appConfig } from "../../config.browser";

const API_PATH = "/api/chat";

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
    chunk?: 83,
    context?: string[],
    isDeleted?: boolean,
    isTable?: boolean,
    nodeId?: string,
    objectId?: string,
    parent?: string,
    permissionId?: number,
    score?: number,
    tableId?: number
}

function streamAsyncIterator(stream: ReadableStream) {
    const reader = stream.getReader();
    return {
        next() {
            return reader.read();
        },
        return() {
            reader.releaseLock();
            return {
                value: {},
            };
        },
        [Symbol.asyncIterator]() {
            return this;
        },
    };
}

export function useChat() {
    const [currentChat, setCurrentChat] = useState<string | null>(null);
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [state, setState] = useState<"idle" | "waiting" | "loading">("idle");
    const [abortionStatus, setAbortionStatus] = useState<number>(0);

    const abortController = useMemo(() => new AbortController(), [abortionStatus]);

    function cancel() {
        setState("idle");
        abortController.abort("user cancelled");
    }

    function clear() {
        console.log("clear");
        setChatHistory([]);
    }

    const sendMessage = async (
        message: string,
        chatHistory: Array<ChatMessage>,
    ) => {
        setState("waiting");

        const newHistory = [
            ...chatHistory,
            {role: "user", content: message} as const,
        ];

        setChatHistory(newHistory);

        const body = JSON.stringify({
            messages: newHistory.slice(-appConfig.historyLength),
        });

        setState("loading");

        const res = await fetch(API_PATH, {
            body,
            method: "POST",
            signal: abortController.signal,
        });

        setCurrentChat("...");

        if (!res.ok || !res.body) {
            setState("idle");
            return;
        }

        const response = await res.json();

        let incomingMessages: ChatMessage[] = [];

        for (const message of response) {

            if (message?.role === "assistant") {
                continue;
            }

            incomingMessages.push({
                ...message, role: "assistant"
            } as const)

        }

        // I should just stop coding forever and start my own tomato farm
        // This is the shittiest thing i've ever done on react
        setTimeout(() => {
                setChatHistory((curr) => [
                    ...curr,
                    ...incomingMessages
                ]);
        }, 500);

        setCurrentChat(null);
        setState("idle");
    };

    return {sendMessage, currentChat, chatHistory, cancel, clear, state};
}
