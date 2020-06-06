import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks'; 
import { GET_EVENTS_QUERY } from './ListaEventos';
import { useForm } from '../../util/hooks';

import { Form, Segment, Button } from 'semantic-ui-react';
import Header from '../Header';

import { FormattedMessage } from 'react-intl';

function NuevoEvento(props) {
  const { values, onChange, onSubmit } = useForm(createEventCallback, {
    name: '',
    description: '',
    location: '',
    date: ''
  });

  const [createEvent, { loading }] = useMutation(CREAR_EVENTO, {
    update(proxy, {data: { crear_evento }}) {
      const data = proxy.readQuery({
        query: GET_EVENTS_QUERY
      });
      data.ver_eventos = [crear_evento, ...data.ver_eventos];
      proxy.writeQuery({ query: GET_EVENTS_QUERY, data });
      
      props.history.push('/eventos');
    },
    onError(err) {
      alert(JSON.stringify(err));
    },
    variables: {eventInput: values }
  })

  function createEventCallback() {
    createEvent();
  }

  return (
    <Segment raised padded attached color="teal" className="fh">
      <Header titulo="events.new" icono="group" />
      <Form 
        loading={loading}
        onSubmit={onSubmit}
        className="event-form"
      >
        <div className="required field">
          <label>
            <FormattedMessage id="new-event.name" />
          </label>
          <input
            type="text"
            name="name" 
            value={values.name}
            onChange={onChange}
            required />
        </div>
        <div className="required field">
          <label>
            <FormattedMessage id="new-event.description" />
          </label>
          <textarea
            type="text" 
            name="description" 
            value={values.description}
            onChange={onChange}
            rows={2}
            required />
        </div>
        <div className="required field">
          <label>
            <FormattedMessage id="new-event.date" />
          </label>
          <input
            type="date"
            name="date"
            value={values.date}
            onChange={onChange}
            required />
        </div>
        <div className="required field">
          <label>
            <FormattedMessage id="new-event.location" />
          </label>
          <input
            type="text"
            name="location"
            value={values.location}
            onChange={onChange}
            required />
        </div>
        <Segment basic textAlign="center">
          <Button type="submit" color="teal" >
            <FormattedMessage id='new-event.create' />
          </Button>
          <Button as={Link} to="/eventos" replace>
            <FormattedMessage id='go-back' />
          </Button>
        </Segment>
      </Form>
    </Segment>
  );
}

const CREAR_EVENTO = gql`
  mutation crear_evento( $eventInput: EventInput! ) 
  {
    crear_evento(eventInput: $eventInput)
    {
      id
      name
      description
      location
      date
    }
  }
`;

export default React.memo(withRouter(NuevoEvento));