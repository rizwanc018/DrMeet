import React from 'react'
import { useLocation } from "react-router-dom";


const CreateAppointment = () => {

    const search = useLocation().search;
    const u = new URLSearchParams(search).get('u');
    const d = new URLSearchParams(search).get('d');
    console.log('u',u);
    console.log('d',d);

    return (
        <div>CreateAppointment</div>
    )
}

export default CreateAppointment