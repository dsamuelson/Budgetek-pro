import React, { useState, useEffect, Fragment } from "react";
import Auth from '../../utils/auth';
import { useDispatch } from "react-redux";

function CalendarModal(props) {
    // onBlur={dispatch({type: "TOGGLE_CALCONT_MODAL", calcontVal: false})}
    const dispatch = useDispatch()
    console.log(props)
    let valSplit = [];
    if (props) {
        valSplit = props.tileContent[1].split('\n')
        console.log(valSplit)
    }
        

    return (
        <div className="calModal">    
            <a onClick={() => {dispatch({type: "TOGGLE_CALCONT_MODAL", calcontVal: false})}} className="calContx">x</a>
            <h2>{new Date(props.tileContent[0]).toDateString()}</h2>
            <ul>
                {valSplit.length && valSplit.map((textFound, i) => {
                    console.log(textFound, i)
                    return (
                        <li key={i}>{textFound}</li>
                    )
                })}
            </ul>
           
        </div>
    )
}

export default CalendarModal;