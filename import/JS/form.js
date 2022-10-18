class ajaxform {
  constructor(selector, settings) {
    this.settings = settings
    this.form = document.querySelector(selector)
    this.fields = this.form.elements
    this.errors = []
    this.form.addEventListener('submit', (e) => {
      e.preventDefault()

      if (this.isValid()) {
        this.submit()
      }
    })

    this.form.addEventListener('input', (e) => this.validationField(e.target.name))
  }

  isValid() {
    const validators = this.settings.validators
    if (validators) {
      for (const fieldName in validators) {
        this.validationField(fieldName)
      }
    }
    if (this.errors.length) {
      return true
    } else {
      return false
    }
  }
  

  validationField(fieldName) {
    if (fieldName && this.settings.validators[fieldName]) {
      try {
        this.settings.validators[fieldName](this.fields[fieldName])
        this.hideError(fieldName)
      } catch (error) {
        this.showError(fieldName, error.message)
      }
    }
  }

  hideError(fieldName) {
    if (this.errors.length) {
      const field = this.fields[fieldName].closest ? this.fields[fieldName] : this.fields[fieldName][0]
      this.errors = this.errors.filter((field) => field !== fieldName)
      field.closest('label').classList.remove('error')
    }
  }
  
  showError(fieldName, text) {
    if (fieldName) {
      const field = this.fields[fieldName].closest ? this.fields[fieldName] : this.fields[fieldName][0]
      this.errors.push(fieldName)
      field.closest('label').classList.add('error')
      field.placeholder = text
    }
  }

  submit() {

  }
}

const newajaxform = new ajaxform ('#form', {
  url: 'https://webdev-api.loftschool.com/sendmail',
  validators: {
    name: function(field) {
      if (field.value.length < 2) {
        throw new Error('Имя не валидное')
      }
    },
    phone: function(field) {
      if (!field.value.length) {
        throw new Error('Телефон не валиден')
      }
    },
    street: function(field) {
      if (!field.value.length) {
        throw new Error('Адрес не валиден')
      }
    },
    house: function(field) {
      if (!field.value.length) {
        throw new Error('Номер дома не валиден')
      }
    },
    sector: function(field) {
      if (!field.value.length) {
        throw new Error('Корпус не валиден')
      }
    },
    flat: function(field) {
      if (!field.value.length) {
        throw new Error('Номер квартиры не валиден')
      }
    },
    floor: function(field) {
      if (!field.value.length) {
        throw new Error('Этаж не валиден')
      }
    },
  }
})