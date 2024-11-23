import React, { useState } from 'react';
import classnames from 'classnames';

import style from './Input.scss';

import { Props as InputProps, WithHOCInputContainer } from './InputContainer';
import { Icon, IconType } from '@components/Icon';

export interface Props extends InputProps {}

export const InputModifier = {};

export function PasswordInput(props: Props): JSX.Element {
    const [isShown, setIsShown] = useState(false);

    return (
        <div className={classnames([style.root_withIcon])}>
            <WithHOCInputContainer type={isShown ? 'text' : 'password'} {...props} />
            <div className={style.icon} onClick={() => setIsShown(!isShown)}>
                <Icon type={isShown ? IconType.EYE : IconType.EYE_CLOSE} />
            </div>
        </div>
    );
}
