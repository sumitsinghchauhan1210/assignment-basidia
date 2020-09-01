const cityEntity = require('../src/enterprise_business_logic/enterprise_entities/cities')

const cityUseCases = require("../src/application_business_logic/use_cases/citiesUseCases")
const use_cases = new cityUseCases()

const expects = require('chai').expect

const should = require('chai').should()

const cityRepository = require('../src/application_business_logic/repositories/citiesRepository')
const cityRepositoryMysql = require('../src/interface_adapters/storage/cityRepositoryMysql')

const mockRepository = new cityRepository(new cityRepositoryMysql())

describe('Testing Create City Use Case', () => {

    //  Test Case One-  check if the city is created if the value passed are correct 

    it('#should return true if correct city values are passed ', async () => {
        const city = new cityEntity(null, 'Agra', 'Uttar Pradesh', true)
        const result = await use_cases.createCity(city, mockRepository)
        expects(result).to.be.an('object')
        expects(result).to.have.deep.property('status', true)
        expects(result).to.have.deep.property('name', "Agra")
        expects(result).to.have.deep.property('state', "Uttar Pradesh")
        await use_cases.deleteCity(result.id, mockRepository)
    })

    //  Test Case Two-  check if the city is not created if the value passed are undefined and throws error 

    it('#should throw error if undefined values are passed', async () => {
        const city = new cityEntity(undefined, undefined, undefined, undefined)
        try {
            await use_cases.createCity(city, mockRepository)
        } catch (error) {
            expects(error.message).to.be.a('string')
            const errors = error.message.split(',')
            errors.forEach(err => {
                const tempArray = err.split(':')
                expects(tempArray[0]).to.match(/notNull Violation/)
            });
        }
    })

    //  Test Case Three-  check if the city is not created if the value passed in city name is not unique and throws error 

    it('#should throw an error if city name is not unique', async () => {
        const city = new cityEntity(null, 'Agra', 'Uttar Pradesh', true)
        const result = await use_cases.createCity(city, mockRepository)
        try {
            await use_cases.createCity(city, mockRepository)
        } catch (error) {
            expects(error.message).to.be.a('string')
            expects(error.message).to.match(/City Name should be unique./)
        }
        await use_cases.deleteCity(result.id, mockRepository)
    })
})