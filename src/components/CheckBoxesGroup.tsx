import {useRecoilValue} from "recoil";
import {FieldConfig, Option} from "../types.ts";

import useControllerState from "../hooks/useControllerState.ts";
import {validationResultAtom} from "../utils/atoms.ts";
import styles from "./FormControllers.module.css";

export default function CheckBoxesGroup({config}: { config: FieldConfig }) {
    const { value, onValueChanged} = useControllerState(config);
    const {id, label, items, mandatory} = config;
    const validationResult = useRecoilValue(validationResultAtom(id));
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
        <fieldset className={styles.inputWrapper} data-invalid={Boolean(validationResult.length)}>
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