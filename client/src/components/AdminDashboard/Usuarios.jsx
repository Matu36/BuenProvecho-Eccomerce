import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../Redux/actions";


export default function Usuarios () {

    const dispatch = useDispatch ();
    const users = useSelector (state => state.users)

    useEffect(() => {
        
        dispatch(getUsers({id: 7, email: 'et@hotmail.com'}));
        
        }, []);

    return (
        <Box>
            {users.map(el => <p>{el.email}</p>)}
        </Box>

    )
}