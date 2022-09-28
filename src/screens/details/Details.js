import React, { Fragment } from "react";
import Header from "../../common/header/Header";

function Details(props)
{
    console.log(props.id)
    return(
        <Fragment>
            <Header source="detailsPage"/>
        </Fragment>
    );
}

export default Details;