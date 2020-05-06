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
      response. It uses{' '}
      <a href="https://airtable.com/tblFZsc8OLXZO9lNu/viwIW0zZjhtYz9bCS">
        Airtable
      </a>{' '}
      to store and organize data. Click on a section above to start.
    </P>
    <P>
      You can browse all data in the tables below. Each tab has several views,
      which you can select by clicking on the arrow in the upper-left corner.
    </P>
    <P>
      Hosted on{' '}
      <a href="https://github.com/alexjball/harm-reduction-frontend">Github</a>.
    </P>
    <Airtable.Base />
  </>
);
