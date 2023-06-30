import {useCallback, useEffect} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {FieldConfig, FieldValue} from "../types.ts";

import {changeFieldValue, fieldValueStateAtom, validationResultAtom} from "../utils/atoms.ts";

export default function useControllerState(fieldConfig: FieldConfig) {
    // An abstraction layer that handles the of the public state of each controller.

    const {id, initialValue} = fieldConfig;
    const value = useRecoilValue(fieldValueStateAtom(id));
    const setValue = useSetRecoilState(changeFieldValue(id));
    const validationResult = useRecoilValue(validationResultAtom(id));

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue, setValue]);

    const onValueChanged = useCallback((newValue: FieldValue) => {
        setValue(newValue);
    }, [setValue]);

    return {
        value,
        onValueChanged,
        validationResult,
    }
}