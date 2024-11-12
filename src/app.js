const Hapi = require("@hapi/hapi");

const { loadModel, predict } = require("./inference");

(async () => {
  const model = await loadModel();
  console.log("model loaded!");

  const server = Hapi.server({
    host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    port: 5000,
  });

  //   route method
  server.route({
    method: "POST",
    path: "/predicts",
    handler: async (req) => {
      // get image from user payload
      const { image } = req.payload;
      // do and get prediction result by giving model and image
      const prediction = await predict(model, image);
      //   get prediction result
      const [paper, rock] = prediction;

      if (paper) return { result: "paper" };
      if (rock) return { result: "rock" };
      return { result: "scissors" };
    },
    options: {
      payload: {
        allow: "multipart/form-data",
        multipart: true,
      },
    },
  });

  await server.start();

  console.log(`server running at ${server.info.uri}`);
})();
