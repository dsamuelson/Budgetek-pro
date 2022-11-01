import React, { useState, useEffect } from "react";
import Auth from '../../utils/auth';
import { useDispatch, useSelector } from 'react-redux'
import { from, useQuery } from "@apollo/client";
import { QUERY_INCOMES, QUERY_EXPENSES} from '../../utils/queries'

function GraphsView() {


    return (
        <div className="graphsViewCont">
            <div className="graphsViewTitle">
                <h2>Quick View</h2>
            </div>
            
        </div>
    )
}

export default GraphsView;