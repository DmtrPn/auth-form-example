import { useEffect } from 'react';

export interface UseAuthUserData {
    isAuthorized: boolean;
    fullName?: string;
}

export function useAuthUser(): UseAuthUserData {
    useEffect(() => {
        (async () => {
            // if (!appStore.isAuthorized) {
            //     await authService.loadAuthorizedUser();
            // }
        })();
    }, []);

    return {
        isAuthorized: false,
        fullName: undefined,
    };
}
