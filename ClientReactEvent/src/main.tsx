import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainMenuComponent } from './components/mainMenu';
import { ProducerMenuComponent } from './components/producer/producerMenu';
import { EventsListForUserComponent } from './components/user/eventsListForUser';
import { AddProducerComponent } from './components/producer/addProducer';
import { CheckProducerComponent } from './components/producer/checkProducer';
import { ProducerProvider } from './context/producer.context';
import { ActivityProvider } from './context/activity.context';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ActivityProvider>
        <ProducerProvider>
          <MainMenuComponent />
          <Routes>
            <Route path='/producer' element={<ProducerMenuComponent />}>
              <Route path='addProducer' element={<AddProducerComponent />} />
              <Route path='checkProducer' element={<CheckProducerComponent />} />
            </Route>
            <Route path='/users' element={<EventsListForUserComponent />} />
          </Routes>
        </ProducerProvider>
      </ActivityProvider>
    </BrowserRouter>
  </StrictMode>,
);
