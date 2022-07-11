import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CreatableSelect from 'react-select/creatable';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useEffect} from "react";
import {
    createStyles,
    FormControl,
    makeStyles,
    Theme
} from "@material-ui/core";
import IndexService from "../../../service/index.service";
import {storageKeys} from "../../../utils/constants/keys";
import {v4 as uuid} from 'uuid';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            width: "100%"
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
        label: {
            color: "rgba(0, 0, 0, 0.54)",
            padding: 0,
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '0.00938em',
            marginTop: 20,
            marginBottom: 20
        },
    }),
);


export default function AddTodo(props: {
    isOpen: boolean,
    handleClose: Function,
    refresh: Function
}) {

    const classes = useStyles();

    useEffect(() => {

        getTags();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isOpen])

    const [title, setTitle] = React.useState<string>('');
    const [content, setContent] = React.useState<string>('');
    const [tag, setTag] = React.useState<any[]>([]);
    const [submit, setSubmit] = React.useState<boolean>(false);
    const [existingTags, setExistingTags] = React.useState<any[]>([]);
    const indexService = new IndexService();

    const _handleChange = (
        newValue: any,
        actionMeta: any
    ) => {
        setTag(newValue);
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>, type: string) => {
        if (type == 'Content') {
            setContent(event.target.value as string);
        } else if (type == 'Title') {
            setTitle(event.target.value as string);
        } else if (type == 'Tag') {
            setTag(event.target.value as string[]);
        }
    };


    const getTags = async () => {
        let _existingTags: any | null = await indexService.getKey(storageKeys._tags);
        if (_existingTags) {
            _existingTags = JSON.parse(_existingTags);
            setExistingTags(_existingTags);
        }
    }

    const addOrUpdateTags = async (data: any) => {
        let _tags: any [] = existingTags;
        _tags.push(data);
        await setExistingTags(_tags);


    }


    const addTodo = async () => {
        if (!tag.length || !title || !content) {
            return;
        }
        const unique_id = uuid();


        for (let i = 0; i < tag.length; i++) {
            await addOrUpdateTags(tag[i]);
        }


        /*
        * Save unique tags only
        * */
        setTimeout(async () => {
            await indexService.setKey(storageKeys._tags, JSON.stringify(existingTags.filter((v, i, a) => a.findIndex(v2 => (JSON.stringify(v2) === JSON.stringify(v))) === i)));
        }, 0)

        let tags: any = await indexService.getKey(storageKeys._todo);
        if (tags) {
            tags = JSON.parse(tags);
            tags.push(
                {
                    id:unique_id,
                    title,
                    content,
                    tag
                }
            );

        } else {
            tags = [];
            tags.push({
                id: unique_id,
                title,
                content,
                tag
            })
        }

        await indexService.setKey(storageKeys._todo, JSON.stringify(tags));
        clear();
        props.handleClose();
        props.refresh();
    }

    const clear = () => {
        setTitle("");
        setContent("");
        setTag([]);
        setSubmit(false);
    }


    return (
        <div>
            <Dialog
                fullWidth={true}
                fullScreen={true}
                open={props.isOpen} onClose={() => {
                props.handleClose();
            }}>
                <DialogTitle>Add Notes</DialogTitle>
                <DialogContent>
                    <form>
                        <FormControl className={classes.formControl}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="title"
                                label="Title"
                                type="text"
                                helperText={submit && !content ? "Title is required." : ""}
                                fullWidth
                                inputProps={{ maxLength: 20 }}
                                value={title}
                                error={submit && !title}
                                onChange={(event) => {
                                    handleChange(event, 'Title');
                                }}
                                variant="standard"
                                required={true}
                            />
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <TextField
                                margin="normal"
                                id="content"
                                label="Content"
                                type="text"
                                helperText={submit && !content ? "Content is required." : ""}
                                fullWidth
                                variant="standard"
                                inputProps={{ maxLength: 500 }}
                                multiline
                                value={content}
                                onChange={(event) => {
                                    handleChange(event, 'Content');
                                }}
                                error={submit && !content}
                                minRows={4}
                                required={true}
                            />
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <label className={classes.label} id="aria-label" htmlFor="aria-example-input">
                                Tags
                            </label>
                            <CreatableSelect
                                isMulti
                                onChange={_handleChange}
                                options={existingTags}
                            />
                        </FormControl>


                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        props.handleClose();
                    }}>Cancel</Button>
                    <Button onClick={() => {
                        setSubmit(true);
                        addTodo();
                    }}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
