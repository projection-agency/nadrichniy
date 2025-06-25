function debounce(func: (...args: any[]) => void, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(timeoutId); // якщо викликається повторно — скидаємо таймер
    timeoutId = setTimeout(() => {
      func(...args); // виконуємо після паузи
    }, delay);
  };
}

export default debounce;