export function notFoundMiddleware(context) {
  context.response.status = 404;
  context.response.body = {
    success: false,
    message: 'Route not found'
  };
}
