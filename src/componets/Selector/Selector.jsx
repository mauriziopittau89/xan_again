import React from 'react';

const Selector = props => {

    const {list, selected, setSelected, disabled, valueProp, displayProp} = props;

    const handleChange = event => {
        setSelected(
            list.filter(element => element[valueProp] === event.target.value)[0]
        );
    };

    return (
        <div className="select">
            <select
                value={selected && selected[valueProp]}
                onChange={event => handleChange(event)}
                disabled={disabled}
            >
                {
                    list && list.length > 0 &&
                    list.map(element => {
                        return (
                            <option value={element[valueProp]} key={element[valueProp]}>
                                {element[displayProp || valueProp]}
                            </option>
                        )
                    })
                }
            </select>
            <span className="focus"></span>
        </div>
    )
};

export default Selector