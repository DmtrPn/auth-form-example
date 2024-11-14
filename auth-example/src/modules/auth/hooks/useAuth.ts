import React, { useState } from 'react';
import { authService } from '@store/App/service/authService';

export interface UseAuthData {
    errorMessage?: string;
    login: string;
    password: string;
    isReadyForLogin: boolean;
    onLoginClick(): void;
    onLogoutClick(): void;
    onInputChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

interface LoginData {
    errorMessage?: string;
    login: string;
    password: string;
}

export function useAuth(): UseAuthData {
    const [loginData, setLoginData] = useState<LoginData>({ login: '', password: '' });
    const [errorMessage, setErrorMassage] = useState<string>();

    function onInputChange({ target: { value, name } }: React.ChangeEvent<HTMLInputElement>): void {
        setErrorMassage(undefined);
        setLoginData({
            ...loginData,
            [name]: value,
        });
    }

    async function onLoginClick(): Promise<void> {
        const { login, password } = loginData;
        setErrorMassage(undefined);

        if (login.length > 1 && password.length) {
            setErrorMassage('Email or password is incorrect');
            try {
                await authService.login({ password: password.trim(), login: login.trim() });
            } catch (e: any) {
                console.error('Error:', e);
                setErrorMassage(() => e.message);
            }
        }
    }

    async function onLogoutClick(): Promise<void> {
        await authService.logout();
    }

    return {
        ...loginData,
        onInputChange,
        onLoginClick,
        errorMessage,
        onLogoutClick,
        isReadyForLogin: !errorMessage && loginData.password.length > 0 && loginData.login.length > 0,
    };
}
