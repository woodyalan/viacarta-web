var CNPJ = require("cpf_cnpj").CNPJ;

function validate(value) {
  return CNPJ.isValid(value);
}

export default validate

