import React from 'react';
import { format } from 'date-fns';
import Odds from "../Odds/Odds";
import {solveCurrencySymbol} from "../utils";

const Event = ({event, currency}) => {

    const displayMarkets = event['markets'][0];

    return (
        <div className='eventCard' key={`card-${event['id']}`}>
            <div className='internalCard' key={`card-internal-${event['id']}`}>
                <div className='cardText' key={`card-internal-text-${event['id']}`}>
                    <div key={`card-internal-text-div-${event['id']}`}>
                        <span key={`card-internal-text-div-name-${event['id']}`} className='cardTitle'>{event['meta-tags'].filter(mTag => mTag['type'] === 'SPORT')[0]['name']}</span>
                        <br />
                        <span key={`card-internal-text-div-competition-${event['id']}`}>{event['meta-tags'].filter(mTag => mTag['type'] === 'COMPETITION')[0]?.name}</span>
                        <hr />
                    </div>
                    <div key={`card-internal-text-div-game-${event['id']}`}>
                        {
                            event['name'].includes(' at ') ?
                                (
                                    <>
                                        <span className='teamName'>{event['name'].split(' at ')[0]}</span>
                                        <br />
                                        <span>at</span>
                                        <br />
                                        <span className='teamName'>{event['name'].split(' at ')[1]}</span>
                                    </>
                                )
                            :
                                event['name'].includes(' vs ') ?
                                    (
                                        <>
                                            <span className='teamName'>{event['name'].split(' vs ')[0]}</span>
                                            <br />
                                            <span>vs</span>
                                            <br />
                                            <span className='teamName'>{event['name'].split(' vs ')[1]}</span>
                                        </>
                                    )
                                :
                                    <span className='teamName'>{event['name']}</span>
                        }
                    </div>
                    <div key={`card-internal-text-div-start-${event['id']}`}>
                        {format(new Date(event['start']), 'Pp')}
                    </div>
                    <div key={`card-internal-text-div-odd-name-${event['id']}`}>
                        <hr />
                        {
                            event['markets'][0] &&
                            event['markets'][0]['name']
                        }
                    </div>
                    {
                        displayMarkets &&
                        <Odds data={displayMarkets} id={event['id']} key={`event-odds-${event['id']}`}/>
                    }
                    <div key={`card-internal-text-div-volume-${event['id']}`}>
                        Volume: {`${Math.floor(event['volume'])} ${solveCurrencySymbol(currency)}`}
                    </div>
                </div>
            </div>
        </div>
    )

};

export default Event