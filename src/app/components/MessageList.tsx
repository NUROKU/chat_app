import React from 'react';

type Message = {
  name: string;
  content: string;
};

type MessageListProps = {
  messages: Message[];
};

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-8">
      <h1 className="text-2xl font-bold mb-4">サブスクライブしたメッセージ一覧</h1>
      <ul>
        {[...messages].reverse().map((msg, index) => (
          <li key={index} className="border-b last:border-none py-2">
            <strong>{msg.name}:</strong> {msg.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;