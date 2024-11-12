import React from 'react';
import classnames from 'classnames';

import style from './IconButton.scss';

import { Icon, IconType } from '@components/Icon';

export interface IconButtonProps {
    icon: IconType;
    inheritColor?: boolean;
    isDisable?: boolean;
    onButtonClick(): void;
}

interface Props extends IconButtonProps {}

export function IconButton({ icon, inheritColor, isDisable, onButtonClick }: Props): JSX.Element {
    return (
        <div
            className={classnames([style.root, isDisable && style.disabled, inheritColor && style.root_inheritColor])}
            onMouseUp={isDisable ? undefined : onButtonClick}
        >
            <div className={style.icon}>
                <Icon type={icon} />
            </div>
        </div>
    );
}
