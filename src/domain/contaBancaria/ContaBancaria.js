export default class ContaBancaria {
	constructor(pessoa = null, banco = null, agencia = null, conta = null, operacao = null, ativo = null) {
        this.pessoa = pessoa;
        this.banco = banco;
        this.agencia = agencia;
		this.conta = conta;
		this.operacao = operacao;
		this.ativo = ativo;
	}
}
