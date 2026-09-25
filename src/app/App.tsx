import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StorageManager from '@features/storage/StorageManager';
import StorageDisplay from '@shared/components/StorageDisplay';
import './App.css';

// Componente principal de la aplicación
// Define la estructura base con rutas y provee el contexto necesario
// para la gestión de almacenamiento

type UserData = {
  id: string;
  name: string;
  preferences: {
    theme: string;
    language: string;
  };
};

const App: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    id: '',
    name: '',
    preferences: {
      theme: 'light',
      language: 'es'
    }
  });
  const [sessionData, setSessionData] = useState<string>('');
  const [complexData, setComplexData] = useState<{ id: string; data: unknown }[]>([]);

  const handleUserDataChange = (data: UserData) => {
    setUserData(data);
  };

  const handleSessionDataChange = (data: string) => {
    setSessionData(data);
  };

  const handleComplexDataChange = (data: { id: string; data: unknown }[]) => {
    setComplexData(data);
  };

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Gestor de Almacenamiento en Navegador</h1>
        </header>
        <main className="app-main">
          <Routes>
            <Route
              path="/"
              element=
                <StorageManager
                  userData={userData}
                  onUserDataChange={handleUserDataChange}
                  sessionData={sessionData}
                  onSessionDataChange={handleSessionDataChange}
                  complexData={complexData}
                  onComplexDataChange={handleComplexDataChange}
                />
            />
            <Route
              path="/display"
              element=
                <StorageDisplay
                  userData={userData}
                  sessionData={sessionData}
                  complexData={complexData}
                />
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;