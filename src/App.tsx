import {useRecoilValue} from "recoil";
import {FieldConfig} from "./types.ts";

import TextInput from "./components/TextInput.tsx";
import TextArea from "./components/TextArea.tsx";
import DropDownMenu from "./components/DropDownMenu.tsx";
import CheckBoxesGroup from "./components/CheckBoxesGroup.tsx";
import useValidation from "./hooks/useValidation.ts";
import {formQuerySelector} from "./utils/atoms.ts";
import './App.css'

function App() {
    const formConfig = useRecoilValue(formQuerySelector);
    const {validate} = useValidation();

    const onCreate = () => {
        validate();
    };

    return (
        <form onSubmit={e => e.preventDefault()} id="formFrame" noValidate>
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
            <footer className="actionBar">
                <button onClick={onCreate}>Create</button>
            </footer>
        </form>
    )
}

export default App
