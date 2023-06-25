import {atom, atomFamily, DefaultValue, selector} from "recoil";
import {
    FieldValue,
    ID,
    IsValidState,
    ResultWithId,
    ValidationsConfig,
    ValidationsResult,
    validState
} from "../types.ts";

export const urlAtom = atom({
    key: "configurationUrl",
    default: "mockData.json"
})
export const formQuerySelector = selector({
    key: "FormConfigurationQuery",
    get: async ({get}) => {
        const response = await fetch(get(urlAtom)).then(data => data.json());
        return response;
    }
})
export const controllersIds = atom<string[] | null>({
    key: "ids",
    default: []
})
export const validStateAtom = atomFamily<IsValidState, ID>({
    key: "isValidState",
    default: validState.NOT_SET,
});
export const fieldValueStateAtom = atomFamily<FieldValue, ID>({
    key: "inputValueAtom",
    default: "",
});
export const inputValidationRulesAtom = atomFamily<ValidationsConfig, ID>({
    key: "validationRules",
    default: {rules: [], mandatory: false}
});
export const validationResultAtom = atomFamily<ValidationsResult[], ID>({
    key: "validationResult",
    default: [],
});

export const allValidationSelector = selector<ResultWithId[]>({
    key: "total-results",
    get: () => {
    },
    set: ({set}, newValue) => {
        if (newValue instanceof DefaultValue) return;
        newValue.forEach(
            ({id, result}) => {
                set(validationResultAtom(id), result);
            }
        )
    }
});

export const valuesCollectorSelector = selector({
    key: "value-collector",
    get: ({get}) => {
        const ids = get(controllersIds);
        if (!ids) return;
        return ids.map(id => ({value: get(fieldValueStateAtom(id)), id}));
    },
})

