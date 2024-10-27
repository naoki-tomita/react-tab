import React from "react";
import { createRoot } from "react-dom/client";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "./tab";


const App = () => {
  return (
    <>
    <style>{`
      *[data-active="true"] {
        background: black;
        color: white;
      }
    `}</style>
    <TabGroup>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab 1 content</TabPanel>
        <TabPanel>Tab 2 content</TabPanel>
      </TabPanels>
    </TabGroup>
    </>
  )
}

const app = document.getElementById("app")!;
const root = createRoot(app);
root.render(<App />);
