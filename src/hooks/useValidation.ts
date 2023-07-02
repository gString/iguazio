import {useEffect, useRef} from "react";
import {useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {
    FieldConfig,
    FieldValue,
    ID,
    ResultWithId,
    Rule,
    ValidationsConfig,
    ValidationsResult,
    validState
} from "../types.ts";

import {
    allValidationSelector,
    fieldValueStateAtom,
    formQuerySelector,
    formValidationState,
    validatedFlag,
} from "../utils/atoms.ts";

export default function useValidation() {
    const [formValidState, setFormValidState] = useRecoilState(formValidationState);

    const idsRef = useRef<ID[]>([])
    const validationRef = useRef(new Map<ID, ValidationsConfig>());
    const fieldsValues = useRef<{value: FieldValue, id: ID}[]>([]);
    const setValidationResult = useSetRecoilState(allValidationSelector);
    const resetFlag = useRecoilValue(validatedFlag);

    const formConfig = useRecoilValue(formQuerySelector);

    // First step for user triggered validation - collecting current values
    const takeSnapshot = useRecoilCallback(
        ({snapshot}) => () => {
            fieldsValues.current = idsRef.current.map(id => {
                const value = snapshot.getLoadable(fieldValueStateAtom(id)).contents;
                return { id, value };
            })
            validateNow();
    });

    // validating each value
    const validateNow = () => {
        const validationOutput = fieldsValues.current.map(({id, value}) => {
            const { mandatory, rules } = validationRef.current.get(id) as ValidationsConfig;
            let checkedRules:ValidationsResult[];
            if (mandatory && !value?.length) {
                checkedRules = [{
                    id: "0",
                    msg: "This is a required field",
                    valid: false
                }]
            } else if (rules?.length) {
                checkedRules = rules.map(({id, msg, regex}: Rule): ValidationsResult => ({
                    id,
                    msg,
                    valid: new RegExp(regex).test(<string>value)
                }));
            } else {
                checkedRules = [];
            }
            return { id, result: checkedRules }
        });

        // continue: setting the result of validations, setting the overall validation
        setValidationResult(validationOutput);
        const invalid = setFormValidation(validationOutput);

        // if all is valid, output the values
        if (!invalid) {
            alert(JSON.stringify(setOutput(), null, 4));
        }
    }

    // checking and setting the overall form validation
    const setFormValidation = (results: ResultWithId[]) => {
        const invalid = results.some(({result}) => {
            return singleFieldValidation(result);
        });
        setFormValidState(invalid ? validState.INVALID : validState.VALID);
        return invalid;
    }
    const singleFieldValidation = (result: ValidationsResult[]) => {
        if (!result.length) return false;
        return result.some(item => !item.valid);
    }

    // setting the output
    const setOutput = () => {
        const output: {[key: string]: { [key: string]: string }} = {};
        fieldsValues.current.forEach(({value, id}) => {
            if (value.length) {
                const {model, modelGroup} = validationRef.current.get(id) as ValidationsConfig;
                // ESLint does not like it as there are edge cases that make this not to work,
                // but using Object.hasOwnProperty have its own edge cases
                if (!output.hasOwnProperty(modelGroup)) {
                    output[modelGroup] = {};
                }
                if (Array.isArray(value)) {
                    value = value.join(", ");
                }
                output[modelGroup][model] = value;
            }
        })
        return output;
    }

    // initial configuration
    useEffect(() => {
        if (formConfig.length) {
            formConfig.forEach(({id, rules, mandatory, model, modelGroup}: FieldConfig) => {
                validationRef.current.set(id, {id, rules, mandatory, model, modelGroup});
            });
            idsRef.current = Array.from(validationRef.current.keys());
        }
    }, [formConfig]);

    // reset the form validation in case of any additional input
    useEffect(() => {
        if (resetFlag && formValidState === validState.NOT_SET) {
            const resetValidationValue = idsRef.current.map(id => ({ id, result: [] }))
            setValidationResult(resetValidationValue);
        }
    }, [resetFlag, formValidState, setValidationResult]);

    return {
        validate: () => takeSnapshot(),
    }
}