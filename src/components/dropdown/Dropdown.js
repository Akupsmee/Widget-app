import React, { useState, useEffect, useRef } from 'react'

const Dropdown = (props) => {
    const [open, setOpen] = useState(false)
    const { options, selected, onSelectedChange } = props
    const items = options.items

    const ref = useRef(null)

    useEffect(() => {
        const onBodyClick = (e) => {
            if (ref.current.contains(e.target)) {
                // if(ref.current !== null && ref.current.contains(e.target)){
                return
            }
            setOpen(false);
        }

        document.body.addEventListener(
            "click", onBodyClick,
            { capture: true }
        )
        return () => {
            document.body.removeEventListener('click', onBodyClick, { capture: true })
        }
    }, []);

    const renderedOptions = items.map(option => {
        if (option.label === selected.label) {
            return null
        }

        return (
            <div
                style={{ color: `${option.color}` }}
                key={option.value}
                className="item"
                onClick={() => onSelectedChange(option)}>
                {option.value}
            </div>
        )
    })

    return (
        <div
            ref={ref}
            className="ui form"
            style={{ margin: "30px 10px 0 10px", maxWidth : "350px" }}>

            <div className="field">

                <label className="label">{options.title}</label>
                <div style = {{backgroundColor : "#eae6eb"}} onClick={() => setOpen(!open)} className={`ui selection dropdown ${open ? 'visible active' : ''}`}>
                    <i className="dropdown icon"></i>
                    <div
                        className="text"
                        style={{ color: `${selected.color}` }}>
                        {selected.value}</div>
                    <div
                        className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderedOptions}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Dropdown
