import React from 'react';
import autobind from 'autobind';
import isNil from 'lodash/isNil';

import { checkOnFocusHOC, WithCheckOnFocusProps } from '../../HOC/checkOnFocusHOC';
import { Input, InputProps } from './Input';

export interface Props extends InputProps {
    autoFocus?: boolean;
}

// @ts-ignore
interface WithHOCProps extends Props, WithCheckOnFocusProps {}

interface State {
    currentValue: string | number | null;
}

class InputContainer extends React.PureComponent<WithHOCProps, State> {
    public state: State = {
        currentValue: null,
    };

    protected input!: HTMLElement;

    public componentDidMount(): void {
        if (this.props.autoFocus) {
            this.input.focus();
        }
    }

    public render() {
        const { value, onChange, onBlur, isOnFocus, onFocus, handleFocus, handleBlur, autoComplete, ...props } =
            this.props;
        const { currentValue } = this.state;

        const inputValue = isNil(currentValue) ? (isNil(value) ? '' : value) : currentValue;

        return React.createElement(Input, {
            ...props,
            isActive: isOnFocus,
            autoComplete: autoComplete || 'off',
            value: inputValue,
            onChange: this.handleInputChange,
            onBlur: this.handleInputBlur,
            onFocus: this.handleInputFocus,
        });
    }

    @autobind
    protected inputRef(input: HTMLElement): void {
        this.input = input;
    }

    @autobind
    protected handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { onChange } = this.props;

        if (onChange) {
            onChange(event);
        } else {
            this.setState({
                currentValue: event.target.value,
            });
        }
    }

    @autobind
    protected async handleInputFocus(event: React.FocusEvent<HTMLInputElement>) {
        const { onFocus, name, handleFocus } = this.props;

        event.target.name = name!;

        if (onFocus) {
            await onFocus(event);
        }

        handleFocus();
    }

    @autobind
    protected async handleInputBlur(event: React.FocusEvent<HTMLInputElement>) {
        const { onBlur, name, handleBlur } = this.props;

        event.target.name = name!;

        handleBlur();

        this.setState({
            currentValue: null,
        });

        if (onBlur) {
            await onBlur(event);
        }
    }
}

export const WithHOCInputContainer = checkOnFocusHOC<Props>(InputContainer);
