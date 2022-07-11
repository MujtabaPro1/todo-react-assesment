import React, {useEffect, useState} from 'react';
import { alpha, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LaunchIcon from '@material-ui/icons/Launch';
import {Button, IconButton} from "@material-ui/core";
import AddTodo from "../../containers/home/screen/addTodo";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: '#697ef4'
        },
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        toolbarButtons: {
            marginLeft: 'auto'
        }
    }),
);

export default function AppHeader(props: {
    shouldRefresh: Function;
}) {
    const classes = useStyles();
    const [addTodo, setAddTodo] = useState(false);


    useEffect(()=>{

    },[addTodo]);

    const handleClose = () => {
        setAddTodo(false);
    }

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" noWrap>
                   Notes
                </Typography>
                <div className={classes.toolbarButtons}>
                    <IconButton
                        onClick={()=>{
                            setAddTodo(true);
                        }}
                        color="inherit"><LaunchIcon /></IconButton>
                </div>
            </Toolbar>
            <AddTodo
                handleClose={handleClose}
                refresh={()=>{
                    props.shouldRefresh();
                }}
                isOpen={addTodo} />
        </AppBar>
    );
}
