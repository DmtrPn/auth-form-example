import React from 'react';

import style from './Page.scss';
import './reset.scss';

import { Router } from '@core/Router';

export function Page(): JSX.Element {
    return (
        <div className={style.root}>
            <div className={style.content}>
                <Router />
            </div>
        </div>
    );
}
