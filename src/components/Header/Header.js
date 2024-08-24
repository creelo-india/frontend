import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loginStateAction } from '../../redux/actions/loginState';
import { faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const dispatch = useDispatch()
    const { loginState } = useSelector(state => state?.authReducer)

    const handleLogout = () => {
        dispatch(loginStateAction(false))
    }

    return (
        <header className="header shadow-sm">
            <div className="container-fluid d-flex justify-content-between align-items-center py-2">
                <div className="header__logo">
                    <Link to="/" className="text-logo">
                        BrandLogo
                    </Link>
                </div>

                <div className="header__search-bar d-flex flex-grow-1 mx-4">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="form-control"
                    />
                    <button className="btn btn-primary ml-2">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>

                <div className="header__nav d-flex align-items-center">
                    {loginState ?
                        <Link className="nav-link" onClick={handleLogout}>
                            <FontAwesomeIcon icon={faUser} className="mr-1" />
                            Logout
                        </Link> :
                        <Link to="/login" className="nav-link">
                            <FontAwesomeIcon icon={faUser} className="mr-1" />
                            Login
                        </Link>
                    }
                    <Link to="/cart" className="nav-link d-flex align-items-center">
                        <FontAwesomeIcon icon={faShoppingCart} className="mr-1" />
                        <span className="badge badge-pill badge-danger ml-1">0</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;