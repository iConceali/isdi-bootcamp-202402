import { MongoClient, ObjectId } from "mongodb";

let client, users, posts;

client = new MongoClient("mongodb://localhost:27017");

client
  .connect()
  .then((connection) => {
    const db = connection.db("isdigram");

    users = db.collection("users");
    posts = db.collection("posts");

    users
      .deleteMany({})
      .then(() => {
        posts
          .deleteMany({})
          .then(() => {
            users
              .insertOne({
                name: "Pepe Roni",
                birthdate: "2000-01-01",
                email: "pepe@roni.com",
                username: "peperoni",
                password: "123qwe123",
              })
              .then((result) => {
                let count = 1;

                const insertedPost1 = {
                  author: result.insertedId,
                  image: `https://fakeimg.pl/500x400/ff0000?text=Hello+${count}&font=lobster`,
                  text: `hello post ${count}`,
                  date: new Date(),
                };

                posts
                  .insertOne(insertedPost1)
                  .then(() => {
                    count++;

                    const insertedPost2 = {
                      author: result.insertedId,
                      image: `https://fakeimg.pl/500x400/ff0000?text=Hello+${count}&font=lobster`,
                      text: `hello post ${count}`,
                      date: new Date(),
                    };

                    posts
                      .insertOne(insertedPost2)
                      .then(() => {
                        count++;

                        const insertedPost3 = {
                          author: result.insertedId,
                          image: `https://fakeimg.pl/500x400/ff0000?text=Hello+${count}&font=lobster`,
                          text: `hello post ${count}`,
                          date: new Date(),
                        };

                        posts
                          .insertOne(insertedPost3)
                          .then(() => {
                            connection
                              .close()
                              .then(() => console.log("populated"))
                              .catch(console.error);
                          })
                          .catch(console.error);
                      })
                      .catch(console.error);
                  })
                  .catch(console.error);
              })
              .catch(console.error);
          })
          .catch(console.error);
      })
      .catch(console.error);
  })
  .catch(console.error);
