import React from 'react';
import classnames from 'classnames';

import style from './Input.scss';

import { FieldTitle } from '@components/FieldTitle';
import { isDefined } from '@utils/isDefined';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    modifiers?: string[];
    isValid?: boolean;
}

interface Props extends InputProps {
    isActive: boolean;
}

export const InputModifier = {};

export function Input({ modifiers = [], type = 'text', title, isActive, isValid, ...props }: Props): JSX.Element {
    return (
        <div
            className={classnames([
                style.root,
                isActive && style.active,
                isDefined(isValid) && !isValid && style.notValid,
            ])}
        >
            {title && <FieldTitle title={title} />}
            <input {...props} className={classnames([style.input, ...modifiers])} type={type} />
        </div>
    );
}
