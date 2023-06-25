import React, {useState} from "react";
import {ChevronDown, ArrowRight} from "react-feather";
import {FieldConfig, Option} from "../types.ts";

import ClickOutsideWrapper from "./ClickOutsideWrapper.tsx";
import styles from "./FormControllers.module.css";
import useControllerState from "../hooks/useControllerState.ts";

export default function DropDownMenu({config}: { config: FieldConfig }) {
    const [isOpen, setIsOpen] = useState(false);
    const { value, onValueChanged } = useControllerState(config);

    const {id, label, items} = config;

    const toggleOpen = (e: React.MouseEvent<HTMLElement> | MouseEvent) => {
        e.preventDefault();
        setIsOpen(!isOpen)
    };

    const onSelect = (newValue: Option['value']) => (e: React.MouseEvent<HTMLElement>) => {
        if (newValue !== value) {
            toggleOpen(e);
            onValueChanged(newValue);
        }
    }

    return (
        <div className={styles.inputWrapper}>
            <h5 className={styles.labelText}>{label}</h5>
            <div className={styles.dropDownRef}>
                <button onClick={toggleOpen}
                        aria-label={label}
                        className={styles.dropDownButton}>
                    <span className={styles.dropDownButtonText}>{value}</span>
                    <ChevronDown className={styles.dropDownIcon}/>
                </button>
                {isOpen && <ClickOutsideWrapper onClick={toggleOpen}>
                    <ul className={styles.dropDownMenu}>
                        {items?.map(item => <li key={item.id}
                                                className={styles.dropMenuItem}
                                                onClick={onSelect(item.value)}
                                                data-selected={item.value === value}>
                            {item.value === value && <ArrowRight className={styles.selectedIcon} size={12}/>}
                            {item.label}
                        </li>)}
                    </ul>
                </ClickOutsideWrapper>}
            </div>
        </div>

    );
}