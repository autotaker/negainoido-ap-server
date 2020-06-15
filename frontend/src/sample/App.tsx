import React, {useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import Problems, {Problem} from './Problems';
import {fecthProblems} from './api';

const ErrorContext = React.createContext({});

interface State {
    loading : boolean;
    page: number;
    problems: Problem[];
}

interface Error {
    type: string;
    message: string;
}

const App = () => {
    const [errors, setError] = useState<Error[]>([]);
    const [state, setState] = useState<State>({
        loading: false,
        page: 1,
        problems: [],
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
            setError((prevErrors) => prevErrors.concat([{
                type: 'error',
                message: 'failed to read problems',
            }]));
        });
    }, [state.page]);

    return (
        <Container>
            <Problems problems={state.problems}/>

            <ErrorContext.Provider value={{ errors, setError }}>
                <div></div>
            </ErrorContext.Provider>
        </Container>
    );
};

export default App;