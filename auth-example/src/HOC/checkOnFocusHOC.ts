import React from 'react';
import autobind from 'autobind';

export interface WithCheckOnFocusProps {
    isOnFocus: boolean;
    handleFocus(): void;
    handleBlur(): void;
}

interface State {
    isOnFocus: boolean;
}

export function checkOnFocusHOC<Props>(WrappedComponent: any): React.ComponentType<Props> {
    class FixedPositionHOC extends React.Component<Props, State> {
        public state: State = {
            isOnFocus: false,
        };

        public render() {
            return React.createElement(WrappedComponent, {
                ...this.props,
                isOnFocus: this.state.isOnFocus,
                handleFocus: this.handleFocus,
                handleBlur: this.handleBlur,
            });
        }

        @autobind
        protected handleFocus() {
            this.setState({ isOnFocus: true });
        }

        @autobind
        protected handleBlur() {
            this.setState({ isOnFocus: false });
        }
    }

    return FixedPositionHOC;
}
