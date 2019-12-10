/* eslint-disable no-undef */
import React from 'react'
import { Home, Loading } from '../components'
import CardGrid from '../components/card-grid'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Typography } from '@material-ui/core'

Enzyme.configure({ adapter: new Adapter() })

describe('Testando componente da Home', () => {
  test('Deve renderizar loading enquanto o status seja loading', () => {
    const pokemon = { status: 'loading' }
    const component = mount(<Home pokemon={pokemon} />)
    expect(component.find(Loading).length).toBeTruthy()
  })

  test('Deve renderizar texto de erro caso aconteça um error no request', () => {
    const pokemon = { status: 'error' }
    const component = mount(<Home pokemon={pokemon} />)
    expect(component.find(Typography).text()).toContain(
      'Ooops, algo deu errado.'
    )
  })

  test('Deve renderizar os pokemons caso se obtenha resultado positivo na requisição com a API', async () => {
    const apiEndpoint = 'https://pokeapi.co/api/v2/pokemon/'
    const response = await fetch(apiEndpoint)
    const { results } = await response.json()
    const pokemon = { pokemons: results, status: 'done' }
    const component = mount(<Home pokemon={pokemon} />)
    setTimeout(() => expect(component.find(CardGrid).length).toBeTruthy(), 0)
  })
})
