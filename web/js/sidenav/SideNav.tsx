import * as React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import {useSideNavStore, TabDescriptor} from './SideNavStore';
import Divider from '@material-ui/core/Divider';
import {PolarSVGIcon} from "../ui/svg_icons/PolarSVGIcon";
import {useHistory} from 'react-router-dom';
import TimelineIcon from '@material-ui/icons/Timeline';
import {ActiveTabButton} from "./ActiveTabButton";
import SettingsIcon from '@material-ui/icons/Settings';
import NoteIcon from '@material-ui/icons/Note';
import DescriptionIcon from '@material-ui/icons/Description';
import {createContextMenu} from "../../../apps/repository/js/doc_repo/MUIContextMenu2";
import {SideNavContextMenu} from "./SideNavContextMenu";
import {SideNavButton} from "./SideNavButton";
import {AccountAvatar} from "../ui/cloud_auth/AccountAvatar";
import SyncIcon from '@material-ui/icons/Sync';
import {useAnkiSyncCallback} from "./AnkiSyncHook";
import {SideNavCommandMenu} from "./SideNavCommand";
import {ZenModeActiveContainer} from "../mui/ZenModeActiveContainer";
import { Intercom } from '../apps/repository/integrations/Intercom';
import { SideNavQuestionButton } from './SideNavQuestionButton';

export const SIDENAV_WIDTH = 56;
export const SIDENAV_BUTTON_SIZE = SIDENAV_WIDTH - 10;
export const SIDENAV_SECONDARY_BUTTON_SIZE = SIDENAV_WIDTH - 32;

// 80 and 48x48 figma icons
//
// export const SIDENAV_WIDTH = 80;
// export const SIDENAV_BUTTON_SIZE = 32;
// export const SIDENAV_SECONDARY_BUTTON_SIZE = 32;

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            width: SIDENAV_WIDTH,
            minWidth: SIDENAV_WIDTH,
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.background.default,
            alignItems: 'center'
        },
        logo: {
            display: 'flex',
            cursor: 'pointer',
            marginTop: '8px',
            "& *": {
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        },
        dividerTop: {
            marginTop: '4px',
            marginBottom: '5px',
            margin: theme.spacing(1),
            height: '1px'
        },
        divider: {
            marginBottom: '5px',
            margin: theme.spacing(1),
            height: '1px'
        },
        buttons: {
            flexGrow: 1,
            minHeight: 0,
            overflow: 'hidden'
        },
        historyButton: {
            color: theme.palette.text.secondary,

            '&:hover': {
                color: theme.palette.text.primary
            },

        },
        secondaryIcon: {
            width: SIDENAV_SECONDARY_BUTTON_SIZE,
            height: SIDENAV_SECONDARY_BUTTON_SIZE
        }
    }),
);

interface HistoryButtonProps {
    readonly path: string;
    readonly title: string;
    readonly children: JSX.Element | string;
}

export const SideNavHistoryButton = React.memo((props: HistoryButtonProps) => {

    const history = useHistory();

    return (
        <ActiveTabButton title={props.title}
                         path={props.path}
                         noContextMenu={true}
                         onClick={() => history.push(props.path)}>
            {props.children}
        </ActiveTabButton>
    )
});


const HomeButton = React.memo(() => {

    const history = useHistory();
    const classes = useStyles();

    return (
        <ActiveTabButton title="Documents"
                         path="/"
                         noContextMenu={true}
                         onClick={() => history.push('/')}>
            <DescriptionIcon className={classes.secondaryIcon}/>
        </ActiveTabButton>
    )
});

const AnnotationsButton = React.memo(() => {

    const classes = useStyles();

    return (
        <SideNavHistoryButton title="Annotations"
                              path="/annotations">
            <NoteIcon className={classes.secondaryIcon}/>
        </SideNavHistoryButton>
    )
});



const StatsButton = React.memo(() => {

    const classes = useStyles();

    return (
        <SideNavHistoryButton title="Statistics"
                              path="/stats">
            <TimelineIcon className={classes.secondaryIcon}/>
        </SideNavHistoryButton>
    )
});

const AccountButton = React.memo(() => {

    const classes = useStyles();

    return (
        <SideNavHistoryButton title="Account"
                              path="#account">
            <AccountAvatar className={classes.secondaryIcon}/>
        </SideNavHistoryButton>
    )
});

const SettingsButton = React.memo(() => {

    const classes = useStyles();

    return (
        <SideNavHistoryButton title="Settings"
                              path="/settings">
            <SettingsIcon className={classes.secondaryIcon}/>
        </SideNavHistoryButton>
    )
});


const PolarButton = React.memo(() => {

    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.logo}
             onClick={() => history.push('')}>
            <PolarSVGIcon width={46}
                          height={46}/>
        </div>
    );

})

const SyncButton = React.memo(() => {

    const classes = useStyles();

    const ankiSyncCallback = useAnkiSyncCallback();

    return (
        <ActiveTabButton title="Sync"
                         path="/sync"
                         noContextMenu={true}
                         onClick={ankiSyncCallback}>
            <SyncIcon className={classes.secondaryIcon}/>
        </ActiveTabButton>
    )
});

const SideNavDividerTop = React.memo(() => {

    const classes = useStyles();

    return (
        <Divider orientation="horizontal"
                 flexItem={true}
                 className={classes.dividerTop}/>
    )

});

const SideNavDivider = React.memo(() => {

    const classes = useStyles();

    return (
        <Divider orientation="horizontal"
                 flexItem={true}
                 className={classes.divider}/>
    )

});

export const [SideNavContextMenuProvider, useSideNavContextMenu]
    = createContextMenu(SideNavContextMenu, {name: 'sidenav'});

export const SideNav = React.memo(() => {

    const classes = useStyles();

    const {tabs} = useSideNavStore(['tabs']);

    return (
        <>
            <SideNavCommandMenu/>

            <Intercom/>

            <ZenModeActiveContainer>
                <div className={classes.root}>

                    <PolarButton/>

                    <SideNavDividerTop/>

                    <HomeButton/>
                    <AnnotationsButton/>
                    <StatsButton/>

                    {tabs.length > 0 && (
                        <SideNavDivider/>
                    )}

                    <div className={classes.buttons}>
                        {tabs.map(tab => <SideNavButton key={tab.id} tab={tab}/>)}
                    </div>

                    <div style={{marginBottom: '5px'}}>
                        <SideNavDivider/>
                        <SyncButton/>
                        <AccountButton/>
                        <SideNavQuestionButton/>
                        <SettingsButton/>
                    </div>

                </div>
            </ZenModeActiveContainer>
        </>
    );

});
