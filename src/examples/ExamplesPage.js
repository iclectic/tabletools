import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  TabTitleText,
  Text,
  TextContent,
  TextVariants,
} from '@patternfly/react-core';

import examples from './constants/examples';

/** @ignore */
export const ExamplesPage = () => {
  const [activeTabKey, setActiveTabKey] = useState(0);
  const handleTabClick = (_event, tabIndex) => {
    setActiveTabKey(tabIndex);
  };

  return (
    <>
      <Tabs activeKey={activeTabKey} onSelect={handleTabClick} role="region">
        {examples.map(({ title, description, Component }, idx) => (
          <Tab
            key={idx}
            eventKey={idx}
            title={<TabTitleText>{title}</TabTitleText>}
          >
            <TextContent
              style={{ background: 'white' }}
              className="pf-v5-u-p-xl"
            >
              <Text component={TextVariants.p}>{description}</Text>
            </TextContent>
            <Component />
          </Tab>
        ))}
      </Tabs>
    </>
  );
};

export default ExamplesPage;
