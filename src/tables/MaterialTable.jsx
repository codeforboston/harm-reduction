import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';

import AccountBox from '@material-ui/icons/AccountBox';
import Warning from '@material-ui/icons/Warning';
import Chat from '@material-ui/icons/Chat';

import Pageview from '@material-ui/icons/Pageview';
import Edit from '@material-ui/icons/Edit';
import LibraryAdd from '@material-ui/icons/LibraryAdd';

const tableIcons = {
  Participant: forwardRef((props, ref) => <AccountBox {...props} ref={ref} />),
  Incident: forwardRef((props, ref) => <Warning {...props} ref={ref} />),
  Engagement: forwardRef((props, ref) => <Chat {...props} ref={ref} />),
  View: forwardRef((props, ref) => <Pageview {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Add: forwardRef((props, ref) => <LibraryAdd {...props} ref={ref} />),
};

/**
 * format metadata for current table
 */
const convertColumn = ({ name, label, sortable = true, display = true }) => ({
  field: name,
  title: label,
  sorting: sortable,
  hide: !display,
});

export default props => {
  const { columns, rows, collectionName } = props;
  const fields = columns.map(col => convertColumn(col));
  return (
    <MaterialTable
      columns={fields}
      data={rows}
      detailPanel={[
        {
          icon: tableIcons.Incident,
          tooltip: 'Show Incidents',
          render: rowData => (
            <div style={{ fontFamily: 'monospace', color: '#666' }}>
              show incidents here
            </div>
          ),
        },
        {
          icon: tableIcons.Engagement,
          tooltip: 'Show Engagements',
          render: rowData => (
            <div style={{ fontFamily: 'monospace', color: '#666' }}>
              show engagements here
            </div>
          ),
        },
      ]}
      actions={[
        {
          icon: tableIcons.View,
          tooltip: `View ${collectionName}`,
          onClick: (event, rowData) => {
            const url = `/${collectionName}/view/${rowData.id}`;
            window.location.history.push(url);
          },
        },
        {
          icon: tableIcons.Edit,
          tooltip: `Edit ${collectionName}`,
          onClick: (event, rowData) => {
            const url = `/${collectionName}/update/${rowData.id}`;
            window.location.history.push(url);
          },
        },
      ]}
    />
  );
};
