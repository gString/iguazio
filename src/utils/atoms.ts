import {atom, atomFamily, DefaultValue, selector, selectorFamily} from "recoil";
import {
    FieldValue,
    ID, IsValidState, ResultWithId,
    ValidationsResult, validState,
} from "../types.ts";

export const urlAtom = atom({
    key: "configuration-url",
    default: "mockData.json"
})

export const formQuerySelector = selector({
    key: "form-configuration-query",
    get: async ({get}) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const response = await fetch(get(urlAtom)).then(data => data.json());
        return response;
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
    get: () => {},
    set: ({set, get}, newValue) => {
        if (newValue instanceof DefaultValue) return;
        newValue.forEach(
            ({id, result}) => {
                set(validationResultAtom(id), result);
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
    get: () => {},
    set: (id) => ({get, set}, newValue) => {
        set(fieldValueStateAtom(id), newValue);
        set(validatedFlag, true);
        set(formValidationState, validState.NOT_SET);
    }
})

export const formValidationState = atom<IsValidState>({
    key: "form-state",
    default: validState.NOT_SET
})