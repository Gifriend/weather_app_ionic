import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonSpinner,
} from '@ionic/react';
import WeatherService from '../services/WeatherService';
import LocationService from '../services/LocationService';
import './Tab1.css';

interface WeatherData {
  weather: { id: number, description: string }[];
  main: { temp: number };
  name: string;
}

const Tab1: React.FC = () => {
  const [cityName, setCityName] = useState<string>(''); 
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>(undefined); 
  const [locationWeather, setLocationWeather] = useState<WeatherData | undefined>(undefined); 
  const [loading, setLoading] = useState<boolean>(false); 

  useEffect(() => {
    getLocationWeather(); 
  }, []);

  const getLocationWeather = async () => {
    setLoading(true);
    const location = await LocationService.getCurrentLocation();
    if (location) {
      const weather = await WeatherService.getLocationWeather(location.latitude, location.longitude);
      setLocationWeather(weather);
    }
    setLoading(false);
  };

  const getCityWeather = async () => {
    if (cityName) {
      setLoading(true);
      const weather = await WeatherService.getCityWeather(cityName);
      setWeatherData(weather);
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader className="custom-header">
        <IonToolbar>
          <IonTitle className="custom-title">Weather App</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="custom-background">
        <IonGrid>
          <IonRow className="ion-justify-content-center ion-margin-top">
            <IonCol size="12" sizeMd="8" sizeLg="6">
              <IonInput
                className="custom-input"
                value={cityName}
                placeholder="Enter city name"
                onIonChange={(e) => setCityName(e.detail.value!)}
              />
              <IonButton
                expand="block"
                className="custom-button"
                onClick={getCityWeather}
              >
                Get City Weather
              </IonButton>
            </IonCol>
          </IonRow>

          {loading && (
            <IonRow className="ion-justify-content-center ion-padding">
              <IonSpinner name="crescent" />
            </IonRow>
          )}

          {weatherData && (
            <IonRow className="ion-justify-content-center ion-margin-top fade-in">
              <IonCol size="12" sizeMd="8" sizeLg="6">
                <IonCard className="custom-card">
                  <IonCardHeader>
                    <h2>{weatherData.name}</h2>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>
                      {WeatherService.getWeatherIcon(weatherData.weather[0].id)}{' '}
                      {weatherData.weather[0].description}
                    </p>
                    <p>{weatherData.main.temp}°C</p>
                    <p>{WeatherService.getMessage(weatherData.main.temp)}</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          )}

          {locationWeather && (
            <IonRow className="ion-justify-content-center ion-margin-top fade-in">
              <IonCol size="12" sizeMd="8" sizeLg="6">
                <IonCard className="custom-card">
                  <IonCardHeader>
                    <h2>{locationWeather.name}'s Weather</h2>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>
                      {WeatherService.getWeatherIcon(locationWeather.weather[0].id)}{' '}
                      {locationWeather.weather[0].description}
                    </p>
                    <p>{locationWeather.main.temp}°C</p>
                    <p>{WeatherService.getMessage(locationWeather.main.temp)}</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          )}

          <IonRow className="ion-justify-content-center ion-margin-top">
            <IonCol size="12" sizeMd="8" sizeLg="6">
              <IonButton
                expand="block"
                className="custom-button"
                onClick={getLocationWeather}
              >
                Get Location Weather
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
