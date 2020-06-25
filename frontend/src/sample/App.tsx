import React, {useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import Problems, {Problem} from './Problems';
import {fecthProblems} from './api';
import MessageSnack, {MessageType} from './MessageSnack';

const ErrorContext = React.createContext({});

interface State {
    loading : boolean;
    page: number;
    problems: Problem[];
    messages: Message[];
    messageCount: number;
}

interface Message {
    id: number;
    type: MessageType;
    text: string;
}

const addMessage = (prevState: State, type: MessageType, text: string) => {
    const messages = prevState.messages.concat({
        id: prevState.messageCount + 1,
        type,
        text,
    });

    return {
        ...prevState,
        messages,
        messageCount: prevState.messageCount + 1
    };
};

const clearMessage = (prevState: State, id: number) => {
    const messages = prevState.messages.filter((message) => message.id !== id);
    return {
        ...prevState,
        messages,
    };
};

const App = () => {
    const [state, setState] = useState<State>({
        loading: false,
        page: 1,
        problems: [],
        messages: [],
        messageCount: 0,
    });

    useEffect(() => {
        setState((prevState) => ({ ...prevState, loading: true }));
        fecthProblems(state.page).then((problems: Problem[]) => {
            setState((prevState) => ({
                ...prevState,
                loading: false,
                problems,
            }));
        }).catch((e) => {
            console.log(e);
            setState((prevState) => addMessage(prevState, 'error', 'failed to read problems'));
        });
    }, [state.page]);

    return (
        <Container>
            <Problems problems={state.problems}/>

            {state.messages.map((message) => {
                const handleClose = () => setState((prevState) => clearMessage(prevState, message.id));
                return (
                    <MessageSnack key={message.id} {...message} onClose={handleClose}/>
                );
            })}
        </Container>
    );
};

export default App;