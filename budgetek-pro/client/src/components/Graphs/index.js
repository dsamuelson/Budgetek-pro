import React from "react";
import Auth from '../../utils/auth';

function GraphsView() {
     const loggedIn = Auth.loggedIn();

    return (
        <div className="graphsViewCont">
            {loggedIn && (
                <div className="graphsViewTitle">
                    <h2>Quick View</h2>
                </div>
            )}
        </div>
    )
}

export default GraphsView;