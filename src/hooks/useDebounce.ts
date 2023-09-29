import { useState, useEffect } from 'react';
// Хук useDebounce позволяет "задерживать" обновление значения, что полезно, например, для уменьшения 
// числа запросов при вводе текста в поле поиска.
export function useDebounce(value: any, delay: number) {
  // Состояние, которое будет обновляться с задержкой
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Устанавливаем таймер, который будет вызываться после времени, указанного в delay
    const handler = setTimeout(() => {
      // После истечения задержки обновляем состояние
      setDebouncedValue(value);
    }, delay);

    // Эта функция будет вызвана перед следующим эффектом или при размонтировании компонента
    // Она отменяет таймер, если значение или задержка изменяется
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);  // Эффект будет перезапущен, если value или delay изменится

  return debouncedValue; // Возвращаем значение с задержкой
}
