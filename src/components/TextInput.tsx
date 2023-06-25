import {ReactElement, useEffect, useRef} from "react";
import {CheckSquare, XOctagon} from "react-feather";
import {FieldConfig, IsValidState, validState} from "../types.ts";

import styles from "./FormControllers.module.css";
import useControllerState from "../hooks/useControllerState.ts";

/*
function ValidationDisplay({isValid, validationResults}: {
    isValid: IsValidState,
    validationResults: ValidatedRule[]
}): ReactElement {
    return <div>
        {isValid === validState.VALID ? <CheckSquare/> : <XOctagon/>}
        <p>{JSON.stringify(validationResults)}</p>
        <p>{JSON.stringify(isValid)}</p>
    </div>
}
*/

export default function TextInput({config}: { config: FieldConfig }) {
    const { value, onValueChanged, isValid, validationResult } = useControllerState(config);
    const {id, label, placeHolder, mandatory} = config;

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onValueChanged(e.target.value)
    };

    return (
        <div className={styles.inputWrapper}>
            <label className={styles.labelText}
                   htmlFor={id}>
                {label}{mandatory && <span> *</span>}
            </label>
            <input className={styles.fullWidthControl}
                   id={id}
                   type="text"
                   required={mandatory}
                   placeholder={placeHolder}
                   aria-required={mandatory}
                   value={value}
                   onChange={changeHandler}/>
            {/*{isValid !== validState.NOT_SET &&
                <ValidationDisplay isValid={isValid} validationResults={validationResult}/>}*/}
        </div>
    );
}