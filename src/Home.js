import React from 'react';
import Airtable from './Airtable';
import { P } from './widgets';
import processDiagram from './assets/SUDI-Workflow.svg';

export default () => (
  <>
    <img
      src={processDiagram}
      alt="SUDO Workflow Diagram"
      style={{ marginBottom: '1em', maxHeight: '300px' }}
    />
    <P>
      Hello! This site demonstrates workflows for running Revere's overdose
      response. It uses Firebase
      to store and organize data. Click on a section above to start.
    </P>
    <P>
      Hosted on{' '}
      <a href="https://github.com/alexjball/harm-reduction-frontend">Github</a>.
    </P>
  </>
);
