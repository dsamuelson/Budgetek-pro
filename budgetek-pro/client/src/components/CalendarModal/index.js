import React from "react";
import { useDispatch } from "react-redux";

function CalendarModal(props) {
    const dispatch = useDispatch()
    let valSplit = [];
    if (props) {
        valSplit = props.tileContent[1].split('\n')
    }
        

    return (
        <div className="calModal">    
            <p onClick={() => {dispatch({type: "TOGGLE_CALCONT_MODAL", calcontVal: false})}} className="calContx">x</p>
            <h2>{new Date(props.tileContent[0]).toDateString()}</h2>
            <ul>
                {valSplit.length && valSplit.map((textFound, i) => {
                    return (
                        <li key={i}>{textFound}</li>
                    )
                })}
            </ul>
           
        </div>
    )
}

export default CalendarModal;