'use client';
import { Suspense } from 'react';
import EventStreamWithForm from '../components/EventStreamWithForm';

// メッセージの入力と一覧を行うページコンポーネント
export default function Rooms() {
  return (
    <Suspense fallback="loading...">
      <EventStreamWithForm />
    </Suspense>
  );
}