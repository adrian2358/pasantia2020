import React, { useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

export default function MenuBar(props) {
  const [activeItem, setActiveItem] = useState(window.location.pathname);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const unlisten = props.history.listen((location, action) => {
      setActiveItem(location.pathname)
    });

    return () => {
      unlisten();
    }
  }, []);

  return (
    <Menu color='teal'>
      <Menu.Item
        name={(user && user.username) || 'Inicio'}
        active={activeItem === '/'}
        as={Link}
        to='/'
        replace
      />
      { user
        ? <React.Fragment>
            <Menu.Item
              name='CrearEvento'
              active={activeItem === '/crear-evento'}
              as={ Link }
              to='/crear-evento'
              replace
            />
            <Menu.Item
              name='MisEventos'
              active={activeItem === '/mis-eventos'}
              as={ Link }
              to='/mis-eventos'
              replace
            />
            <Menu.Item
              name='VerificarTickets'
              active={activeItem === '/verificar-ticket'}
              as={ Link }
              to='/verificar-ticket'
              replace
            />
            <Menu.Menu position='right'>
              <Menu.Item
                name='cerrar sesion'
                onClick={logout}
              />
            </Menu.Menu>
          </React.Fragment>

        : <Menu.Menu position='right'>
            <Menu.Item
              name='Acceder'
              active={activeItem === '/login'}
              as={ Link }
              to='/login'
              replace
            />
            <Menu.Item
              name='Registrarse'
              active={activeItem === '/register'}
              as={ Link }
              to='/register'
              replace
            />
          </Menu.Menu>
      }
    </Menu>
  )
}