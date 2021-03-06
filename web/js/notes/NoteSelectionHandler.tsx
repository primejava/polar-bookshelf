import * as React from 'react';
import { observer } from "mobx-react-lite"
import { useNotesStore } from './store/NotesStore';

interface IProps {
    readonly children: JSX.Element;
    readonly style?: React.CSSProperties;
}

export const NoteSelectionHandler = observer(function NoteSelectionHandler(props: IProps) {

    const store = useNotesStore();

    const selected = store.selected;

    const handleDelete = React.useCallback((): boolean => {

        const deletable = Object.keys(selected);

        if (deletable.length > 0) {
            store.doDelete(deletable);
            return true;
        }

        return false;

    }, [selected, store]);

    const onKeyDown = React.useCallback((event: KeyboardEvent) => {

        switch (event.key) {

            case 'Backspace':
            case 'Delete':
                if (handleDelete()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                break;

            case 'ArrowUp':
            case 'ArrowDown':
                break;

            default:
                store.clearSelected();
                break;

        }

    }, [handleDelete, store]);

    const handleClick = React.useCallback(() => {
        store.clearSelected();
    }, [store]);

    React.useEffect(() => {

        window.addEventListener('keydown', onKeyDown, {capture: true})

        return () => {
            window.removeEventListener('keydown', onKeyDown, {capture: true})
        }

    }, [onKeyDown])

    return (
        <div onClick={handleClick} style={props.style}>
            {props.children}
        </div>
    );

});
