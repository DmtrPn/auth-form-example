import React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';

import style from './AuthPage.scss';

import commonStyle from '@components/mixins/commonStyles.scss';
import { Input } from '@components/Input';
import { SaveButton } from '@components/ActionButtons/SaveButton';
import { useAuthUser } from '@store/App/hooks/useAuthUser';
import { AuthPageDataTestAttributes } from './dataTestAttributes';

import { useAuth } from './hooks/useAuth';
import { PasswordInput } from '@components/Input/PassworInput';

export interface AuthPageProps {
    errorMessage?: string;
    email: string;
    password: string;
    fullName?: string;
    onLoginClick(): void;
    onLogoutClick(): void;
    onInputChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export const AuthPage = observer(({}: AuthPageProps): JSX.Element => {
    const { email, errorMessage, isEmailValid, password, isPasswordValid, onInputChange, onLoginClick, onLogoutClick } =
        useAuth();
    const { fullName } = useAuthUser();

    return (
        <div className={style.root} data-testid={AuthPageDataTestAttributes.Root}>
            <div className={style.form}>
                {!!fullName ? (
                    <>
                        <div className={commonStyle.field}>
                            <span className={style.message}>Здравствуйте, {fullName}</span>
                        </div>
                        <div className={commonStyle.field}>
                            <SaveButton
                                data-testid={AuthPageDataTestAttributes.SaveButton}
                                label={'Выйти'}
                                onSaveClick={onLogoutClick}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className={classnames([style.title, commonStyle.field])}>
                            <span className={style.message}>Авторизация</span>
                        </div>
                        {!!errorMessage && (
                            <div className={commonStyle.field}>
                                <span
                                    data-testid={AuthPageDataTestAttributes.ErrorMessage}
                                    className={style.errorMessage}
                                >
                                    {errorMessage}
                                </span>
                            </div>
                        )}
                        <div className={classnames([style.input, commonStyle.field])}>
                            <Input
                                data-testid={AuthPageDataTestAttributes.EmailInput}
                                name={'email'}
                                title={'Email'}
                                autoComplete={'on'}
                                value={email}
                                onChange={onInputChange}
                                isValid={email.length > 0 ? isEmailValid : undefined}
                                onKeyDown={e => (e.keyCode === 13 ? onLoginClick() : null)}
                            />
                        </div>
                        <div className={classnames([style.input, commonStyle.field])}>
                            <PasswordInput
                                data-testid={AuthPageDataTestAttributes.PasswordInput}
                                name={'password'}
                                autoComplete={'current-password'}
                                title={'Пароль'}
                                value={password}
                                onChange={onInputChange}
                                onKeyDown={e => (e.keyCode === 13 ? onLoginClick() : null)}
                            />
                        </div>
                        <div className={classnames([commonStyle.field, style.buttons])}>
                            <SaveButton
                                data-testid={AuthPageDataTestAttributes.SaveButton}
                                disabled={!isPasswordValid || !isEmailValid || (errorMessage || '').length > 0}
                                label={'Войти'}
                                onSaveClick={onLoginClick}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
});
