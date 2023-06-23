import {FieldConfig, validState} from "../types.ts";

export const newStateItem = (initialValue: FieldConfig["initialValue"]): FieldState => ({
    value: initialValue,
    isValid: validState.NOT_SET,
    validationResult: [],
})
