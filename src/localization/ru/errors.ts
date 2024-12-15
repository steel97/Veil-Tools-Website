export default () => {
  return {
    Error404: {
      Meta: {
        Title: "Veil Tools - Ошибка 404, страница не найдена",
        Description: "Не удалось найти запрашиваемую страницу",
      },
      Description: "404 - Страница не найдена.",
    },
    Error500: {
      Meta: {
        Title: "Veil Tools - Ошибка 500, внутренняя ошибка сервера",
        Description: "Невозможно обработать запрос",
      },
      Description: "500 - Невозможно обработать запрос.",
    },
    ToHome: "Вернуться на главную",
  };
};