import {useCallback, useEffect} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {FieldConfig, FieldValue} from "../types.ts";

import {changeFieldValue, fieldValueStateAtom} from "../utils/atoms.ts";

export default function useControllerState(fieldConfig: FieldConfig) {
    // handle most of the state of each controller

    const {id, initialValue} = fieldConfig;
    const value = useRecoilValue(fieldValueStateAtom(id));
    const setValue = useSetRecoilState(changeFieldValue(id));

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue, setValue]);

    const onValueChanged = useCallback((newValue: FieldValue) => {
        setValue(newValue);
    }, [setValue]);

    return {
        value,
        onValueChanged,
    }
}