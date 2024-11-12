import React from 'react';

import { Button, ButtonProps, ButtonTheme } from '@components/Button';

interface CancelButtonProps extends Omit<ButtonProps, 'onClick'> {
    onCancelClick(): void;
}

export function CancelButton({ label = 'Отменить', onCancelClick, ...props }: CancelButtonProps): JSX.Element {
    return (
        <Button theme={ButtonTheme.Light} onClick={onCancelClick} {...props}>
            {label}
        </Button>
    );
}
