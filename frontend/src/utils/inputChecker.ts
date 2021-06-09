/* eslint-disable no-useless-escape */
export default class InputCheck {
  private username: string
  private password: string
  private email: string | null
  private confirmation: string | null
  private personalPage: string | null

  constructor(
    username: string,
    password: string,
    personalPage: string | null = null,
    confirmation: string | null = null,
    email: string | null = null
  ) {
    this.username = username
    this.personalPage = personalPage
    this.password = password
    this.confirmation = confirmation
    this.email = email
  }

  private textInput(text: string) {
    if (text.length < 1) return false
    return /^([a-zA-Z0-9]*)$/.test(text)
  }

  private passwordInput() {
    if (this.password.length < 8) return false
    if (this.confirmation) {
      if (this.password !== this.confirmation) return false
    }
    const passwordTest = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    )
    return passwordTest.test(this.password)
  }

  private emailInput() {

    const emailTest = new RegExp(
        "^[a-zA-Z0-9-_]+@[a-zA-Z0-9-]+\.[a-zA-z0-9]{2,}(\.[a-zA-z0-9]{2,}){0,1}$"
    )
    if (this.email){
        return emailTest.test(this.email)
    }
  }

  public test() {
    if (!this.textInput(this.username)) throw new Error('Invalid username')
    if (!this.passwordInput()) throw new Error('Invalid password')
    if (this.email) {
      if (!this.emailInput()) throw new Error('Invalid email')
    }
    if (this.personalPage) {
      if (!this.textInput(this.personalPage))
        throw new Error('Invalid booking page name')
    }

    return true
  }
}
