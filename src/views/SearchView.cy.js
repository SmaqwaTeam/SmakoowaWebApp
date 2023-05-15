import SearchView from './SearchView.vue'

describe('<SearchView />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(SearchView)
    cy.contains('What are you looking for')
  })
})