import { useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';

function Regisztracio() {
  const [formData, setFormData] = useState({ nev: '', email: '' });
  const [hibak, setHibak] = useState({});
  const [betolt, setBetolt] = useState(false);
  const [sikeres, setSikeres] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };
  
  const validate = () => {
    const ujHibak = {};
    if (!formData.nev) ujHibak.nev = 'A név megadása kötelező.';
    if (!formData.email) {
      ujHibak.email = 'Az email cím megadása kötelező.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      ujHibak.email = 'Érvénytelen email formátum.';
    }
    return ujHibak;
  };

  const kezeles = async (e) => {
    e.preventDefault();
    setSikeres(false);
    const formHibak = validate();
    if (Object.keys(formHibak).length > 0) {
      setHibak(formHibak);
      return;
    }
    
    setHibak({});
    setBetolt(true);

    await new Promise(resolve => setTimeout(resolve, 2000)); // Szerverhívás szimulálása

    console.log('Elküldött adatok:', formData);
    setBetolt(false);
    setSikeres(true);
    setFormData({ nev: '', email: '' });
  };

  return (
    <div>
      <h1>Regisztráció</h1>
      {sikeres && <Alert variant="success">Sikeres regisztráció! Köszönjük.</Alert>}
      <Form noValidate onSubmit={kezeles}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="nev">Név</Form.Label>
          <Form.Control type="text" id="nev" value={formData.nev} onChange={handleChange} isInvalid={!!hibak.nev} required />
          <Form.Control.Feedback type="invalid">{hibak.nev}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control type="email" id="email" value={formData.email} onChange={handleChange} isInvalid={!!hibak.email} required />
          <Form.Control.Feedback type="invalid">{hibak.email}</Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={betolt}>
          {betolt ? (<><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> Betöltés...</>) : ('Regisztrálok')}
        </Button>
      </Form>
    </div>
  );
}
export default Regisztracio