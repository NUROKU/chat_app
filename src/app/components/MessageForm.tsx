import React, { useState } from 'react';

type FormData = {
  content: string;
};

type MessageFormProps = {
  onSubmit: (formData: FormData) => void;
};

const MessageForm: React.FC<MessageFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    content: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ content: ''});
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 space-y-3">
      <h2 className="text-xl font-semibold mb-3">メッセージを送信する</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <input
            type="text"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-700"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          送信
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
