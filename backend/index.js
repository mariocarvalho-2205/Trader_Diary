const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const mongoose = require("./db/conn");

app.use(
	express.urlencoded({
		extended: true,
	})
);

// Config JSON response
app.use(express.json());

// Solve CORS - libera a porta para trabalhar com frontend e backend
app.use(
	cors({
		credentials: true,
		origin: "http://localhost:5173",
	})
);

// Public folder for images
app.use(express.static("public"));

// Routes
const router = require("./routes/Routes");
app.use(router);

app.listen(port, () => {
	console.log(`Conectou supabase na porta ${port}`);
});
