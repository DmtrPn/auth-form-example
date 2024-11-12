import React, { ReactNode } from 'react';
import classnames from 'classnames';
import isNull from 'lodash/isNull';

import style from './FieldTitle.scss';

export interface FieldTitleParams {
    title: ReactNode;
    isValid?: boolean | null;
    theme?: FieldTitleTheme;
    modificators?: FieldTitleModificator[];
    disabled?: boolean;
    clickableTitle?: boolean;
    onClick?(): void;
}

export enum FieldTitleTheme {
    // @ts-ignore
    Bold = style.bold,
    // @ts-ignore
    WithoutPadding = style.withoutPadding,
}

export enum FieldTitleModificator {
    // @ts-ignore
    WithCaption = style.withCaption,
    // @ts-ignore
    WithPadding = style.withPadding,
    // @ts-ignore
    InheritColor = style.inheritColor,
}

interface Props extends FieldTitleParams {}

export function FieldTitle({
    title,
    clickableTitle,
    disabled,
    theme,
    modificators = [],
    isValid = null,
    onClick,
}: Props): JSX.Element {
    return (
        <div
            className={classnames([
                style.root,
                theme,
                disabled && style.disabled,
                !isNull(isValid) && (isValid ? style.valid : style.notValid),
                !!onClick && clickableTitle && style.clickable,
                ...modificators,
            ])}
        >
            {title}
        </div>
    );
}
