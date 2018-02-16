export default class PessoaFisica {
	constructor(pessoa = null, email = null, cpf = null, rg = null, nascimento = null) {
        this.pessoa = pessoa;
        this.email = email;
        this.cpf = cpf;
		this.rg = rg;
		this.nascimento = nascimento;
	}
}
