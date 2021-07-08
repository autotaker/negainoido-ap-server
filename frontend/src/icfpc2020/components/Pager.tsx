import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

interface Props {
    page: number;
    min: number;
    max: number;
    range: number;
    onClick: (page: number) => void;
}

const Pager = (props: Props) => {
    const { page, min, max, range, onClick } = props;
    const begin = Math.max(Math.min(page - Math.floor(range/2), max - range + 1), min);
    const end = Math.min(begin + range, max + 1);
    const pages = Array(end - begin).fill(0).map((_, i) => begin + i);

    return (
        <ButtonGroup>
            <Button disabled={min === page} onClick={() => onClick(page - 1)}><ArrowBackIosIcon/></Button>
            {pages.map((i) => {
                const color = i === page ? 'primary' : 'default';
                const variant = i === page ? 'contained' : 'outlined';
                const handleClick = i !== page ? () => onClick(i) : undefined;
                return <Button color={color} variant={variant} onClick={handleClick} key={i}>{i}</Button>
            })}
            <Button disabled={max === page} onClick={() => onClick(page + 1)}><ArrowForwardIosIcon/></Button>
        </ButtonGroup>
    );

};

export default Pager;