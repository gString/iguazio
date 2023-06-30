import {atom, atomFamily, DefaultValue, selector, selectorFamily} from "recoil";
import {
    FieldValue,
    ID, IsValidState, ResultWithId,
    ValidationsResult, validState,
} from "../types.ts";
import {isEqual} from "radash";

const URL = "mockData.json"

export const formQuerySelector = selector({
    key: "form-configuration-query",
    get: async () => {
        await new Promise(resolve => setTimeout(resolve, 900));
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error("File not found");
        }
        return await response.json();
    }
})

export const fieldValueStateAtom = atomFamily<FieldValue, ID>({
    key: "field-value-atom",
    default: "",
});

export const validationResultAtom = atomFamily<ValidationsResult[], ID>({
    key: "validation-result",
    default: [],
});

export const allValidationSelector = selector<ResultWithId[]>({
    key: "total-results",
    get: null,
    set: ({set, get}, newValue) => {
        if (newValue instanceof DefaultValue) return;
        newValue.forEach(
            ({id, result}) => {
                const prevValue = get(validationResultAtom(id));
                if (!isEqual(prevValue, result)) {
                    set(validationResultAtom(id), result);
                }
            }
        )
    }
});

export const validatedFlag = atom({
    key: "validated-flag",
    default: true,
})

export const changeFieldValue = selectorFamily<FieldValue, ID>({
    key: "change-field-value",
    get: null,
    set: (id) => ({ set}, newValue) => {
        set(fieldValueStateAtom(id), newValue);
        set(validatedFlag, true);
        set(formValidationState, validState.NOT_SET);
    }
})

export const formValidationState = atom<IsValidState>({
    key: "form-state",
    default: validState.NOT_SET
})