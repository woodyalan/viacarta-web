export default class Custeio {
	constructor(funcionario = null, descricao = null, data = new Date().toLocaleDateString(), valor = 0, observacoes = null) {
		this.funcionario = funcionario;
		this.descricao = descricao;
		this.data = data;
		this.valor = valor;
		this.observacoes = observacoes;
	}
}
