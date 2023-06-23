import {useEffect, useState} from 'react'
import './App.css'
import {FieldConfig} from "./types.ts";
import TextInput from "./components/TextInput.tsx";
import TextArea from "./components/TextArea.tsx";
import DropDownMenu from "./components/DropDownMenu.tsx";
import CheckBoxesGroup from "./components/CheckBoxesGroup.tsx";

function App() {
    const [formConfig, setFormConfig] = useState<FieldConfig[]>([]);

    useEffect(() => {
        try {
            fetch("mockData.json")
                .then(res => res.json())
                // .then((data: FieldConfig[]) => data.forEach(field => addToList(field)))
                .then((data: FieldConfig[]) => {
                    setFormConfig(data);
                });

        } catch (e) {
            throw new Error("Could not load initial data");
        }
    }, []);


    return (
        <form id="formFrame">
            {Boolean(formConfig.length) && formConfig.map(field => {
              // addToList(field);
                const {type, id} = field;
                switch(type) {
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
            {/*<button onClick={onCreate}>Create</button>*/}
        </form>
    )
}

export default App
