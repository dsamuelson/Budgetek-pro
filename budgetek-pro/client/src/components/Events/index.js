import React from "react";
import Auth from '../../utils/auth';

function EventsList() {
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

                            </ul>
                        </div>
                        <div className="eventsListEULCont">
                            <h4>Expense Events</h4>
                            <ul className="eventsListEUL">

                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
        
    )
}

export default EventsList;