'use client';

import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { userNameAtom, userRoomAtom } from '../globalStates/atoms';

function VillageEntryForm() {
  const [name, setName] = useAtom(userNameAtom);
  const [room, setRoom] = useAtom(userRoomAtom);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!name || !room) {
      setError('名前と部屋を入力してください。');
    } else {
      setError('');
      router.push("/rooms");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            名前:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            入りたい部屋:
          </label>
          <select
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">部屋を選択してください</option>
            <option value="Room1">Room1</option>
            <option value="Room2">Room2</option>
            <option value="Room3">Room3</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          入村
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default VillageEntryForm