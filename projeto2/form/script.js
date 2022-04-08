class Validator {
  constructor() {
    this.validations = [
      'data-required',
      'data-min-length',
      'data-email-validate',
      'data-only-letters',
      'data-only-cpf',
      'data-only-phone',
      'data-only-url'
    ]
  }

  validate(form, cont) {
    let currentValidations = document.querySelectorAll('form .error-validation')

    let inputs = form.getElementsByTagName('input')

    let inputArray = [...inputs]
    if (currentValidations.length > 0) {
      this.cleanValidations(currentValidations)
    }

    inputArray.forEach(function (input) {
      for (let i = 0; this.validations.length > i; i++) {
        if (input.getAttribute(this.validations[i]) != null) {
          let method = this.validations[i].replace('data-', '').replace('-', '')

          let value = input.getAttribute(this.validations[i])

          this[method](input, value)
        }
      }
    }, this)
    cont++
  }

  required(input) {
    let inputValue = input.value

    if (inputValue === '') {
      let errorMessage = `Este campo é obrigatório`

      this.printMessage(input, errorMessage)
    }
  }

  minlength(input, minValue) {
    let inputLength = input.value.length

    let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`
    if (inputLength < minValue) {
      this.printMessage(input, errorMessage)
    }
  }

  emailvalidate(input) {
    let re = /\S+@\S+\.\S+/

    let email = input.value

    let errorMessage = `Insira um e-mail no padrão nome@email.com`

    if (!re.test(email)) {
      this.printMessage(input, errorMessage)
    }
  }
  onlyletters(input) {
    let re = /^[A-Za-z]+$/

    let inputValue = input.value

    let errorMessage = `Este campo não aceita números nem caracteres especiais`

    if (!re.test(inputValue)) {
      this.printMessage(input, errorMessage)
    }
  }

  onlycpf(input) {
    let re = /[0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[-][0-9]{2}$/

    let inputValue = input.value

    let errorMessage = `Este campo só aceita CPF`

    if (!re.test(inputValue)) {
      this.printMessage(input, errorMessage)
    }
  }

  onlyphone(input) {
    let re = /[()][0-9]{2}[)][ ][0-9][ ][0-9]{4}[-][0-9]{4}$/

    let inputValue = input.value

    let errorMessage = `Este campo só aceita telefone no padrão (xx) x xxxx-xxxx`

    if (!re.test(inputValue)) {
      this.printMessage(input, errorMessage)
    }
  }
  onlyurl(input) {
    let re = /^(?:http(s):\/\/)+[github.com]+[\/][\w.-]+$/

    let inputValue = input.value

    let errorMessage = `Este campo só aceita links`

    if (!re.test(inputValue)) {
      this.printMessage(input, errorMessage)
    }
  }

  printMessage(input, msg) {
    let errorsQty = input.parentNode.querySelector('.error-validation')

    if (errorsQty === null) {
      let template = document.querySelector('.error-validation').cloneNode(true)

      template.textContent = msg

      let inputParent = input.parentNode

      template.classList.remove('template')

      inputParent.appendChild(template)
    }
  }

  cleanValidations(validations) {
    validations.forEach(el => el.remove())
  }

  navigator() {
    location.href = '/index.html'
  }
}

let form = document.getElementById('register-form')
let submit = document.getElementById('submit')

let validator = new Validator()

submit.addEventListener('click', function (e) {
  e.preventDefault()
  validator.validate(form)
})

submit_voltar.addEventListener('click', function (e) {
  e.preventDefault()
  validator.navigator()
})
