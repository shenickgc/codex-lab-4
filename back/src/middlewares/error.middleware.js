export async function errorMiddleware(context, next) {
  try {
    await next();
  } catch (error) {
    const status = error.status || 500;

    context.response.status = status;
    context.response.body = {
      success: false,
      message: error.message || 'Internal server error'
    };

    if (status >= 500) {
      console.error(error);
    }
  }
}
