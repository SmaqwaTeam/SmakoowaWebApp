import LoginView from './LoginView.vue'
import { useUserStore } from '../stores/UserStore'
describe('<LoginView />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(LoginView)
    cy.contains('Login')
    cy.contains('Password')
    cy.contains('Sign Up')
    cy.get('.shadow').click()
})
})