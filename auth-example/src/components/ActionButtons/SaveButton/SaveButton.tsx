import React from 'react';

import { Button, ButtonProps } from '@components/Button';

interface SaveButtonProps extends Omit<ButtonProps, 'onClick'> {
    onSaveClick(): void;
}

export function SaveButton({ label = 'Cохранить', onSaveClick, ...props }: SaveButtonProps): JSX.Element {
    return (
        <Button color="violet" onClick={onSaveClick} {...props}>
            {label}
        </Button>
    );
}
