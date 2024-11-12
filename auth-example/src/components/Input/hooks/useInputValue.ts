import React, { useState } from 'react';

export interface UseInputValueParams {
    initialValue?: string;
}

export interface UseInputValueData {
    value: string;
    onInputChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export function useInputValue({ initialValue = '' }: UseInputValueParams = {}): UseInputValueData {
    const [value, setValue] = useState<string>(initialValue);

    function onInputChange({ target }: React.ChangeEvent<HTMLInputElement>): void {
        setValue(target.value);
    }

    return { value, onInputChange };
}
