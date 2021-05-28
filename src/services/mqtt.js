var mqtt = require("mqtt");

var options = {
  host: "99126912d2da46e0a3ccbe6ea4b55098.s1.eu.hivemq.cloud",
  port: 8883,
  protocol: "mqtts",
  username: "fiuzadevs",
  password: "Pff03121995",
};

//initialize the MQTT client
var client = mqtt.connect(options);

//setup the callbacks
client.on("connect", function () {
  console.log("Connected");
});

client.on("error", function (error) {
  console.log(error);
});

client.subscribe("testetccexpo/teste");

client.on("message", function (topic, message) {
  //Called each time a message is received
  console.log("Received message:", topic, message.toString());
});

// subscribe to topic 'my/test/topic'
