"use strict"

const { expect } = require('chai')
const { Matchers } = require("@pact-foundation/pact")

const { getClient, getClients } = require("../../src/consumer")



describe('API Pact test - Integration between \'clients-service\' and \'frontend\'', () => {
  describe("GET /clients", () => {
    const expectedBody = {
      firstName: 'Lisa',
      lastName: 'Simpson',
      age: 8,
      id: 1
    }

    beforeEach (async () => {
      await mockProvider.addInteraction({
        state: "i have a list of clients",
        uponReceiving: "a request for all clients",
        withRequest: {
          method: "GET",
          path: "/clients",
          headers: {
            Accept: "application/json, text/plain, */*",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: Matchers.eachLike(expectedBody),
        },
      })
    })

    it("returns correct body, header and statusCode", async () => {
      const response = await getClients()
      expect(response.headers['content-type']).to.equal("application/json; charset=utf-8")
      expect(response.data).to.deep.equal([expectedBody])
      expect(response.status).to.equal(200)
    })
  })

  describe("GET /clients/:id", () => {
    const expectedBody = {
      firstName: 'Raphael',
      lastName: 'Palhano',
      age: 25,
      id: 4,
    }
    

    beforeEach (async () => {
      await mockProvider.addInteraction({
        state: "i have client with id 4",
        uponReceiving: "a request for client with id 4",
        withRequest: {
          method: "GET",
          path: "/clients/4",
          headers: {
            Accept: "application/json, text/plain, */*",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: Matchers.like(expectedBody),
        },
      })
    })

    it("returns correct body, header and statusCode", async () => {
      const response = await getClient(4)
      expect(response.headers['content-type']).to.equal("application/json; charset=utf-8")
      expect(response.data).to.deep.equal(expectedBody)
      expect(response.status).to.equal(200)
    })
  })
})
