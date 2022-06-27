import React, {useState, useEffect} from 'react';
import {getEntities, getEvents} from './componets/utils';
import {isBefore} from "date-fns";

import './App.css';
import Selector from "./componets/Selector/Selector";
import Event from "./componets/Event/Event";

function App() {

    const [events, setEvents] = useState(undefined);
    const [currencies, setCurrencies] = useState(undefined);
    const [location, setLocation] = useState(undefined);
    const [navigation, setNavigation] = useState(undefined);

    const [selectedCurrency, setSelectedCurrency] = useState(undefined);
    const [sportList, setSportList] = useState(undefined);
    const [sport, setSport] = useState({'url-name': '', name: 'All Sports'});
    const [countries, setCountries] = useState(undefined);
    const [country, setCountry] = useState({'url-name': '', name: 'All Countries'});
    const [competitionsList, setCompetitionsList] = useState(undefined);
    const [competition, setCompetition] = useState({'url-name': '', name: 'All Competitions'});
    const [order, setOrder] = useState({value: 'time', label: 'Start Time'});
    const [ordered, setOrdered] = useState([]);

    const getInfos = () => {
        return Promise.all([getEntities('currencies'), getEntities('countries'), getEntities('location'), getEntities('navigation')])
    }

    const orderBy = () => {
        switch (order['value']) {
            case 'time':
                return [...events['events']].sort((a, b) => isBefore(new Date(a['start']), new Date(b['start'])) ? -1 : 1)
            case 'volume':
                return [...events['events']].sort((a, b) => a['volume'] > b['volume'] ? -1 : 1)
            default:
                setOrdered([...events]);
        }
    };

    const populateCompetitionsList = () => {
        const cl = [];
        if (sportList) {
            const tempSportList = sport['url-name'] !== '' ? sportList.filter(sprt => sprt['url-name'] === sport['url-name']) : [...sportList];
            tempSportList.forEach(sport => {
                sport['meta-tags'].filter(tag => tag['type'] === 'COMPETITION').forEach(tag => {
                    cl.push(tag);
                })
                setCompetitionsList(cl);
            });
        }
    };

    useEffect(() => {
        getInfos().then(([currencies, countries, location, navigation]) => {
            setCurrencies(currencies);
            setLocation(location);
            setNavigation(navigation);

            setSelectedCurrency(
                currencies['currencies'].filter(currency => currency['short-name'] === location['currency'])[0]
            );

            getEvents({currency: `${location['currency']}`}).then(events => {
                setEvents(events);
            });

        });
    }, []);

    useEffect(() => {

        const options = {
            ...(selectedCurrency && {currency: selectedCurrency['short-name']}),
            ...(sport && {sport: sport['url-name']}),
            ...(country && {country: country['url-name']}),
            ...(competition && {comp: competition['url-name']})
        };
        options['currency'] = selectedCurrency ? selectedCurrency['short-name'] : undefined

        selectedCurrency && getEvents(options).then(events => {
            setEvents(events);
        });
    }, [selectedCurrency, sport, country, competition]);

    useEffect(() => {
        navigation && setSportList(navigation.filter(nav => nav['name'] === 'Sport')[0]['meta-tags']);
        navigation && setCountries(navigation.filter(nav => nav['name'] === 'Country')[0]['meta-tags']);
    }, [navigation]);

    useEffect(() => {
        populateCompetitionsList();
    }, [sportList, sport]);

    useEffect(() => {
        events && setOrdered(orderBy());
    }, [events, order]);

    return (
        <div className="App">
            <div className='navBar'>
                <span>Connected from: {location && location['country']}</span>
                <div className='filterInternal'>
                    <span>{'Currency: '}</span>
                    <Selector
                        key='currency-selector'
                        list={currencies ? currencies['currencies'] : []}
                        selected={selectedCurrency}
                        setSelected={setSelectedCurrency}
                        disabled={!Boolean(currencies)}
                        valueProp='short-name'
                        displayProp='long-name'
                    />
                </div>
            </div>
            <div className='filterDiv'>
                <div className='filterInternal'>
                    {
                        sportList &&
                        <Selector
                            key='sport-selector'
                            list={[{'url-name': '', name: 'All Sports'}, ...sportList]}
                            selected={sport}
                            setSelected={setSport}
                            valueProp='url-name'
                            displayProp='name'
                        />
                    }
                    {
                        countries &&
                        <Selector
                            key='country-selector'
                            list={[{'url-name': '', name: 'All Countries'}, ...countries]}
                            selected={country}
                            setSelected={setCountry}
                            loading={!Boolean(countries)}
                            valueProp='name'
                        />
                    }
                    {
                        competitionsList &&
                        <Selector
                            key='competition-selector'
                            list={[{'url-name': '', name: 'All Competitions'}, ...competitionsList]}
                            selected={competition}
                            setSelected={setCompetition}
                            valueProp='url-name'
                            displayProp='name'
                        />
                    }
                </div>
                <div className='filterInternal'>
                    <div className='navBar'>Sort by:</div>
                    <Selector
                        key='order-selector'
                        list={[{value: 'time', label: 'Start Time'}, {value: 'volume', label: 'Volume'}]}
                        selected={order}
                        setSelected={setOrder}
                        loading={false}
                        valueProp='value'
                        displayProp='label'
                    />
                </div>
            </div>
            <div className='cardContainer'>
                {
                    events && ordered &&
                    ordered.map(event =>
                        <Event event={event} key={event['id']} currency={selectedCurrency['short-name']}/>
                    )
                }
            </div>
        </div>
    );
}

export default App;
