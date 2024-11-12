import { renderHook, act } from '@testing-library/react';
import { TestSuit, FakeParams } from 'good-lib/test-lib';

import { useAuth, UseAuthData } from '../../useAuth';

@Describe('Use auth hook test')
export class UseAuthTestUnit extends TestSuit {
    @Test('use auth default params test')
    public async useAuthTest(): Promise<void> {
        const {
            result: {
                current: { password, email, isPasswordValid, errorMessage },
            },
        } = renderHook<UseAuthData, void>(() => useAuth());

        expect(password).toBe('');
        expect(email).toBe('');
        expect(isPasswordValid).toBeFalsy();
        expect(errorMessage).toBeUndefined();
    }

    @Test('update password test')
    public async updatePasswordTest(): Promise<void> {
        const {
            result,
            result: {
                current: { onInputChange },
            },
        } = renderHook<UseAuthData, void>(() => useAuth());

        const password = FakeParams.getWord();
        act(() => {
            onInputChange({ target: { value: password, name: 'password' } } as unknown as any);
        });

        expect(result.current.password).toBe(password);
    }

    @Test('update email test')
    public async updateEmailTest(): Promise<void> {
        const {
            result,
            result: {
                current: { onInputChange },
            },
        } = renderHook<UseAuthData, void>(() => useAuth());

        const email = FakeParams.getEmail();
        act(() => {
            onInputChange({ target: { value: email, name: 'email' } } as unknown as any);
        });

        expect(result.current.email).toBe(email);
    }

    @Test('Password validation')
    public async passwordValidationTest(): Promise<void> {
        const {
            result,
            result: {
                current: { onInputChange },
            },
        } = renderHook<UseAuthData, void>(() => useAuth());

        const notValidPassword = FakeParams.getWord({ length: 5 });
        act(() => {
            onInputChange({ target: { value: notValidPassword, name: 'password' } } as unknown as any);
        });
        expect(result.current.isPasswordValid).toBeFalsy();

        const validPassword = FakeParams.getWord({ length: 6 });
        act(() => {
            onInputChange({ target: { value: validPassword, name: 'password' } } as unknown as any);
        });
        expect(result.current.isPasswordValid).toBeTruthy();
    }
}
