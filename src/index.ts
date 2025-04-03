import app from "./app";

if (!process.env.PORT || !process.env.HOST) {
  throw new Error(
    `[${new Date().toString()}] error: Invalid environment variable/s`
  );
}

const PORT = parseInt(process.env.PORT);
const HOST = process.env.HOST;

app.listen(PORT, HOST, () => {
  console.log(`[${new Date().toString()}] connected: http://${HOST}:${PORT}`);
});
