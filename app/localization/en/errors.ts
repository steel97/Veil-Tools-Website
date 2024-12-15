export default () => {
  return {
    Error404: {
      Meta: {
        Title: "Error 404, page not found",
        Description: "Can't find requested page on server",
      },
      Description: "404 - Page not found.",
    },
    Error500: {
      Meta: {
        Title: "Error 500, internal server error",
        Description: "Can't handle request",
      },
      Description: "500 - Can't handle request.",
    },
    ToHome: "To home page",
  };
};