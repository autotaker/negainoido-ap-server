import React from 'react';
import {MessageType} from '../components/MessageSnack';

interface MessageContextProps {
    sendMessage: (type: MessageType, text: string) => void;
}

export default React.createContext<MessageContextProps>({ sendMessage: () => {}});
