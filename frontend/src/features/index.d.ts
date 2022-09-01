// Type definitions for DT9 features
// Project: https://github.com/DT9Media/dt9-hub-frontend
// Definitions by: Chris D <https://github.com/listingslab>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export interface DT9SysError {
    severity: string,
    code: number | string
    message: string
}

export interface DT9Banner {
    pk: string,
    sk: string,
}

export interface DT9Site {
    pk: string,
    sk: string,
}

export interface DT9Field {
    label: string,
    value: string
    onChange: any,
}
