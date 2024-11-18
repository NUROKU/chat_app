import { atom } from 'jotai';

//　グローバルな状態を管理するためのatomを定義
//  atomはjotaiの機能で、状態を管理するためのもの

// 状態：ユーザーID
export const userIdAtom = atom('');
// 状態：ユーザー名
export const userNameAtom = atom('');
// 状態：入村中の村
export const userRoomAtom = atom('');