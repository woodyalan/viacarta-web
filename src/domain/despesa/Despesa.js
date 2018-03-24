export default class Despesa {
	constructor(funcionario = null, tipoDespesa = null, fornecedor = null, projeto = null, data = new Date().toLocaleDateString(), valor = 0, notaFiscal = null, descricao = null, observacoes = null, anexosDespesa = []) {
		this.funcionario = funcionario;
		this.tipoDespesa = tipoDespesa;
		this.fornecedor = fornecedor;
		this.projeto = projeto;
		this.data = data;
		this.valor = valor;
		this.notaFiscal = notaFiscal;
		this.descricao = descricao;
		this.observacoes = observacoes;
		this.anexosDespesa = anexosDespesa;
	}
}