import React, { useState, useEffect } from 'react'
import axios from "axios"

const Convert = ({ language, text }) => {
    const [translated, setTranslated] = useState('')
    const [debouncedTerm, setDebouncedTerm] = useState(text)

    useEffect(() => {
        // if (debouncedTerm) {
        //     translateText()

        // }
        const timerid = setTimeout(() => {
            setDebouncedTerm(text);
        }, 500)

        return () => {
            clearTimeout(timerid)
        }

    }, [text])

    useEffect(() => {
        const translateText = async () => {
            const response = await axios.post("https://translation.googleapis.com/language/translate/v2", {}, {
                params: {
                    q: debouncedTerm,
                    source: "en",
                    target: language.label,
                    key: "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM"
                }
            })
            const res = await response.data.data.translations[0].translatedText
            setTranslated(res)
        }

        translateText()

    }, [language, debouncedTerm])


  


    return (
        <div>
            <textarea defaultValue={translated} style={{ borderRadius: "10px", padding: "20px", backgroundColor : "#eae6eb" }} name="" id="" cols="50" rows="10"></textarea>
        </div>
    )
}

export default Convert
