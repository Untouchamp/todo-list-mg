import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import firebase from 'firebase/compat';
import AuthSection from './AuthSection';
import '@testing-library/jest-dom';

describe('AuthSection component', () => {
    const signInGoogle = jest.fn();
    const signOutCurrentUser = jest.fn();
    const mockUser = {
        uid: 'UqZrTtOHytQpJABQBmGe0E9tdye2',
        email: 'untouchamp@gmail.com',
        emailVerified: true,
        displayName: 'Давид и Роман Кучухидзе',
        isAnonymous: false,
        photoURL:
            'https://lh3.googleusercontent.com/a/ACg8ocItLexQBWB95zD65XZs5JQpxnw66PwBxaTq-gHPdKJlBF0=s96-c',
        providerData: [
            {
                providerId: 'google.com',
                uid: '106820138157483760639',
                displayName: 'Давид и Роман Кучухидзе',
                email: 'untouchamp@gmail.com',
                phoneNumber: null,
                photoURL:
                    'https://lh3.googleusercontent.com/a/ACg8ocItLexQBWB95zD65XZs5JQpxnw66PwBxaTq-gHPdKJlBF0=s96-c',
            },
        ],
        stsTokenManager: {
            refreshToken:
                'AMf-vBy10Xc1VW5rKLRRVAtWa5S5nl2J-nOUSjORipyHsozleRem0U4n3RiI0qWdX1OCB4U3PRTJopLQUm968D9xblMPyDUBEsw49H7-q2ySnkRc6kCFSMib0lE2VLcOzmgWojrWH_VHnHdua5oELzBYWMYx0btFOkr8uYIYzlh3WI3Rk6kg84y7D_q9w_DqGRjM1MKYX_xuhCQypEOXy1RYdanyrGvAS4WlJrw3vBb60KKwbS_PTsL55Q7ovSy3PbSes4Tqt8btf8ba0ms3axdscHk_n62PSYBH0Yff46PdK7vO6CPJ5ZeibNI_X5NHSSpKW_CbcQYzawvrMU2kb1N97Sbvf_La7mlKtMzxIp3JKNQ6SBaNb77KxLDd8HSddy-OBPotzs0rMjMFvtHYFXeKQ7Gt0C4Yx4xrV93KjyUenzcSYO8weMzNVPsTqWKaRMGmU3UpdVUPTGR4N1jOofZI0XC963S1xQ',
            accessToken:
                'eyJhbGciOiJSUzI1NiIsImtpZCI6ImE2YzYzNTNmMmEzZWMxMjg2NTA1MzBkMTVmNmM0Y2Y0NTcxYTQ1NTciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoi0JTQsNCy0LjQtCDQuCDQoNC-0LzQsNC9INCa0YPRh9GD0YXQuNC00LfQtSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJdExleFFCV0I5NXpENjVYWnM1SlFweG53NjZQd0J4YVRxLWdIUGRLSmxCRjA9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdG9kb3MtZGItOGY2MGQiLCJhdWQiOiJ0b2Rvcy1kYi04ZjYwZCIsImF1dGhfdGltZSI6MTcwMDU2MjU3MiwidXNlcl9pZCI6IlVxWnJUdE9IeXRRcEpBQlFCbUdlMEU5dGR5ZTIiLCJzdWIiOiJVcVpyVHRPSHl0UXBKQUJRQm1HZTBFOXRkeWUyIiwiaWF0IjoxNzAwNTYyNTcyLCJleHAiOjE3MDA1NjYxNzIsImVtYWlsIjoidW50b3VjaGFtcEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwNjgyMDEzODE1NzQ4Mzc2MDYzOSJdLCJlbWFpbCI6WyJ1bnRvdWNoYW1wQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.dE_C81L-BoFYhYleGRT68yLey-3zxFIunGykEXkItYHyb7fHmcGpygpbCFZpW_lCT4j7GoEF5viUXAWn03D7QtTfnZGmuFlT8TORKU9fdhLqpelDQOxmVl8lNPTZq8xMh-L00BmgVToFHXDjCJFV3J9agzukQGf6ck_Y4GDLJZn1wbn61_vvnXy_up3il3pTBDNK9KFro30sOjaq9P3Xm73DOJsK-Z9mb0nS03aZvbTs2ogB5JZ_eALLppWsHoshGLE4sq4WmxUUlzaMsx33Q_VWxZI9e3shQ_nb4PUcDIFpiOUmhkgHXOWYXdvRZlpb9vqdBet0atrYuxjHPUUgSQ',
            expirationTime: 1700566172592,
        },
        createdAt: '1699469509784',
        lastLoginAt: '1700562572609',
        apiKey: 'AIzaSyCkouUAw38b2qbAXYs9lKpl5KrseJDFxgY',
        appName: '[DEFAULT]',
        metadata: {
            creationTime: '2023-11-17T12:00:00Z',
            lastSignInTime: '2023-11-17T12:30:00Z',
        },
        refreshToken: 'ds',
        tenantId: 'ds',
        delete: jest.fn().mockResolvedValue(undefined),
        getIdToken: jest.fn().mockResolvedValue('mock-id-token'),
        getToken: jest
            .fn()
            .mockResolvedValue({} as firebase.auth.IdTokenResult),
        reload: jest.fn().mockResolvedValue(undefined),
        toJSON: jest.fn().mockReturnValue({}),
        phoneNumber: 'ds',
        providerId: 'ds',
        getIdTokenResult: jest
            .fn()
            .mockResolvedValue({} as firebase.auth.IdTokenResult),
    };

    it('renders sign-in button when user is not authenticated', () => {
        render(
            <AuthSection
                user={null}
                signInGoogle={signInGoogle}
                signOutCurrentUser={signOutCurrentUser}
            />
        );
        const signInButton = screen.getByText('Sign in with Google');
        expect(signInButton).toBeInTheDocument();
    });

    it('renders profile dropdown when user is authenticated', () => {
        render(
            <AuthSection
                user={mockUser}
                signInGoogle={signInGoogle}
                signOutCurrentUser={signOutCurrentUser}
            />
        );
        const profileDropdown = screen.getByTestId('profile-dropdown');
        expect(profileDropdown).toBeInTheDocument();
    });

    it('calls signInGoogle function when sign-in button is clicked', () => {
        render(
            <AuthSection
                user={null}
                signInGoogle={signInGoogle}
                signOutCurrentUser={signOutCurrentUser}
            />
        );
        const signInButton = screen.getByText('Sign in with Google');
        fireEvent.click(signInButton);
        expect(signInGoogle).toHaveBeenCalled();
    });
});
