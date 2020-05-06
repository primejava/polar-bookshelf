import * as React from 'react';
import {IDocAnnotation} from '../../DocAnnotation';
import {DocAuthor} from "../../DocAuthor";
import {DocAnnotationMoment} from "../../DocAnnotationMoment";
import {NullCollapse} from "../../../ui/null_collapse/NullCollapse";
import Divider from '@material-ui/core/Divider';
import isEqual from 'react-fast-compare';
import {CommentDropdown2} from "../CommentDropdown2";
import {NULL_FUNCTION} from "polar-shared/src/util/Functions";
import {AnnotationTagButton2} from "../../AnnotationTagButton2";

interface IProps {
    readonly comment: IDocAnnotation;
    readonly editButton: JSX.Element;
    readonly onEdit: () => void;
}

export const CommentAnnotationControlBar2 = React.memo((props: IProps) => {

    const { comment } = props;

    return (
        <>
            <div style={{
                     display: 'flex',
                     alignItems: 'center',
                 }}
                 className="pt-1 pb-1">

                <DocAuthor author={comment.author}/>

                <div className="text-muted">
                    <DocAnnotationMoment created={comment.created}/>
                </div>

                <div style={{
                         flexGrow: 1,
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'flex-end'
                     }}>

                    <NullCollapse open={! comment.immutable}>
                        {props.editButton}
                    </NullCollapse>

                    <AnnotationTagButton2 annotation={props.comment}/>

                    {/*FIXME: connect this up*/}
                    <CommentDropdown2 id={'comment-dropdown-' + comment.id}
                                      disabled={comment.immutable}
                                      comment={comment}
                                      onDelete={NULL_FUNCTION}/>

                </div>

            </div>
            <Divider/>
        </>

    );

}, isEqual);



