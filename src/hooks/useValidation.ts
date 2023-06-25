import {useEffect, useRef, useState} from "react";
import {
    FieldConfig,
    FieldValue,
    ID,
    IsValidState,
    ResultWithId,
    Rule,
    ValidationsConfig,
    ValidationsResult, validState
} from "../types.ts";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {allValidationSelector, controllersIds, formQuerySelector, valuesCollectorSelector} from "../utils/atoms.ts";

export default function useValidation() {
    const [formValidState, setFormValidState] = useState<IsValidState>(validState.NOT_SET);
    const idsRef = useRef<ID[]>([])
    const validationRef = useRef(new Map<ID, ValidationsConfig>());
    const fieldsValues = useRef<{value: FieldValue, id: ID}[]>([]);

    const formConfig = useRecoilValue(formQuerySelector);
    const setIdList = useSetRecoilState(controllersIds);
    const collectedValues = useRecoilValue(valuesCollectorSelector);
    const setValidationResult = useSetRecoilState(allValidationSelector);

    const actualValidation = () => {
        const results = collectedValues.map(({id, value}) => {
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
        setValidationResult(results);
        return results;
    }

    const setFormValidation = (results: ResultWithId[]) => {
        const invalid = results.some(({result}) => result.length);
        setFormValidState(invalid ? validState.INVALID : validState.VALID);
        return invalid;
    }

    type OutPut = Record<string, string | Record<string, string>>;
    const setOutput = () => {
        const output: OutPut = {};
        fieldsValues.current.forEach(({value, id}) => {
            if (value.length) {
                const {model, modelGroup} = validationRef.current.get(id) as ValidationsConfig;
                if (!output.hasOwnProperty(modelGroup)) {
                    output[modelGroup] = {};
                }
                output[modelGroup][model] = value;
            }
        })
        return output;
    }

    useEffect(() => {
        if (collectedValues?.length) {
            fieldsValues.current = [...collectedValues];
            const results = actualValidation();
            const invalid = setFormValidation(results);
            if (!invalid) {
                alert(JSON.stringify(setOutput(), null, 4));
            }
            setIdList([])
        }
    }, [collectedValues]);

    useEffect(() => {
        if (formConfig.length) {
            formConfig.forEach(({id, rules, mandatory, model, modelGroup}: FieldConfig) => {
                validationRef.current.set(id, {id, rules, mandatory, model, modelGroup});
            });
            idsRef.current = Array.from(validationRef.current.keys());
        }
    }, [formConfig]);

    const resetAll = () => {
        fieldsValues.current = [];
    }

    const validate = () => {
        setIdList(idsRef.current);
    }

    return {
        validate,
        formValidState,
    }
};