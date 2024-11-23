import React, { useState } from 'react';
import { authService } from '@store/App/service/authService';
import { validateEmail } from '@utils/Validation';

export interface UseAuthData {
    errorMessage?: string;
    email: string;
    password: string;
    isPasswordValid: boolean;
    isEmailValid: boolean;
    onLoginClick(): void;
    onLogoutClick(): void;
    onInputChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

interface LoginData {
    errorMessage?: string;
    email: string;
    password: string;
}

export function useAuth(): UseAuthData {
    const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });
    const [errorMessage, setErrorMassage] = useState<string>();

    function onInputChange({ target: { value, name } }: React.ChangeEvent<HTMLInputElement>): void {
        setErrorMassage(undefined);
        setLoginData({
            ...loginData,
            [name]: value,
        });
    }

    async function onLoginClick(): Promise<void> {
        const { email, password } = loginData;
        setErrorMassage(undefined);

        if (email.length > 1 && password.length) {
            setErrorMassage('Email or password is incorrect');
            try {
                await authService.login({ password: password.trim(), login: email.trim() });
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
        isEmailValid: validateEmail(loginData.email),
        isPasswordValid: loginData.password.length > 0,
    };
}
