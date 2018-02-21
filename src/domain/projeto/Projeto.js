export default class Projeto {
	constructor(nome = null, cliente = null, centroCusto = null, inicio = new Date(), fim = new Date(), conclusao = null, escopo = null, ativo = null) {
		this.nome = nome;
		this.cliente = cliente;
		this.centroCusto = centroCusto;
		this.inicio = inicio;
		this.fim = fim;
		this.conclusao = conclusao;
		this.escopo = escopo;
		this.ativo = ativo;
	}
}
