import React, {useEffect, useState} from 'react';
import {createStyles, Theme, makeStyles, alpha} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import {InputBase} from "@material-ui/core";
import Todo from "../../../model/todo";
import {storageKeys} from "../../../utils/constants/keys";
import IndexService from "../../../service/index.service";



const drawerWidth = 350;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: '#e3dfdf',
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
            margin: 8,
            padding: 8,
            display: 'flex',
            alignItems: 'center'


        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }),
);

export const  TodoList = (props: {
    refresh: boolean;
    resetRefresh: Function,
    setIndex: Function
}) => {
    const classes = useStyles();
    const [items,setItems] = useState<Todo[]>([]);
    const [tempItems,setTempItems] = useState<Todo[]>([]);
    const indexService = new IndexService();


    useEffect(() => {
        getTodos();
        if(props.refresh){
            getTodos();
            props.resetRefresh();

        }
    },[props.refresh]);

    const getTodos = async () => {
        let existingTodos: any | null = await indexService.getKey(storageKeys._todo);
        existingTodos = JSON.parse(existingTodos);
        setItems(existingTodos);
        setTempItems(existingTodos);
    }



    const searchTodos = (val: any) => {
        setTempItems(items.filter((i) => i.title.indexOf(val) > - 1));
    }


    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        onChange={(e)=>{
                            searchTodos(e.target.value);
                        }}
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <div className={classes.drawerContainer}>
                    <List>
                        {(tempItems && tempItems.length) ? tempItems.map((todo: any, index: number) => (
                            <div key={index}>
                            <ListItem
                                onClick={()=>{
                                    props.setIndex(index);
                                }}
                                button key={index}>
                                <ListItemText primary={todo.title} />
                            </ListItem>
                            {index < (items.length - 1) ? <Divider /> : <></>}
                            </div>
                        )) : <></>}

                    </List>
                </div>
            </Drawer>

        </div>
    );
}
