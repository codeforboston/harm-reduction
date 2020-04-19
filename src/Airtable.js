import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';

const embed = config => ({
  backgroundColor = 'gray',
  useCardLayout = config.useCardLayout,
  viewControls = true,
  showRefresh = config.showRefresh,
  style,
  ...props
}) => {
  const ref = useRef(null);

  return (
    <div>
      {showRefresh && (
        <Button
          variant="outline-secondary"
          style={{ margin: '10px' }}
          onClick={() => (ref.current.src += '')}
        >
          Refresh Table
        </Button>
      )}
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
          border: '1px solid #ccc',
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
    useCardLayout: true,
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
  }),
  Participants: embed({
    src:
      'https://airtable.com/embed/shrmD4T1dU1VdykBo/tblFZsc8OLXZO9lNu/viwIW0zZjhtYz9bCS',
    showRefresh: true,
    useCardLayout: true,
  }),
  EngagementsByParticipants: embed({
    src:
      'https://airtable.com/embed/shrmD4T1dU1VdykBo/tblPYtZuRPJaOEywQ/viw3Ijwo7QoWXHiyH',
    showRefresh: true,
  }),
};
