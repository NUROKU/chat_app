import React, { useEffect, useState } from 'react';
import { events } from 'aws-amplify/data';
import { Amplify } from 'aws-amplify';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import config from './../../../amplify_outputs.json';
import { useAtom } from 'jotai';
import { userNameAtom, userRoomAtom } from '../globalStates/atoms';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { fetchAuthSession } from 'aws-amplify/auth';

Amplify.configure({
    "API": {
        "Events": {
            "endpoint": config.API.Events.endpoint,
            "region": config.API.Events.region,
            "defaultAuthMode": "apiKey",
            "apiKey": process.env.NEXT_PUBLIC_APPSYNC_API_KEY
        }
    }
});

type Message = {
    name: string;
    content: string;
};

type FormData = {
    content: string;
    name?: string;
    timestamp?: number;
};

const EventStreamWithForm: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [name] = useAtom(userNameAtom);
    const [room] = useAtom(userRoomAtom);
    let ignore = false;

    useEffect(() => {
        const connectToChannel = async () => {
            if (!ignore) {
                try {
                    const channel = await events.connect('/room/' + room);
                    channel.subscribe({
                        next: (data) => {
                            try {
                                console.log(data)
                                const { name, content } = JSON.parse(JSON.stringify(data));
                                setMessages((prevMessages) => [...prevMessages, { name, content }]);
                            } catch (error) {
                                console.error('JSONパースエラー:', error);
                            }
                        },
                        error: (err: Error) => {
                            console.error('error', err);
                        },
                    });
                } catch (error) {
                    console.error('接続エラー:', error);
                }
            }
        };

        connectToChannel();

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            ignore = true;
        };
    }, []);

    const handleFormSubmit = async (formData: FormData) => {
        const attributes = fetchAuthSession()
        const formDataWithTimestamp = {
            ...formData,
            name: name,
            room: room,
            token: (await attributes).tokens?.accessToken.toString(),
            timestamp: Date.now(),
        };

        try {
            const sqsClient = new SQSClient(
                {
                    credentials: {
                        accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID as string,
                        secretAccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY_SECRET as string,
                      },
                    region: config.API.Events.region });
            const messageBody = JSON.stringify(formDataWithTimestamp);
            const queueUrl = "https://sqs.ap-northeast-1.amazonaws.com/892188225325/JinroQueue.fifo";

            const command = new SendMessageCommand({
                QueueUrl: queueUrl,
                MessageBody: messageBody,
                MessageGroupId: room
            });

            await sqsClient.send(command);
        } catch (error) {
            console.error('SQS送信エラー:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <MessageForm onSubmit={handleFormSubmit} />
            <MessageList messages={messages} />
        </div>
    );
};

export default EventStreamWithForm;