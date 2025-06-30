import React from 'react';
import { WiDaySunny, WiNightClear, WiDayCloudy, WiNightCloudy, WiCloud, WiCloudy, WiShowers, WiRain, WiThunderstorm, WiSnow, WiFog } from 'react-icons/wi';

const weatherIcons = {
  '01d': <WiDaySunny />,
  '01n': <WiNightClear />,
  '02d': <WiDayCloudy />,
  '02n': <WiNightCloudy />,
  '03d': <WiCloud />,
  '03n': <WiCloud />,
  '04d': <WiCloudy />,
  '04n': <WiCloudy />,
  '09d': <WiShowers />,
  '09n': <WiShowers />,
  '10d': <WiRain />,
  '10n': <WiRain />,
  '11d': <WiThunderstorm />,
  '11n': <WiThunderstorm />,
  '13d': <WiSnow />,
  '13n': <WiSnow />,
  '50d': <WiFog />,
  '50n': <WiFog />,
};

export default function WeatherIcon({ weather, size = 'text-9xl' }) {
  const icon = weatherIcons[weather.icon] || '❓';
  return (
    <div className={`${size} text-center animate-pulse drop-shadow-lg`}>
      {icon}
    </div>
  );
}