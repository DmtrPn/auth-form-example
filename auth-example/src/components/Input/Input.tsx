import React from 'react';
import classnames from 'classnames';

import style from './Input.scss';

import { FieldTitle } from '@components/FieldTitle';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    modifiers?: string[];
}

interface Props extends InputProps {
    isActive: boolean;
}

export const InputModifier = {};

export function Input({ modifiers = [], type = 'text', title, isActive, ...props }: Props): JSX.Element {
    return (
        <div className={classnames([style.root, isActive && style.active])}>
            {title && <FieldTitle title={title} />}
            <input {...props} className={classnames([style.input, ...modifiers])} type={type} />
        </div>
    );
}
