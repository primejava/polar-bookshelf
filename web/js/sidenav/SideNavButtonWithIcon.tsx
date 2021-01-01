import * as React from "react";
import {TabDescriptor, useSideNavCallbacks, useSideNavStore} from "./SideNavStore";
import { deepMemo } from "../react/ReactUtils";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import clsx from "clsx";
import {FAFileIcon} from "../mui/MUIFontAwesome";
import IconButton from "@material-ui/core/IconButton";
import {ActiveTabBox} from "./ActiveTabBox";

const WIDTH = 72;
const BORDER = 3;

const useStyles = makeStyles((theme) =>
    createStyles({
        button: {
            // borderRadius: '5px',
            // width: `${WIDTH - (BORDER * 2)}px`,
            //
            // borderLeftWidth: `${BORDER}`,
            // borderLeftStyle: 'solid',
            // borderLeftColor: 'transparent',
            //
            // borderRightWidth: `${BORDER}`,
            // borderRightStyle: 'solid',
            // borderRightColor: 'transparent',
            //
            // marginBottom: '5px',
            // cursor: 'pointer',

            "& img": {
                width: `${WIDTH - (BORDER * 2)}px`,
                borderRadius: '5px',
            },
            '&:hover': {
                borderLeftColor: theme.palette.secondary.main
            },

        },
        activeButton: {
            borderLeftColor: theme.palette.secondary.main
        },
    }),
);

interface IProps {
    readonly tab: TabDescriptor;

}

export const SideNavButtonWithIcon = deepMemo((props: IProps) => {

    const {tab} = props;
    const {activeTab} = useSideNavStore(['tabs', 'activeTab']);
    const {setActiveTab} = useSideNavCallbacks();
    const classes = useStyles();

    const active = tab.id === activeTab;

    return (
        <ActiveTabBox tabID={tab.id}>
            <IconButton onClick={() => setActiveTab(tab.id)}
                        className={clsx(classes.button, active && classes.activeButton)}>
                <FAFileIcon/>
            </IconButton>
        </ActiveTabBox>
    );
});