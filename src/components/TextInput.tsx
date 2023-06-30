import {useMemo, useState} from "react";
import {XSquare, CheckSquare, Check, X} from "react-feather";
import {FieldConfig} from "../types.ts";

import useControllerState from "../hooks/useControllerState.ts";
import ClickOutsideWrapper from "./ClickOutsideWrapper.tsx";
import styles from "./FormControllers.module.css";

export default function TextInput({config}: { config: FieldConfig }) {
    const [toggleRuleList, setToggleRuleList] = useState(false);
    const {value, onValueChanged, validationResult} = useControllerState(config);
    const {id, label, placeHolder, mandatory} = config;

    const isInvalid = useMemo(() => {
        if (validationResult?.length) {
            return validationResult.some(item => !item.valid);
        }
        return false;
    }, [validationResult]);
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onValueChanged(e.target.value)
    };

    const toggleOpen = () => setToggleRuleList(prevState => !prevState);
    const closeFlyout = () => setToggleRuleList(false);

    return (
        <div className={styles.inputWrapper} data-invalid={isInvalid}>
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
            {Boolean(validationResult.length) && (
                <ClickOutsideWrapper onClick={closeFlyout}>
                    <>
                        <button onClick={toggleOpen} className={styles.toggleListBtn} title="Click to see validations">
                            {isInvalid ? <XSquare className={styles.xIcon} size={14}/> :
                                <CheckSquare className={styles.checkIcon} size={14}/>}
                        </button>
                        {toggleRuleList && (
                            <ul className={styles.ruleList}>
                                {validationResult.map(({id, msg, valid}) =>
                                    (<li key={id} className={styles.ruleListItem}>
                                        {!valid ?
                                            <X className={styles.xIcon} size={14}/> :
                                            <Check className={styles.checkIcon} size={14}/>}
                                        {msg}</li>)
                                )}
                            </ul>
                        )}
                    </>
                </ClickOutsideWrapper>
            )}
        </div>
    );
}