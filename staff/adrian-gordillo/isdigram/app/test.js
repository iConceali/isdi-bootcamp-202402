describe("insertOne", () => {
  it("should inserts a document at the end of the original document", (done) => {
    fs.writeFile(
      "./data/cars.json",
      '[{"brand":"porsche","model":"911"},{"brand":"fiat","model":"500"}]',
      (error) => {
        if (error) {
          console.error(error);

          return;
        }

        const cars = new Collection("cars");

        const docuObject = JSON.parse(
          '{"brand":"lamborghini","model":"huracan"}'
        );

        cars.insertOne(docuObject, (error) => {
          if (error) {
            console.error(error);

            return;
          }
          cars._loadDocuments((error, documents) => {
            if (error) {
              console.error(error);

              return;
            }

            // console.log(documents);
            expect(error).to.be.null;

            expect(documents).to.be.instanceOf(Array);

            expect(documents.length).to.equal(3);
            expect(documents[2].brand).to.equal("lamborghini");
            expect(documents[2].model).to.equal("huracan");
          });

          done();
        });
      }
    );
  });
});
