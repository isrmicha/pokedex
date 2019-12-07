import React from 'react'
import { Home, CardGrid } from '../components'
import CircularProgress from '@material-ui/core/CircularProgress'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Typography } from '@material-ui/core'

Enzyme.configure({ adapter: new Adapter() })

describe('Testando componente da Home', () => {
  test('Deve renderizar loading enquanto o status seja loading', () => {
    const planet = { status: 'loading' }
    const component = mount(<Home planet={planet} />)
    expect(component.find(CircularProgress).length).toBeTruthy()
  })

  test('Deve renderizar texto de erro caso aconteça um error no request', () => {
    const planet = { status: 'error' }
    const component = mount(<Home planet={planet} />)
    expect(component.find(Typography).text()).toContain('Ooops, algo deu errado.')
  })

  test('Deve renderizar os planetas caso se obtenha resultado positivo na requisição com a API', async () => {
    const apiEndpoint = 'https://swapi.co/api/planets'
    const response = await fetch(apiEndpoint)
    const { results } = await response.json()
    const planet = { planets: results, status: 'done' }
    const component = mount(<Home planet={planet} />)
    expect(component.find(CardGrid).length).toBeTruthy()
  })
})
