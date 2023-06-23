export type FieldValue = string | string[];

export interface Rule {
    id: string;
    msg: string;
    regex: string;
}

export interface Option {
    id: string;
    label: string;
    value: string;
}

export interface FieldConfig {
    id: string;
    type: string;
    label: string;
    placeHolder: string;
    initialValue: FieldValue;
    items?: Option[];
    mandatory: boolean;
    modelGroup: string;
    model: string;
    validations: Rule[];
}

export type ID = FieldConfig["id"];

export const validState = {
    NOT_SET: "not_set",
    VALID: "valid",
    INVALID: "invalid",
} as const;

type Keys = keyof typeof validState
export type IsValidState = (typeof validState)[Keys];

export interface FieldState {
    value: FieldValue;
    isValid: IsValidState;
    validationResult: [];
}

