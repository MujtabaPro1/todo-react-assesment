import * as React from 'react';
import {useEffect} from "react";
import {storageKeys} from "../../../utils/constants/keys";
import IndexService from "../../../service/index.service";
import {
     Button,
    createStyles,
    makeStyles,
    Theme,
    Typography
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tile from "../../../components/tile/index";



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flex: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        },
        buttonDelete: {
            background: "red",
            margin: theme.spacing(1),
        },
        buttonEdit: {
            background: "#656565",
            margin: theme.spacing(1),
        },
        tileStyle:  {
            listStyle: 'none',
            display: 'flex',
            padding: 0,
            maxWidth: '85%'
        },
        footer : {
            color: "gray",
            position: "absolute",
            bottom: 0,
            maxWidth: '100%',
            width: 'auto',
            overflow: 'hidden'
        }

    }),
);


export default function EditTodo(props: {
    selectedIndex: number,
    refresh: boolean,
    deleteTodo: Function,
    editTodo: Function,
}) {


    const [existingTags, setExistingTags] = React.useState<any[]>([]);
    const indexService = new IndexService();
    const classes = useStyles();

    useEffect(() => {
        getTodos();
    }, [props.selectedIndex,props.refresh])


    const getTodos = async () => {
        let existingTodos: any | null = await indexService.getKey(storageKeys._todo);
        existingTodos = JSON.parse(existingTodos);
        setExistingTags(existingTodos);
    }

    return (
        <div>
        {existingTags && existingTags.length &&  existingTags[props.selectedIndex] ? <>
            <div className={classes.flex}>
                <Typography variant="h3" component="h4" >
                    {existingTags[props.selectedIndex].title}
                </Typography>
                <div>

                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttonEdit}
                        onClick={()=>{
                            props.editTodo(existingTags[props.selectedIndex]);
                        }}
                        startIcon={<EditIcon />}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={()=>{
                            props.deleteTodo(existingTags[props.selectedIndex].id);
                        }}
                        className={classes.buttonDelete}
                        startIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>

                </div>
            </div>

            <br/>
            <Typography >
                {existingTags[props.selectedIndex].content}
            </Typography>
         </> : <></>}
            <footer className={classes.footer}>
                {existingTags && existingTags.length &&  existingTags[props.selectedIndex]   ?

                    <ul
                        className={classes.tileStyle}
                        style={{overflowX: existingTags[props.selectedIndex].tag.length > 8 ? 'scroll': 'unset'}}>

                    {existingTags[props.selectedIndex].tag.map((t: any,index: number)=>{
                      return <li
                          key={Math.random()}
                      style={{ margin: 10}}
                      ><Tile
                              index={index}
                              label={t.label}
                      /></li>
                    })
                    }
                </ul> : <></>}
            </footer>
        </div>
    );
}
