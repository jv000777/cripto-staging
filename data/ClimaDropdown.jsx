import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';

const API_KEY = 'hqv6wblsvbgrnvl6zovczn2k619fhzm9ecmgdcnx'; // Reemplazá con tu clave real
const URL = `https://www.meteosource.com/api/v1/free/point?place_id=bahia-blanca&sections=current&language=es&units=metric&key=${API_KEY}`;

function ClimaDropdown() {
  const [clima, setClima] = useState(null);

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        if (data.current) {
          setClima({
            temp: Math.round(data.current.temperature),
            estado: data.current.weather
          });
        } else {
          console.error("Respuesta inesperada:", data);
        }
      })
      .catch(err => console.error("Error al obtener clima:", err));
  }, []);

  return (
    <Dropdown align='end' className='nav-item d-none d-lg-block'>
      <Dropdown.Toggle className='nav-link btn btn-success create-new-button no-caret'>
        <div>
          🌥️ Bahía Blanca — {clima ? `${clima.temp}°C, ${clima.estado}` : 'Cargando...'}
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className='navbar-dropdown preview-list create-new-dropdown-menu'>
        <h6 className='p-2 mb-0'>Projects</h6>
        <Dropdown.Divider />
        <Dropdown.Item href="!#" onClick={evt => evt.preventDefault()} className="preview-item">
          <div className="preview-thumbnail">
            <div className="preview-icon bg-dark rounded-circle">
              <i className="mdi mdi-file-outline text-primary"></i>
            </div>
          </div>
          <div className="preview-item-content">
            <p className="preview-subject mb-1">Ampliar clima</p>
          </div>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="!#" onClick={evt => evt.preventDefault()} className="preview-item">
          <div className="preview-thumbnail">
            <div className="preview-icon bg-dark rounded-circle">
              <i className="mdi mdi-web text-info"></i>
            </div>
          </div>
          <div className="preview-item-content">
            <p className="preview-subject mb-1">Cambiar ciudad</p>
          </div>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="!#" onClick={evt => evt.preventDefault()} className="preview-item">
          <div className="preview-thumbnail">
            <div className="preview-icon bg-dark rounded-circle">
              <i className="mdi mdi-layers text-danger"></i>
            </div>
          </div>
          <div className="preview-item-content">
            <p className="preview-subject mb-1">Últimas alertas</p>
          </div>
        </Dropdown.Item>
        <Dropdown.Divider />
        <p className="p-3 mb-0 text-center">Histórico de precipitaciones</p>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ClimaDropdown;
