"use strict"

const { expect } = require('chai')
const { MatchersV3 } = require("@pact-foundation/pact")

const  API  = require("../../src/consumer").API



describe('API Pact test - Integration between \'clients-service\' and \'frontend\'', () => {
  describe("POST /clients", () => {
    const POST_BODY = {
      firstName: "Raphael Angel",
      lastName: "Palhano",
      age: 29
    }

    const POST_EXPECTED_BODY = {
      firstName: "Raphael Angel",
      lastName: "Palhano",
      age: 29,
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
              body: MatchersV3.like(POST_EXPECTED_BODY),
          },
        })
      })

    it("returns correct body, header and statusCode", async () => {
        await mockProvider.executeTest(async (mockService) => {
          const api = new API(mockService.url)
          const response = await api.postClient(POST_BODY)
          expect(response.data.id).to.equal(4)
          expect(response.status).to.equal(200)
        })
      })
  })

})
