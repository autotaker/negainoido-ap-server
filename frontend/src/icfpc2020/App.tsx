import React, {useCallback, useState} from 'react';
import Container from '@material-ui/core/Container';
import MessageSnack, {MessageType} from './components/MessageSnack';
import {Switch, Route, Redirect} from 'react-router-dom'
import ProblemsWrapper from './problems/ProblemsWrapper';
import MessageContext from './contexts/MessageContext';
import { useRouteMatch } from 'react-router';
import NavBar from './components/NavBar';
import SolutionWrapper from './solutions/SolutionsWrapper';

interface State {
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

const pages = [
    {label: 'Problems', path: '/'},
    {label: 'Solutions', path: '/solutions'},
];

const App = () => {
    const [state, setState] = useState<State>({
        messages: [],
        messageCount: 0,
    });

    const sendMessage = useCallback((type: MessageType, text: string) =>
        setState((prevState) => addMessage(prevState, type, text)),
        [setState]);
    const messageContext = { sendMessage };
    const { path } = useRouteMatch();

    return (
        <Container>
            <MessageContext.Provider value={messageContext}>
                <NavBar pages={pages}/>
                <Switch>
                    <Route exact path={`${path}/solutions`} component={SolutionWrapper}/>
                    <Route exact path={`${path}/`} component={ProblemsWrapper}/>
                    <Redirect to={`${path}/`}/>
                </Switch>
            </MessageContext.Provider>

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