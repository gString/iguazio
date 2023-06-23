import {useCallback, useEffect, useRef, useState} from "react";
import {FieldConfig, FieldValue, IsValidState, validState} from "../types.ts";

export default function useControllerState(fieldConfig: FieldConfig) {
    const [value, setValue] = useState<FieldValue>("");
    const [isValid, setIsValid] = useState<IsValidState>(validState.NOT_SET);
    const [validationResult, setValidationResult] = useState();
    const validationRules = useRef<Partial<FieldConfig>>();

    const { id, initialValue, mandatory, validations, model, modelGroup } = fieldConfig;

    useEffect(() => {
        setValue(initialValue);
        validationRules.current = {
            id, mandatory, validations, model, modelGroup
        }
    }, []);

    const onValueChanged = useCallback((newValue) => {
        setValue(newValue);
        if (isValid !== validState.NOT_SET) {
            setIsValid(validState.NOT_SET);
            setValidationResult([]);
        }
    }, []);

    return {
        value,
        onValueChanged,
        isValid,
        validationResult,
    }
};