import React from 'react';
import {useLocation, useRouteMatch} from 'react-router';
import {NavLink} from 'react-router-dom';
import './NavBar.scss';

export interface Page {
    label: string;
    path: string;
}

interface Props {
    pages: Page[];
}

const NavBar = (props: Props) => {
    const location = useLocation();
    const { path } = useRouteMatch();

    return (
        <ul className="ww-NavBar">
            {props.pages.map((page, i) => {
                const className = `${path}${page.path}` === location.pathname ? 'ww-NavBar-activeTab' : 'ww-NavBar-tab';
                return (
                    <li key={i} className={className}>
                        <NavLink to={`${path}${page.path}`}>{page.label}</NavLink>
                    </li>
                );
            })}
        </ul>

    );
};

export default NavBar;
