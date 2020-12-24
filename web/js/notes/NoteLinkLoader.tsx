import * as React from 'react';
import {useHistory} from "react-router-dom";
import {useRefValue} from "../hooks/ReactHooks";
import {NoteNameStr, NoteIDStr} from "./NotesStore2";

export type NoteTargetStr = NoteIDStr | NoteNameStr;

export function useNoteLinkLoader() {

    const history = useHistory();
    const historyRef = useRefValue(history);

    return React.useCallback((target: NoteTargetStr) => {

        const newURL = '/apps/stories/notes/' + target;
        historyRef.current.push(newURL);

    }, [historyRef]);

}
