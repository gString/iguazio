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
    rules: Rule[];
}

export type ID = FieldConfig["id"];

export const validState = {
    NOT_SET: "not_set",
    VALID: "valid",
    INVALID: "invalid",
} as const;

type Keys = keyof typeof validState
export type IsValidState = (typeof validState)[Keys];

export interface ValidationsConfig {
    id: FieldConfig["id"];
    rules: FieldConfig["rules"];
    mandatory: FieldConfig["mandatory"];
    model: FieldConfig["model"];
    modelGroup: FieldConfig["modelGroup"];
}

export interface ValidationsResult {
    id: Rule["id"];
    msg: Rule["msg"];
    valid: boolean;
}

export interface ResultWithId {
    id: ID;
    result: ValidationsResult[];
}