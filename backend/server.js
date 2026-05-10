const { app, connectDatabase } = require("./app");

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`✓ Server Running on port ${PORT}`);
      console.log("✓ API Endpoints Ready");
    });
  } catch (error) {
    console.error("✗ Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();