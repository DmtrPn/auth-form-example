import React from 'react';

import { IconType } from '@components/Icon';
import { IconButton } from '@components/ActionButtons/IconButton';

export interface IconButtonProps {
    isDisable?: boolean;
    onEditClick(): void;
}

interface Props extends IconButtonProps {}

export function EditButton({ isDisable, onEditClick }: Props): JSX.Element {
    return <IconButton icon={IconType.PEN} isDisable={isDisable} onButtonClick={onEditClick} />;
}
