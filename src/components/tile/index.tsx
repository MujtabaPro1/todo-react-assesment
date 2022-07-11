import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';


export default function Tile(props: {
    index: number,
    label: string,
}) {
    return <Chip
        avatar={<Avatar>#</Avatar>} label={props.label}/>;
}
