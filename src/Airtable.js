import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';

const embed = config => ({
  backgroundColor = 'gray',
  useCardLayout = config.useCardLayout,
  viewControls = true,
  showRefresh = config.showRefresh,
  style,
  label = config.label,
  ...props
}) => {
  const ref = useRef(null);
  return (
    <div>
      <div
        style={{ background: '#666', display: 'flex', alignItems: 'center' }}
      >
        <div style={{ marginLeft: '10px', fontSize: '20px', color: 'white' }}>
          {label}
        </div>
        {showRefresh && (
          <Button
            variant="light"
            style={{ margin: '10px' }}
            onClick={() => (ref.current.src += '')}
          >
            Refresh Table
          </Button>
        )}
      </div>
      <iframe
        ref={ref}
        title="Base"
        className="airtable-embed"
        src={`${config.src}?backgroundColor=${backgroundColor}${
          useCardLayout ? '&layout=card' : ''
        }${viewControls ? '&viewControls=on' : ''}`}
        frameBorder="0"
        width="100%"
        height="533"
        style={{
          background: 'transparent',
          border: '1px solid #666',
          marginBottom: '50px',
          ...style,
        }}
        {...props}
      />
    </div>
  );
};

export default {
  Base: embed({
    src: 'https://airtable.com/embed/shrmD4T1dU1VdykBo',
    showRefresh: true,
    label: 'All Data',
  }),
  RecordParticipantForm: embed({
    src: 'https://airtable.com/embed/shrFwOTOVDGbQDmMP',
  }),
  RecordIncidentForm: embed({
    src: 'https://airtable.com/embed/shrvsr3brVYusYc8R',
  }),
  RecordEngagementForm: embed({
    src: 'https://airtable.com/embed/shrE7xnBvZHXOftfp',
  }),
  OutstandingIncidents: embed({
    src:
      'https://airtable.com/embed/shrmD4T1dU1VdykBo/tblF0kMWjd3oHFjTu/viwJtGVG6IBJuA9En',
    showRefresh: true,
    useCardLayout: true,
    label: 'Outstanding Incidents',
  }),
  Participants: embed({
    src:
      'https://airtable.com/embed/shrmD4T1dU1VdykBo/tblFZsc8OLXZO9lNu/viwIW0zZjhtYz9bCS',
    showRefresh: true,
    useCardLayout: true,
    label: 'All Participants',
  }),
  EngagementsByParticipants: embed({
    src:
      'https://airtable.com/embed/shrmD4T1dU1VdykBo/tblPYtZuRPJaOEywQ/viw3Ijwo7QoWXHiyH',
    showRefresh: true,
    label: 'Engagements by Participant',
  }),
};
