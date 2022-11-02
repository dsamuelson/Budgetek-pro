import React from "react";
import Auth from '../../utils/auth';

function EventsList(props) {

    const loggedIn = Auth.loggedIn();

    return (
        
        <div className="eventsListCont">
            { loggedIn && (
                <div>
                    <div className="eventsListTitle">
                        <h2>Upcoming Budget Events</h2>
                    </div>
                    <div className="ULCont">
                        <div className="eventsListIULCont">
                            <h4>Income Events</h4>
                            <ul className="eventsListIUL">
                                {props.events.length && props.events.map((ievents) => {
                                    if (ievents.eventClass === 'incomeLI') {
                                        return (
                                            <li 
                                            key = {ievents.doeID}>{ievents.iandeEvent} paying on {new Date(ievents.dateofEvent).toLocaleDateString()} for ${ievents.iandeValue}</li>
                                        )
                                    }
                                })}
                            </ul>
                        </div>
                        <div className="eventsListEULCont">
                            <h4>Expense Events</h4>
                            <ul className="eventsListEUL">
                            {props.events.length && props.events.map((ievents) => {
                                    if (ievents.eventClass === 'expenseLI') {
                                        return (
                                            <li 
                                            key = {ievents.doeID}>{ievents.iandeEvent} due on {new Date(ievents.dateofEvent).toLocaleDateString()} for ${ievents.iandeValue}</li>
                                        )
                                    }
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
        
    )
}

export default EventsList;