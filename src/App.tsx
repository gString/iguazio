import {useRecoilValue} from "recoil";
import {FieldConfig} from "./types.ts";

import TextInput from "./components/TextInput.tsx";
import TextArea from "./components/TextArea.tsx";
import DropDownMenu from "./components/DropDownMenu.tsx";
import CheckBoxesGroup from "./components/CheckBoxesGroup.tsx";
import useValidation from "./hooks/useValidation.ts";
import {formQuerySelector} from "./utils/atoms.ts";
import './App.css'

function Form({formConfig}) {
    const {validate: onCreate} = useValidation();

    return (
        <form onSubmit={e => e.preventDefault()} id="formFrame" noValidate>
            {formConfig.map((field: FieldConfig) => {
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

function App() {
    const formConfig = useRecoilValue(formQuerySelector);

    return (
            <Form formConfig={formConfig} />
)
}

export default App;

