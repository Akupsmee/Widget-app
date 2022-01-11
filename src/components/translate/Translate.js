import React, { useState } from 'react'
import Dropdown from "../dropdown/Dropdown"
import Convert from './Convert'

const options = {
    title: "Select a Language",
    items: [
        {
            label: 'ar',
            value: 'Afrikaans'
        },
        {
            label: 'en',
            value: 'English'
        },
        {
            label: 'de',
            value: 'German'
        },
        {
            label: 'ig',
            value: 'Igbo'
        }

    ]
}

const Translate = () => {
    const [language, setLanguage] = useState(options.items[0])
    const [text, setText] = useState('Hello dear')

    return (
        <div>
            <div className="ui form" style={{ margin: "30px 10px 0 10px", width: " 350px" }}>
                <h4 style={{ fontSize: "1.5rem" }}>Language Translator</h4>
                <div className="field">
                    <label >Enter Text</label>
                    <input style = {{backgroundColor : "#eae6eb"}}  className="input" type="text" value={text} onChange={(e) => { setText(e.target.value) }} />
                </div>
            </div>
            <Dropdown
                options={options}
                selected={language}
                onSelectedChange={setLanguage} />
            <div style={{ margin: "30px 10px 0 10px" }}>
            <hr  />
                <h3 className="ui header" >Translated Output</h3>
                <Convert language={language} text={text} />

            </div>
        </div>
    )
}

export default Translate
