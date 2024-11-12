import React from 'react';
import { render, screen } from '@testing-library/react';
import { FakeParams } from 'good-lib/test-lib';

import { ComponentTestSuit } from '@core/test/ComponentTestSuit';
import { AUTH_URL } from '@api/AuthApi';

import { AuthPageDataTestAttributes } from '../../dataTestAttributes';
import { AuthPage } from '../../AuthPage';
import { USER_API_BASE_URL } from '@api/UserApi';

@Describe('AuthPage test')
export class AuthPageTestSpec extends ComponentTestSuit {
    @Test('Render test')
    public async renderTest(): Promise<void> {
        this.mockAxios.setOnGet(`${AUTH_URL}/user`, { user: undefined });
        render(React.createElement(AuthPage));
        await this.waitAsyncUseEffectFinished();

        const saveButton = screen.queryByTestId(AuthPageDataTestAttributes.SaveButton);

        expect(screen.queryByTestId(AuthPageDataTestAttributes.Root)).toBeInTheDocument();
        expect(screen.queryByTestId(AuthPageDataTestAttributes.EmailInput)).toBeInTheDocument();
        expect(screen.queryByTestId(AuthPageDataTestAttributes.PasswordInput)).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();
        expect(saveButton!.innerHTML).toBe('Войти');
        expect(screen.getByText('Авторизация')).toBeInTheDocument();

        expect(screen.queryByTestId(AuthPageDataTestAttributes.ErrorMessage)).not.toBeInTheDocument();
    }

    @Test('Render with authorized user')
    public async renderWithAuthorizedTest(): Promise<void> {
        const userId = FakeParams.getUuid();
        const name = FakeParams.getWord();
        this.mockAxios.setOnGet(`${AUTH_URL}/user`, { user: { id: userId } });
        this.mockAxios.setOnGet(`${USER_API_BASE_URL}/${userId}`, { user: { name, id: userId } });
        render(React.createElement(AuthPage));
        await this.waitAsyncUseEffectFinished();

        const saveButton = screen.queryByTestId(AuthPageDataTestAttributes.SaveButton);

        expect(screen.getByTestId(AuthPageDataTestAttributes.Root)).toBeInTheDocument();
        expect(screen.getByText(`Здравствуйте, ${name}`)).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();
        expect(saveButton!.innerHTML).toBe('Выйти');

        expect(screen.queryByTestId(AuthPageDataTestAttributes.EmailInput)).not.toBeInTheDocument();
        expect(screen.queryByTestId(AuthPageDataTestAttributes.PasswordInput)).not.toBeInTheDocument();
        expect(screen.queryByText('Авторизация')).not.toBeInTheDocument();
        expect(screen.queryByTestId(AuthPageDataTestAttributes.ErrorMessage)).not.toBeInTheDocument();
    }
}
