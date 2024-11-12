import React from 'react';

export interface PageLocation {
    url: string;
    path: string;
    Component: React.ComponentType<any>;
}

export const locations: PageLocation[] = [];
