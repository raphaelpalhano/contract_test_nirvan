"use strict"

const { expect } = require('chai')
const { MatchersV3 } = require("@pact-foundation/pact")

const  API  = require("../../src/consumer").API


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
            Accept: "application/json",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: MatchersV3.eachLike(expectedBody),
        },
      })
    })

    it("returns correct body, header and statusCode", async () => {
      await mockProvider.executeTest(async (mockService) => {
        const api = new API(mockService.url)
        const response = await api.getClients()
        expect(response.headers['content-type']).to.equal("application/json; charset=utf-8")
        expect(response.data).to.deep.equal([expectedBody])
        expect(response.status).to.equal(200)
      })
      
    })
  })

  describe("GET /clients/:id", () => {
    const expectedBody = {
      "firstName": "Wonder",
      "lastName": "Woman",
      "age": 30,
      "id": 2
    }
    

    beforeEach (async () => {
      await mockProvider.addInteraction({
        state: "i have client with id 2",
        uponReceiving: "a request for client with id 2",
        withRequest: {
          method: "GET",
          path: "/clients/2",
          headers: {
            Accept: "application/json",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: MatchersV3.like(expectedBody),
        },
      })
    })

    it("returns correct body, header and statusCode", async () => {
      await mockProvider.executeTest(async (mockService) => {
        const api = new API(mockService.url)
        const response = await api.getClient(2)
        expect(response.headers['content-type']).to.equal("application/json; charset=utf-8")
        expect(response.data).to.deep.equal(expectedBody)
        expect(response.status).to.equal(200)

      })
      
    })
  })
})
