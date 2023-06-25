import {useCallback, useEffect} from "react";
import {FieldConfig, FieldValue, validState} from "../types.ts";
import {useRecoilState} from "recoil";
import {fieldValueStateAtom, inputValidationRulesAtom, validationResultAtom, validStateAtom} from "../utils/atoms.ts";


export default function useControllerState(fieldConfig: FieldConfig) {
    // const [validationResult, setValidationResult] = useState();

    const { id, initialValue, mandatory, validations, model, modelGroup } = fieldConfig;
    const [isValid, setIsValid] = useRecoilState(validStateAtom(id));
    const [value, setValue] = useRecoilState(fieldValueStateAtom(id));
    const [validationRules, setValidationRules] = useRecoilState(inputValidationRulesAtom(id));
    const [validationResult, setValidationResult] = useRecoilState(validationResultAtom(id));

        useEffect(() => {
        setValue(initialValue);
        // const valid = {rules: validations, mandatory};
        setValidationRules({rules: validations, mandatory});
        /*validationRules.current = {
            id, mandatory, validations, model, modelGroup
        }*/
    }, []);

    const onValueChanged = useCallback((newValue: FieldValue) => {
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