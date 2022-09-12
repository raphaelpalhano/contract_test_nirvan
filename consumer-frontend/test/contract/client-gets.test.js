"use strict"

const { expect } = require('chai')
const { Matchers } = require("@pact-foundation/pact")

const { getClient, postClient } = require("../../src/consumer")



describe('API Pact test - Integration between \'clients-service\' and \'frontend\'', () => {
  describe("POST /clients", () => {
    const POST_BODY = {
      firstName: "Raphael Angel",
      lastName: "Palhano",
      age: 29
    }

    const POST_EXPECTED_BODY = {
      firstName: POST_BODY.firstName,
      lastName: POST_BODY.lastName,
      age: POST_BODY.age,
      id: 4
    }


    beforeEach (async () => {
        await mockProvider.addInteraction({
          state: "i create a new client",
          uponReceiving: "a request to create client with firstname and lastname",
          withRequest: {
              method: "POST",
              path: "/clients",
              headers: {
                  "Content-Type": "application/json"
              },
              body: POST_BODY,
          },
          willRespondWith: {
              status: 200,
              body: Matchers.like(POST_EXPECTED_BODY).contents,
          },
        })
      })

    it("returns correct body, header and statusCode", async () => {
        const response = await postClient(POST_BODY)
        console.log(response.data)
        expect(response.data.id).to.equal(4)
        expect(response.status).to.equal(200)
      })
  })

})
