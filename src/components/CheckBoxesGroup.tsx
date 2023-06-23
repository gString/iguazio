import {FieldConfig, Option, validState} from "../types.ts";

import styles from "./FormControllers.module.css";
import useControllerState from "../hooks/useControllerState.ts";

export default function CheckBoxesGroup({config}: { config: FieldConfig }) {
    const { value, onValueChanged, isValid} = useControllerState(config);
    const {label, items, mandatory} = config;
    const changeHandler = (itemValue: Option['value']) => () => {
        let _collectedValue;
        if (Array.isArray(value) && value.includes(itemValue)) {
            _collectedValue = value
                .filter((entry: Option['value']) => entry !== itemValue);
        } else {
            _collectedValue = [...value, itemValue];
        }
        onValueChanged(_collectedValue);
    }


    return (
        <fieldset className={styles.inputWrapper}>
            <legend className={styles.labelText}>{label}{mandatory && <span> *</span>}</legend>
            {items?.map(item => <div key={item.id}>
                <input type="checkbox"
                       checked={value.includes(item.value)}
                       onChange={changeHandler(item.value)}
                       id={item.id}/>
                <label className={styles.checkboxLabel}
                       htmlFor={item.id}>{item.label}</label>
            </div>)}

        </fieldset>
    );
}