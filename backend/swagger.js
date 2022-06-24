const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./dist/routes/todos.js"];

swaggerAutogen(outputFile, endpointsFiles);
