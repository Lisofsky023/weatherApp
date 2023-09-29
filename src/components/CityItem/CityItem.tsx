// import React from 'react';
// import { City } from '../../services/weatherTypes';

// interface CityItemProps {
//   city: City;
//   onRemove: (name: string) => void;
// }

// const CityItem: React.FC<CityItemProps> = ({ city, onRemove }) => {
//   return (
//     <li className='cities__item' key={city.id}>
//       {city.weatherData && (
//         <div className='cities__item__weather-data'>
//           <div className="cities__name-temp">
//             <p className='cities__item__name'>{city.name}</p>
//             <p className='cities__temp'>{city.weatherData.current.temp_c}°C</p>
//             <img src={city.weatherData.current.condition.icon} alt={city.weatherData.current.condition.text} />
//           </div>
//           <div className="cities__data">
//             {/* <p>{city.weatherData.current.condition.text}</p> */}
//             <p>Влажность: {city.weatherData.current.humidity}%</p>
//             <p>Ветер: {city.weatherData.current.wind_kph} км/ч</p>
//           </div>
//         </div>
//       )}
//       <button className='cities__item__remove-button' onClick={() => onRemove(city.name)}>Delete</button>
//     </li>
//   );
// }
// export default CityItem;

import React, { useEffect, useState } from 'react';
import { City } from '../../services/weatherTypes';
import { useSwipeable } from 'react-swipeable';

interface CityItemProps {
  city: City;
  onRemove: (name: string) => void;
}

const CityItem: React.FC<CityItemProps> = ({ city, onRemove }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSwipedLeft, setIsSwipedLeft] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handlers = isMobile ? useSwipeable({
    onSwipedLeft: () => {
        setIsSwipedLeft(true);
        setTimeout(() => {
            onRemove(city.name);
            setIsSwipedLeft(false);
        }, 300);  // задержка соответствует длительности анимации
    },
    trackMouse: true
}) : {};

  return (
    <li className={`cities__item ${isSwipedLeft ? 'swiped-left' : ''}`} key={city.id} {...handlers}>
      {city.weatherData && (
        <div className='cities__item__weather-data'>
          <div className="cities__name-temp">
            <p className='cities__item__name'>{city.name}</p>
            <p className='cities__temp'>{city.weatherData.current.temp_c}°C</p>
            <img src={city.weatherData.current.condition.icon} alt={city.weatherData.current.condition.text} />
          </div>
          <div className="cities__data">
            {/* <p>{city.weatherData.current.condition.text}</p> */}
            <p>Влажность: {city.weatherData.current.humidity}%</p>
            <p>Ветер: {city.weatherData.current.wind_kph} км/ч</p>
          </div>
          {!isMobile ? (
            <button className='cities__item__remove-button' onClick={() => onRemove(city.name)}>Delete</button>
          ) : (
            <img 
              src="/public/swipe.png" 
              alt="Swipe hint"
              className='cities__swipe'
            />
          )}
        </div>
      )}
    </li>
  );
}
export default CityItem;
