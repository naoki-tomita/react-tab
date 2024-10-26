import React, { FC, Children, cloneElement, ReactElement } from "react";
import { createRoot } from "react-dom/client";

const TabGroup: FC<{ children: React.ReactNode }> = ({ children }) => {
  let tabListElement: ReactElement;
  let tabPanelsElement: ReactElement;
  const [activeTabIndex, setActiveTabIndex] = React.useState<number>(0);

  Children.forEach(children, (child) => {
    const el: any = child;

    if (el.type === TabList) {
      tabListElement = cloneElement(
        child as React.ReactElement,
        { onClick: (index: number) => setActiveTabIndex(index) }
      );
    } else if (el.type === TabPanels) {
      tabPanelsElement = cloneElement(
        child as React.ReactElement,
        { activeTabIndex: activeTabIndex }
      );
    }
  });

  return (
    <div>
      {tabListElement!}
      {tabPanelsElement!}
    </div>
  )
}

type TabProps = {
  children: React.ReactNode;
  onClick: () => void;
}
const Tab: FC<{ children: React.ReactNode }> = (props) => {
  const { children, onClick } = props as TabProps;
  return (
    <a onClick={onClick}>{children}</a>
  );
}

type TabListProps = {
  children: React.ReactNode;
  onClick: (index: number) => void;
}
const TabList: FC<{ children: React.ReactNode }> = (props) => {
  const { children, onClick } = props as TabListProps;
  return (
    <nav>
      {Children.toArray(children)
        .filter((child) => (child as any).type === Tab)
        .map((child, index) =>
          cloneElement(
            child as React.ReactElement,
            { onClick: () => onClick(index) }
          )
        )}
    </nav>
  );
}

const TabPanel: FC<{ children: React.ReactNode }> = ({ children }) => {
  return children;
}

type TabPanelsProps = {
  children: React.ReactNode;
  activeTabIndex: number;
}
const TabPanels: FC<{ children: React.ReactNode }> = (props) => {
  const { children, activeTabIndex } = props as TabPanelsProps;
  const tabPanel = Children.toArray(children)
    .filter(it => (it as any).type === TabPanel)[activeTabIndex];
  return (
    <section>{tabPanel}</section>
  );
}

const App = () => {
  return (
    <TabGroup>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          Tab 1 content
        </TabPanel>
        <TabPanel>
          Tab 2 content
        </TabPanel>
      </TabPanels>
    </TabGroup>
  )
}

const app = document.getElementById("app")!;
const root = createRoot(app);
root.render(<App />);
