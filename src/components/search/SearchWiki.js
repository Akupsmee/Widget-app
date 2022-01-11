import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const SearchWiki = () => {
    const [term, setTerm] = useState("Programming");
    const [debouncedTerm, setDebouncedTerm] = useState(term)
    const [results, setResults] = useState([]);

    // call url to search item
    // useCallback function waas used here because I fetched the data outside useEffect function and therefore I required a dependency that will cause an infinite loop on the useEffect function. useCallback solves the issue of implementing a function outside of useEffect.

    const wikiSearch = useCallback(async () => {
        const {
            data: { query },
        } = await axios.get("https://en.wikipedia.org/w/api.php", {
            params: {
                action: "query",
                list: "search",
                origin: "*",
                format: "json",
                // srsearch: term   
                srsearch: debouncedTerm,
            },
        });
        const response = await query.search;
        setResults(response);

        // also the useCallback dependency was also changed from "term" to "debouncedTerm".
    }, [debouncedTerm]);

    // walk around in other to make sure result.length is not added to intial useEffect hook as commented out below on line 46

    useEffect(() => {
        if (debouncedTerm) {
            wikiSearch()
        }
        const timerid = setTimeout(() => {
            setDebouncedTerm(term);
        }, 1000)

        /* "cleanup "function gets returned after the useEffect is called , but does not get rendered.
        when useEffect function is again re-renderded the "cleanup"function is first of all called before the useffect function is re-rendered
        */
        return () => {
            clearTimeout(timerid)
        }
    }, [term, debouncedTerm, wikiSearch])

    // useEffect(() => {
    //     if (debouncedTerm) {
    //         wikiSearch()
    //     }
    // }, [debouncedTerm, wikiSearch])


    // useEffect(() => {
    //     if (term && !results.length) {
    //         wikiSearch()
    //     } else {
    //          const timeoutId = setTimeout(() => {
    //             if (term) {
    //                 wikiSearch()
    //             }
    //         }, 500)
    //         /* "cleanup "function gets returned after the useEffect is called , but does not get rendered
    //             when useEffect function is again re-renderded the "cleanup" function is first of all called before the useffect function is re-rendered
    //         */
    //         return () => {
    //             clearTimeout(timeoutId)
    //         }

    //     }

    // }, [term, wikiSearch]);

    const renderedResults = results.map((result) => {
        const { title, snippet, pageid } = result;

        return (
            <div key={pageid} className="item">
                <div className="right floated content" >
                    <a style={{ backgroundColor: "#eae6eb" }} className="ui button" href={`https://en.wikipedia.org?curid=${pageid}`}>Go</a>
                </div>
                <div className="content">
                    <div className="header" style={{ color: "#eae6eb" }}>{title}</div>
                    <span dangerouslySetInnerHTML={{ __html: snippet }}></span>
                </div>
            </div>
        );
    });

    return (
        <div style={{ color: "black", margin: "20px 20px 0px 20px" }}>
            <div className="ui form" >
                <div className="field">
                    <label style={{ color: "#eae6eb" }}>Enter Search Term</label>
                    <input style={{ backgroundColor: "#eae6eb" }}
                        name="input"
                        value={term}
                        type="text"
                        className="input"
                        onChange={(e) => {
                            setTerm(e.target.value);
                        }}
                    />
                </div>
            </div>

            <div className="ui celled list">{renderedResults}</div>
        </div>
    );
};

export default SearchWiki;
