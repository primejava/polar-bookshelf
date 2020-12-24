import React from "react";
import {MiddleDot} from "./MiddleDot";
import {NoteTargetStr, useNoteLinkLoader} from "./NoteLinkLoader";
import {deepMemo} from "../react/ReactUtils";
import {NoteButton} from "./NoteButton";
import {NoteIDStr, useNotesStore} from "./NotesStore2";

interface IProps {
    readonly target: NoteIDStr | NoteTargetStr;
}

export const NoteBulletButton = deepMemo(function NoteBulletButton(props: IProps) {

    const noteLinkLoader = useNoteLinkLoader();
    const store = useNotesStore();

    const disabled = store.root === props.target;

    return (
        <NoteButton onClick={() => noteLinkLoader(props.target)}
                    disabled={disabled}>
            <MiddleDot/>
        </NoteButton>
    );
})

