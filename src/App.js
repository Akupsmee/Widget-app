import React, { useState } from "react";
import Accordion from "./components/accordion/Accordion";
import Search from "./components/search/SearchWiki";
import Dropdown from "./components/dropdown/Dropdown";
import data from "./components/dropdown/data";
import Translate from "./components/translate/Translate";
import Routes from "./components/link-routes/Routes";
import Header from "./components/Header";


function App() {
  const [selected, setSelected] = useState(data.items[0]);
  const [showDrodown, setShowDropdown] = useState(true);

  // const showAccordion = () => {
  //   if (window.location.pathname === "/") {
  //     return <Accordion />;
  //   }
  // }

  return (
    <>
      <Header />
      <Routes path="/" children={<Accordion />} />
      <Routes path="/search" children={<Search />} />
      <Routes path="/translate" children={<Translate />} />
      <Routes path="/dropdown" children={
        <>
          <button
            style={{
              margin: "10px 0 0 10px",
              padding: "10px 5px",
              border: "2px solid #eae6eb",
              borderRadius: "5px",
              backgroundColor: "#617D98",
              color: "#eae6eb",
            }}
            onClick={() => setShowDropdown(!showDrodown)}
          >
            Toggle Dropdown
          </button>
          {showDrodown && (
            <Dropdown
              selected={selected}
              options={data}
              onSelectedChange={setSelected}
            />
          )}
        </>
      } />
    </>
  );
}

export default App;
