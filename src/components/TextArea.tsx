import {FieldConfig} from "../types.ts";

import styles from "./FormControllers.module.css";
import useControllerState from "../hooks/useControllerState.ts";

export default function TextArea({config}: { config: FieldConfig }) {
    const { value, onValueChanged } = useControllerState(config);
    const {id, label, mandatory, placeHolder} = config;
    const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => onValueChanged(e.target.value);

    return (
        <div className={styles.inputWrapper}>
            <label className={styles.labelText}
                   htmlFor={id}>
                {label}{mandatory && <span> *</span>}
            </label>
            <textarea id={id}
                      value={value}
                      className={styles.textBox}
                      placeholder={placeHolder}
                      onChange={changeHandler}/>
        </div>
    );
}