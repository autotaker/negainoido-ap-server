import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';

export interface Problem {
    name: string;
    url: string;
    description: string;
}

interface Props {
    problems: Problem[];
}

const Problems = (props:Props) => {
    const { problems } = props;
    return (
        <List>
            {problems.map((problem, i) =>
                <ListItem button>
                    <Link href={problem.url}>{problem.name}</Link>: {problem.description}
                </ListItem>
            )}
        </List>
    );
};

export default Problems;