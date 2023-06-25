import './App.css'
import {FieldConfig, ID, IsValidState, ValidationsConfig, validState} from "./types.ts";
import TextInput from "./components/TextInput.tsx";
import TextArea from "./components/TextArea.tsx";
import DropDownMenu from "./components/DropDownMenu.tsx";
import CheckBoxesGroup from "./components/CheckBoxesGroup.tsx";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {DebugButton} from "./components/Debugger.tsx";
import {useEffect, useRef, useState} from "react";
import useValidation from "./hooks/useValidation.ts";
import {controllersIds, formQuerySelector} from "./utils/atoms.ts";

/*
const validateFormSelector = selectorFamily({
    key: "form-selector",
    get: (isGetNow) => ({get}) => {
        if (isGetNow) {
            const ids = get(controllersIds);
            const output = [];
            for (const id of ids) {
                const value = get(fieldValueStateAtom(id));
                output.push({value, id});
                console.log('output',output);
            }
            return output;
        }
    }

})

*/

function App() {
    const { validate, formValidState } = useValidation();

    console.log('formValidState',formValidState);

    const formConfig = useRecoilValue(formQuerySelector);

    const onCreate = (e: MouseEvent) => {
        e.preventDefault();
        validate();
    };

    return (
        <form id="formFrame">
            {Boolean(formConfig.length) && formConfig.map((field: FieldConfig) => {
                const {type, id} = field;
                switch (type) {
                    case "text":
                        return <TextInput config={field} key={id}/>;
                    case "textarea":
                        return <TextArea config={field} key={id}/>;
                    case "select":
                        return <DropDownMenu config={field} key={id}/>;
                    case "checkboxes-group":
                        return <CheckBoxesGroup config={field} key={id}/>;
                    default:
                        throw new Error(`Input type not found (${type})`);
                }
            })}
            <button onClick={onCreate} style={{margin: "40px"}}>Create</button>
            <br/>
            {/*<Debugger />*/}
            <br/>
            <DebugButton/>

        </form>
    )
}

export default App
