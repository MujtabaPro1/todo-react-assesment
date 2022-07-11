import React, {useEffect, useState} from 'react';
import AppHeader from "../../../components/header";
import {Box, Button, createStyles, makeStyles, Theme, Toolbar} from "@material-ui/core";
import {TodoList} from "./todoList";
import DetailTodo from "./detailTodo";
import Alert from "../../../components/dialog";
import IndexService from "../../../service/index.service";
import {storageKeys} from "../../../utils/constants/keys";
import Todo from "../../../model/todo";
import EditTodo from "./editTodo";

const drawerWidth = 100;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        splash: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#697ef4',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            flexDirection: "column",
            fontSize: 40
        },
        buttonGetStarted : {
            marginTop: 20,
            color: '#697ef4'
        }
    }),
);

function Home() {

    const [refresh,setRefresh] = useState(false);
    const [isGetStarted,setIsGetStarted] = useState(true);
    const [open,setOpen] = useState(false);
    const [editOpen,setEditOpen] = useState(false);
    const [todoId,setTodoId] = useState("");
    const [items,setItems] = useState([]);
    const [selectedIndex,setSelectedIndex] = useState(0);
    const [selectedTodo,setSelectedTodo] = useState<Todo>({
        content: "", id: "", tag: [], title: ""

    });
    const classes = useStyles();
    const indexService = new IndexService();


    useEffect(()=>{
        getTodos();
    },[refresh]);

    useEffect(()=>{

    },[open]);


    const getTodos = async () => {
        let existingTodos: any | null = await indexService.getKey(storageKeys._todo);
        existingTodos = JSON.parse(existingTodos);
        setItems(existingTodos);

    }


    async function deleteTodo  () {
        let todo: any | null = await indexService.getKey(storageKeys._todo);
        if(todo){
            todo = JSON.parse(todo);
            if(todo && todo.length){
                todo = todo.filter((t: Todo)=> t.id != todoId);
                if(todo) {
                    await indexService.setKey(storageKeys._todo, JSON.stringify(todo));
                    setOpen(false);

                    setTimeout(()=>{
                        setRefresh(true);
                    },1000)

                }
            }
        }

    }
    function onClose () {
        setOpen(false);
    }




    return (
        isGetStarted && !items ? <div className={classes.splash}>

            Todo App
            <Button
                variant="contained"
                color="default"
                className={classes.buttonGetStarted}
                onClick={()=>{
                    setIsGetStarted(false);
                }}
            >
                Get Started
            </Button>

        </div> :   <Box sx={{ display: 'flex' }}>
       <AppHeader shouldRefresh={()=>{
           setRefresh(true);
       }} />
        <Box
            component="nav"
        >
            <TodoList
                setIndex={(index: number)=>{
                    setSelectedIndex(index);
                }}
                resetRefresh={()=>{
                setRefresh(false);
            }} refresh={refresh}   />
            {editOpen && <EditTodo
                handleClose={()=>{
                    setEditOpen(false);
                }}
                refresh={()=>{
                   setRefresh(true);
                }}
                todo={selectedTodo}
                isOpen={editOpen} />}
        </Box>

            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <DetailTodo
                    refresh={refresh}
                    editTodo={(todo: any)=> {
                        setSelectedTodo(todo);
                        setTimeout(()=>{
                            setEditOpen(true);
                        })

                    }}
                    deleteTodo={(id: string)=>{
                        setOpen(true);
                        setTodoId(id);
                    }}
                    selectedIndex={selectedIndex} />

            </Box>
            <footer style={{color: "gray", position: "fixed", bottom: 0}}>
                Copyrights @ 2022
            </footer>

            <Alert
                onClose={onClose}
                heading={"Delete"} content={"Are you sure you want to delete"} open={open} onAccept={deleteTodo}
            />
        </Box>
    );
}

export default Home;
