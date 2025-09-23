import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Bootstrap és komponenseinek importálása
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// --- Komponensek Definíciója ---

// 1. Menü Komponens
function Menu() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/">React Minta</Navbar.Brand>
        <Navbar.Toggle aria-controls="menu" />
        <Navbar.Collapse id="menu">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Főoldal</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/leiras">
              <Nav.Link>Leírás</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/regisztracio">
              <Nav.Link>Regisztráció</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// 2. Főoldal Komponens
function FoOldal() {
  return (
    <div>
      <h1>Üdvözöllek a React Mintában!</h1>
      <p>Ez egy egyszerű mintaalkalmazás, amely bemutatja a React, a React Router és a React Bootstrap alapvető használatát.</p>
      <p>Navigálj a 'Regisztráció' oldalra, hogy kipróbáld a továbbfejlesztett űrlapot validációval és aszinkron adatküldés szimulációval.</p>
    </div>
  );
}

// 3. Leírás Komponens
function Leiras() {
  return (
    <div>
      <h1>Az Alkalmazás Felépítése</h1>
      <p>Ez az alkalmazás bemutatja a React alapjait:</p>
      <ul>
        <li><b>Komponens-alapú felépítés:</b> Az egész UI kis, újrafelhasználható darabokból, komponensekből áll.</li>
        <li><b>Routing:</b> A <code>react-router-dom</code> segítségével valósítjuk meg az egyoldalas alkalmazás (SPA) navigációját.</li>
        <li><b>Bootstrap integráció:</b> A <code>react-bootstrap</code> komponensekkel gyorsan és egyszerűen hozhatunk létre reszponzív felületeket.</li>
        <li><b>Állapotkezelés:</b> A Regisztráció oldalon a <code>useState</code> hook segítségével kezeljük az űrlap adatait és a felhasználói visszajelzéseket.</li>
      </ul>
    </div>
  );
}

// 4. Fejlett Regisztrációs Komponens
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


// --- Fő Alkalmazás "Váz" ---
function Alkalmazas() {
  return (
    <div>
      <Menu />
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<FoOldal />} />
          <Route path="/leiras" element={<Leiras />} />
          <Route path="/regisztracio" element={<Regisztracio />} />
        </Routes>
      </main>
    </div>
  );
}

// --- Alkalmazás Renderelése ---
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Alkalmazas />
    </BrowserRouter>
  </React.StrictMode>
);

