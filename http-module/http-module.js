const https = require("https");

https
  .get("https://63f7767d833c7c9c6084bc9b.mockapi.io/shoes", (res) => {
    let data = [];
    const headerDate =
      res.headers && res.headers.date ? res.headers.date : "no response date";
    console.log("Status Code:", res.statusCode);
    console.log("Date in Response header:", headerDate);

    res.on("data", (chunk) => {
      data.push(chunk);
    });

    res.on("end", () => {
      console.log("Response ended: ");
      const shoes = JSON.parse(Buffer.concat(data).toString());

      for (shoe of shoes) {
        console.log(`Got shoe with id: ${shoe.id}, name: ${shoe.name}`);
      }
    });
  })
  .on("error", (err) => {
    console.log("Error: ", err.message);
  });
