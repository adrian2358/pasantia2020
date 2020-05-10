import React, { useState, useEffect } from 'react';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Segment, Divider, Message, Header, Icon, Card } from 'semantic-ui-react';

import Event from '../components/Event';

function ListaEventos(props) {
  const [mensaje, setMensaje] = useState('');
  const [events, setEvents] = useState([]);
	const {
	    loading,
	    data
	  } = useQuery(GET_EVENTS_QUERY);
  
  useEffect(() => {
    if (data && data.ver_eventos && data.ver_eventos.length > 0)
      setEvents(data.ver_eventos);
  }, [data]);

	return (
		<Segment raised loading={loading}>
			<Divider horizontal>
		    <Header as='h4'>
		      <Icon name='group' />
		      Mis Eventos
		    </Header>
		  </Divider>
      { mensaje && 
        <Message
          positive
          size="small"
          content={mensaje}
          className="event-msg"
          onDismiss={() => setMensaje("")} /> 
      }
      { events.length > 0 &&
        <Card.Group stackable itemsPerRow={2} className="ticket-group" >
          { events.map((event, idx) => <Event key={idx} event={event} />) }
        </Card.Group>
      }
    </Segment>
	);
}

const GET_EVENTS_QUERY = gql`
	{
	  ver_eventos {
      id
      name
      description
      date
      location
	  }
	}
`;

export default React.memo(ListaEventos);