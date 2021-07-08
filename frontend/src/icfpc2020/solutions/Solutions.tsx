import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export interface Solution {
    id: string;
    taskId: string;
    solver: string;
    score: number;
}

interface Props {
    solutions: Solution[];
}

const Solutions = (props:Props) => {
    const { solutions } = props;
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Task ID</TableCell>
                        <TableCell>Solution ID</TableCell>
                        <TableCell>Solver</TableCell>
                        <TableCell>Score</TableCell>
                        <TableCell>Download Solution</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {solutions.map((solution, i) =>
                        <TableRow key={i}>
                            <TableCell>{solution.id}</TableCell>
                            <TableCell>{solution.taskId}</TableCell>
                            <TableCell>{solution.solver}</TableCell>
                            <TableCell>{solution.score}</TableCell>
                            <TableCell> - </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Solutions;