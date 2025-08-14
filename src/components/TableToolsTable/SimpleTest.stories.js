import React from 'react';

export default {
  title: 'TableToolsTable/Simple Test',
  parameters: {
    layout: 'padded',
  },
};

// Simple test without any complex components
export const SimpleTest = {
  render: () => (
    <div>
      <h3>Simple Test</h3>
      <p>This is a simple test story to verify Storybook is working.</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
