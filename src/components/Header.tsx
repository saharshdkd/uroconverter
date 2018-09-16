import * as React from 'react';
import {Navbar} from 'react-bootstrap';
// import { IndexLinkContainer } from "react-router-bootstrap";
import { Link } from 'react-router-dom';
import '../App.css';

export const Header: React.StatelessComponent<{}> = () => {
    return (
        <Navbar className="header">
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">MOOLLAH</Link>
                </Navbar.Brand>
            </Navbar.Header>
        </Navbar>
    );
}