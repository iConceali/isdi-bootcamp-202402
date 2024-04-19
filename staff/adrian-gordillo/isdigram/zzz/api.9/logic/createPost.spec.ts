import { MongoClient, ObjectId } from "mongodb";
import logic from "./index.ts";
import { expect } from "chai";
import { errors } from "com";

const { CredentialsError, NotFoundError } = errors;

describe("createPost", () => {
  let client, users, posts;

  before((done) => {
    client = new MongoClient("mongodb://localhost:27017");

    client
      .connect()
      .then((connection) => {
        const db = connection.db("test");

        users = db.collection("users");
        posts = db.collection("posts");

        logic.users = users;
        logic.posts = posts;

        done();
      })
      .catch(done);
  });

  it("creates post with image and text from existing user", (done) => {
    users
      .deleteMany()
      .then(() => {
        posts
          .deleteMany()
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
                logic.createPost(
                  result.insertedId.toString(),
                  "http://images.com/whatever",
                  "hello post",
                  (error) => {
                    if (error) {
                      done(error);

                      return;
                    }

                    posts
                      .findOne({})
                      .then((post) => {
                        try {
                          expect(post.author.toString()).to.equal(
                            result.insertedId.toString()
                          );
                          expect(post.image).to.equal(
                            "http://images.com/whatever"
                          );
                          expect(post.text).to.equal("hello post");
                          expect(post.date).to.be.instanceOf(Date);

                          done();
                        } catch (error) {
                          done(error);
                        }
                      })
                      .catch(done);
                  }
                );
              })
              .catch(done);
          })
          .catch(done);
      })
      .catch(done);
  });

  //     it('creates post with image and text from existing user', done => {
  //         db.users.deleteAll(error => {
  //             if (error) {
  //                 done(error)

  //                 return
  //             }

  //             db.posts.deleteAll(error => {
  //                 if (error) {
  //                     done(error)

  //                     return
  //                 }

  //                 db.users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }, (error, insertedUserId) => {
  //                     if (error) {
  //                         done(error)

  //                         return
  //                     }

  //                     const image = 'https://media.giphy.com/media/vVzH2XY3Y0Ar6/giphy.gif?cid=790b7611eaem0fdtnb9jatl3580dhx03g6jyqulb7oxtjp2n&ep=v1_gifs_trending&rid=giphy.gif&ct=g'
  //                     const text = 'am here, am here'

  //                     logic.createPost(insertedUserId, image, text, error => {
  //                         if (error) {
  //                             done(error)

  //                             return
  //                         }

  //                         db.posts.getAll((error, posts) => {
  //                             if (error) {
  //                                 done(error)

  //                                 return
  //                             }

  //                             expect(posts).to.have.lengthOf(1)

  //                             const [post] = posts

  //                             expect(post.author).to.equal(insertedUserId)
  //                             expect(post.image).to.equal(image)
  //                             expect(post.text).to.equal(text)
  //                             expect(post.date).to.be.a('string')

  //                             done()
  //                         })
  //                     })
  //                 })
  //             })
  //         })
  //     })

  // TODO test all methods

  after((done) => {
    client
      .close()
      .then(() => done())
      .catch(done);
  });
});
