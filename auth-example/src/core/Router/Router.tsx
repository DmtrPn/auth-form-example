import React from 'react';
import { Routes, Route } from 'react-router';

import { AuthPage } from '@modules/auth';

export function Router(): JSX.Element {
    return (
        <Routes>
            <Route path={'*'} element={React.createElement(AuthPage)} />
        </Routes>
    );
}
