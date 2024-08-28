import {
    FunctionComponent,
    DetailedHTMLProps,
    TableHTMLAttributes,
} from "react";
import ReactMarkdown from "react-markdown";
import { ReactMarkdownProps } from "react-markdown/lib/complex-types";
import remarkGfm from "remark-gfm";

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

interface Props {
    message: ChatMessage;
}

// This lets us style any markdown tables that are rendered
const CustomTable: FunctionComponent<
    Omit<
        DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>,
        "ref"
    > &
    ReactMarkdownProps
> = ({children, ...props}) => {
    return (
        <div className="overflow-x-auto">
            <table {...props} className="w-full text-left border-collapse table-auto">
                {children}
            </table>
        </div>
    );
};

export const ChatMessage: React.FC<React.PropsWithChildren<Props>> = ({
                                                                          message,
                                                                      }) => {

    if (message.role === 'user')
        return (<div className="flex items-end justify-end">
            <div className="bg-gray-300 border-gray-100 border-2 rounded-lg p-2 max-w-lg px-[18px]">
                <p>{message.content}</p>
            </div>
        </div>);

    const file = message.parent ?? '';
    const score = message.score ?? 0;

    return (
        <div className="flex items-end">
            <div className="bg-gray-100 border-gray-300 border-2 rounded-lg p-2 mr-20 w-full px-[18px]">
                <ReactMarkdown
                    children={message.content}
                    remarkPlugins={[remarkGfm]}
                    components={{
                        table: CustomTable,
                    }}
                />
                <div
                    className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-300 to-transparent opacity-45 dark:via-neutral-400"></div>
                <div className="flex justify-between items-center">
                    <div className="overflow-ellipsis text-blue-700 underline flex items-center gap-2">
                        <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H12M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V11M9 17H11M9 13H13M9 9H10M19.2686 19.2686L21 21M20 17.5C20 18.8807 18.8807 20 17.5 20C16.1193 20 15 18.8807 15 17.5C15 16.1193 16.1193 15 17.5 15C18.8807 15 20 16.1193 20 17.5Z"
                                stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {file}
                    </div>
                    <div className="font-bold">
                        Relevance: {score.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
}
