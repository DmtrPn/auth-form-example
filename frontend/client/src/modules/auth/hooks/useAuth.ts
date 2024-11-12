import React, { useState } from 'react';
import { authService } from '@store/App/service/authService';
import { useStore } from '@store/useStore';
import { AppStore } from '@store/App/AppStore';

export interface UseAuthData {
    errorMessage?: string;
    email: string;
    password: string;
    isPasswordValid: boolean;
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
    const {
        appStore: { previousPageUrl },
    } = useStore([AppStore.Name]);

    function onInputChange({ target: { value, name } }: React.ChangeEvent<HTMLInputElement>): void {
        setLoginData({
            ...loginData,
            [name]: value,
        });
    }

    async function onLoginClick(): Promise<void> {
        const { email, password } = loginData;
        setErrorMassage(undefined);

        if (email.length > 1 && password.length > 5) {
            try {
                await authService.login({ password: password.trim(), email: email.toLocaleLowerCase().trim() });
                window.location.href = previousPageUrl;
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
        isPasswordValid: loginData.password.length > 5,
    };
}
