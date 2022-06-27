import React from 'react';
import {solveCurrencySymbol} from "../utils";

const Odds = ({data, id}) => {

    return (
        data['name'] === 'Match Odds' ?
            <div className='odds3Container' key={`card-internal-text-div-odds-${id}`}>
                {
                    data['runners'].map((runner, rindex) =>
                        <>
                            <div style={{gridColumnStart: `${rindex === 0 ? 1 : rindex === 1 ? 3 : 2}`, gridRowStart: 1, alignSelf: 'center'}} key={`${id}-runner-${rindex}`}>
                                {
                                    rindex === 0 ?
                                        'Home'
                                    :
                                        rindex === 1 ?
                                            'Away'
                                        :
                                            'Draw'
                                }
                            </div>
                            {
                                runner['prices'].map((price, pindex) =>
                                    <div style={{gridRowStart: `${pindex + 2}`, gridColumnStart: `${rindex === 0 ? 1 : rindex === 1 ? 3 : 2}`}} className='withBorder' key={`${id}-div-${rindex}-${pindex}`}>
                                        <span key={`${id}-price-${rindex}-${pindex}`}>
                                            {
                                                price['decimal-odds']
                                            }
                                        </span>
                                        <br key={`${id}-br-${rindex}-${pindex}`}/>
                                        <span key={`${id}-amount-${rindex}-${pindex}`}>
                                            {
                                                `${solveCurrencySymbol(price['currency'])} ${Math.floor(price['available-amount'])}`
                                            }
                                        </span>
                                    </div>
                                )
                            }
                        </>
                    )
                }
            </div>
        :
            data['name'] === 'Moneyline' ?
                <div className='odds2Container' key={`card-internal-text-div-odds-${id}`}>
                {
                    data['runners'].map((runner, rindex) =>
                        <>
                            <div style={{gridColumnStart: `${rindex + 1}`, gridRowStart: 1, alignSelf: 'center'}} key={`${id}-runner-${rindex}`}>
                                {runner['name']}
                            </div>
                            {
                                runner['prices'].map((price, pindex) =>
                                    <div style={{gridRowStart: `${pindex + 2}`, gridColumnStart: `${rindex + 1}`}} className='withBorder' key={`${id}-div-${rindex}-${pindex}`}>
                                        <span key={`${id}-price-${rindex}-${pindex}`}>
                                            {
                                                price['decimal-odds']
                                            }
                                        </span>
                                        <br key={`${id}-br-${rindex}-${pindex}`}/>
                                        <span key={`${id}-amount-${rindex}-${pindex}`}>
                                        {
                                            `${solveCurrencySymbol(price['currency'])} ${Math.floor(price['available-amount'])}`
                                        }
                                        </span>
                                    </div>
                                )
                            }
                        </>
                    )
                }
                </div>
            :
                data['name'] === 'WIN' || data['name'] === 'Winner' ?
                    <div className='oddsTableContainer' key={`card-internal-text-div-odds-${id}`}>
                        {
                            data['runners'].map((runner, rindex) =>
                                <>
                                    <div style={{gridColumnStart: 1, gridRowStart: `${rindex + 1}`, alignSelf: 'center', justifySelf: 'end'}} key={`${id}-runner-${rindex}`} className='bottomBorder'>
                                        {runner['name']}
                                    </div>
                                    {
                                        runner['prices'].length > 1 ?
                                            runner['prices'].filter(price => price['side'] === 'back').map((price, pindex) =>
                                                <div style={{gridRowStart: `${rindex + 1}`, gridColumnStart: 2}} className='withBorder' key={`${id}-div-${rindex}-${pindex}`}>
                                                <span key={`${id}-price-${rindex}-${pindex}`}>
                                                    {
                                                        price && price['decimal-odds']
                                                    }
                                                </span>
                                                <br key={`${id}-br-${rindex}-${pindex}`}/>
                                                <span key={`${id}-amount-${rindex}-${pindex}`}>
                                                {
                                                    `${price && solveCurrencySymbol(price['currency'])} ${price && Math.floor(price['available-amount'])}`
                                                }
                                                </span>
                                            </div>
                                        )
                                            :
                                        runner['prices'].map((price, pindex) =>
                                            <div style={{gridRowStart: `${rindex + 1}`, gridColumnStart: 2}} className='withBorder' key={`${id}-div-${rindex}-${pindex}`}>
                                                <span key={`${id}-price-${rindex}-${pindex}`}>
                                                    {
                                                        price && price['decimal-odds']
                                                    }
                                                </span>
                                                <br key={`${id}-br-${rindex}-${pindex}`}/>
                                                <span key={`${id}-amount-${rindex}-${pindex}`}>
                                                {
                                                    `${price && solveCurrencySymbol(price['currency'])} ${price && Math.floor(price['available-amount'])}`
                                                }
                                                </span>
                                            </div>
                                        )
                                    }
                                </>
                            )
                        }
                    </div>
                    :
                    <></>
    )

};

export default Odds