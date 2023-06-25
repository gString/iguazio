import {useRecoilCallback, useRecoilSnapshot} from "recoil";
import {useEffect} from "react";

export function Debugger() {
    const snapshot = useRecoilSnapshot();
    useEffect(() => {
        for( const node of snapshot.getNodes_UNSTABLE(/*{ isModified: true}*/)) {
            console.log(node.key, snapshot.getLoadable(node).contents);
        }
    }, [snapshot]);

    return (
        null
    );
}

export function DebugButton() {
    const clickHandler = useRecoilCallback(
        ({ snapshot }) => () => {
            console.log("State: ", snapshot);
            for( const node of snapshot.getNodes_UNSTABLE()) {
                console.log(node.key, snapshot.getLoadable(node).contents);
            }

        }
    )

    return (
        <button onClick={clickHandler} style={{margin: "40px"}}>State now</button>
    );
}
