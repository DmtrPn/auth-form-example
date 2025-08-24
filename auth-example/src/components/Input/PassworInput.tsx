import React, { useState } from 'react';
import classnames from 'classnames';

import style from './Input.scss';

import { Props as InputProps, WithHOCInputContainer } from './InputContainer';
import { Icon, IconType } from '@components/Icon';

export interface Props extends InputProps {}

export const InputModifier = {};

export function PasswordInput(props: Props): JSX.Element {
    const [isShown, setIsShown] = useState(false);

    const ariaLabel = isShown ? 'Скрыть пароль' : 'Показать пароль';

    return (
        <div className={classnames([style.root_withIcon])}>
            <WithHOCInputContainer type={isShown ? 'text' : 'password'} {...props} />
            <button
                type="button"
                className={style.icon}
                onClick={() => setIsShown(!isShown)}
                aria-label={ariaLabel}
                aria-pressed={isShown}
            >
                <Icon type={isShown ? IconType.EYE : IconType.EYE_CLOSE} />
            </button>
        </div>
    );
}
