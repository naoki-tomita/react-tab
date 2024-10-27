import React, { FC, Children, cloneElement, ReactElement } from "react";

export const TabGroup: FC<{ children: React.ReactNode }> = ({ children }) => {
  let tabListElement: ReactElement;
  let tabPanelsElement: ReactElement;
  const [activeTabIndex, setActiveTabIndex] = React.useState<number>(0);

  Children.forEach(children, (child) => {
    const el: any = child;

    if (el.type === TabList) {
      tabListElement = cloneElement(
        child as React.ReactElement,
        {
          onClick: (index: number) => setActiveTabIndex(index),
          activeTabIndex,
        }
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
  active?: boolean;
}
export const Tab: FC<{ children: React.ReactNode }> = (props) => {
  const { children, onClick, active } = props as TabProps;
  return (
    <a
      onClick={onClick}
      data-active={active}
    >{children}</a>
  );
}

type TabListProps = {
  children: React.ReactNode;
  onClick: (index: number) => void;
  activeTabIndex: number;
}
export const TabList: FC<{ children: React.ReactNode }> = (props) => {
  const { children, onClick, activeTabIndex } = props as TabListProps;
  return (
    <nav>
      {Children.toArray(children)
        .filter((child) => (child as any).type === Tab)
        .map((child, index) =>
          cloneElement(
            child as React.ReactElement,
            {
              onClick: () => onClick(index),
              active: index === activeTabIndex
            }
          )
        )}
    </nav>
  );
}

export const TabPanel: FC<{ children: React.ReactNode }> = ({ children }) => {
  return children;
}

type TabPanelsProps = {
  children: React.ReactNode;
  activeTabIndex: number;
}
export const TabPanels: FC<{ children: React.ReactNode }> = (props) => {
  const { children, activeTabIndex } = props as TabPanelsProps;
  const tabPanel = Children.toArray(children)
    .filter(it => (it as any).type === TabPanel)[activeTabIndex];
  return (
    <section>{tabPanel}</section>
  );
}
