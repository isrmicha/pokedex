/* eslint-disable no-undef */
import React from 'react'
import { Home, Loading } from '../components'
import ModalPokemon from '../components/modal-pokemon'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Testando componente da Home', () => {
  test('Deve renderizar o loading caso ainda não se tenha obtido resposta da API', async () => {
    const apiEndpoint = 'https://pokeapi.co/api/v2/pokemon/'
    const response = await fetch(apiEndpoint)
    const { results } = await response.json()
    const pokemon = {
      pokemons: results,
      status: 'loading',
      currentPokemon: { ...results[0] }
    }
    const component = mount(<Home pokemon={pokemon} />)

    expect(component.find(Loading).length).toBeTruthy()
  })
  test('Deve renderizar o pokemons caso se obtenha resultado positivo na requisição com a API', async () => {
    const apiEndpoint = 'https://pokeapi.co/api/v2/pokemon/'
    const response = await fetch(apiEndpoint)
    const { results } = await response.json()
    const pokemon = {
      pokemons: results,
      status: 'done',
      currentPokemon: { ...results[0] }
    }
    const component = mount(<Home pokemon={pokemon} />)
    setTimeout(
      () => expect(component.find(ModalPokemon).length).toBeTruthy(),
      0
    )
  })
})
