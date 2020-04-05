import React from 'react';
import logo from '../../static/images/logo/logo.png';
import Routes from './Routes';
import Link from '../../components/ui/Link';
import LeftArrow from '@material-ui/icons/ArrowBack';
const Auth: React.FC = () => (
    <div
        style={{
            width: '100vw',
            height: '100vh',
        }}
    >
        {!window.location.href.includes('login') && (
            <div
                style={{
                    position: 'fixed',
                    zIndex: 999,
                    paddingTop: 50,
                    paddingLeft: 50,
                }}
            >
                <Link to="/login">
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <LeftArrow /> Back to login
                    </div>
                </Link>
            </div>
        )}
        <div
            style={{
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                position: 'relative',
                // top: -150,
            }}
        >
            <img
                src={logo}
                alt="Website Logo"
                height={100}
                width="auto"
                style={{ marginBottom: 50 }}
            />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 400,
                }}
            >
                <Routes />
            </div>
        </div>
    </div>
);

export default Auth;
