import React, { forwardRef } from 'react';

import {
  AccountBox,
  Warning,
  Chat,
  Pageview,
  Edit,
  LibraryAdd,
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
  More,
  UnfoldMore,
} from '@material-ui/icons';

export const tableIcons = {
  Participant: forwardRef((props, ref) => <AccountBox {...props} ref={ref} />),
  Incident: forwardRef((props, ref) => <Warning {...props} ref={ref} />),
  Engagement: forwardRef((props, ref) => <Chat {...props} ref={ref} />),
  View: forwardRef((props, ref) => <Pageview {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Add: forwardRef((props, ref) => <LibraryAdd {...props} ref={ref} />),
  AddBox: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  Unfold: forwardRef((props, ref) => <UnfoldMore {...props} ref={ref} />),
  More: forwardRef((props, ref) => <More {...props} ref={ref} />),
};
