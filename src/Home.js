import React from 'react';
import Airtable from './Airtable';
import { P } from './widgets';

export default () => (
  <>
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
    <Airtable.Base useCardLayout />
  </>
);
