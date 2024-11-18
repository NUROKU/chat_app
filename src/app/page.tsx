'use client';
import { Suspense } from 'react';
import { Amplify } from 'aws-amplify'
import { withAuthenticator } from "@aws-amplify/ui-react";
import VillageEntryForm from './components/VillageEntryForm';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: '51qg1gokjnk3bpoacd5mpisi3i',
      userPoolId: 'ap-northeast-1_BIkYArPmA',
    }
  }
})

function Home() {
  return (
    <>
      <Suspense fallback="loading...">
        <VillageEntryForm />
      </Suspense>
    </>
  );
}

export default withAuthenticator(Home, {  
  signUpAttributes: ['email'], 
  loginMechanisms: ['username'], // ログイン時にユーザー名を使用する設定
})