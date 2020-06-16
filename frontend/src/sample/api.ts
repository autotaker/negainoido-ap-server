import {Problem} from './Problems';

export const fecthProblems = (page: number) => {
    return fetch(process.env.REACT_APP_API_URL + "v1/icfpc2019/problems?page=" + page)
        .then((response) => response.json() as Promise<Problem[]>);
};

