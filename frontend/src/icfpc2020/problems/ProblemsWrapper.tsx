import React, {useCallback, useContext, useEffect, useState} from 'react';
import Problems, {Problem} from './Problems';
import {fecthProblems} from '../api';
import MessageContext from '../contexts/MessageContext';
import Pager from '../components/Pager';

interface State {
    problems: Problem[];
    page: number;
    loading: boolean;
}

const ProblemsWrapper = () => {
    const [state, setState] = useState<State>({
        problems: [],
        page: 1,
        loading: false
    });
    const { sendMessage } = useContext(MessageContext);
    const updateProblems = useCallback((page: number) => {
        fecthProblems(page).then((problems) => {
            setState((prevState) => ({
                ...prevState,
                problems,
                loading: false,
            }));
        }).catch((e) => {
            setState((prevState) => ({ ...prevState, loading: false }));
            sendMessage('error', 'Failed to load problems');
        });
    }, [sendMessage]);

    useEffect(() => {
        setState((prevState) => ({ ...prevState, loading: true }));
        updateProblems(state.page);
    }, [state.page, updateProblems]);

    const handleClick = (page: number) => {
        setState((prevState) => ({ ...prevState, page }));
    };

    return (
        <React.Fragment>
            <Problems problems={state.problems}/>
            <Pager page={state.page} min={1} max={8} range={5} onClick={handleClick} />
        </React.Fragment>
    );
};

export default ProblemsWrapper;
