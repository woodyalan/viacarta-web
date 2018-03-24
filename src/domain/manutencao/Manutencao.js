export default class Manutencao {
	constructor(veiculo = null, fornecedor = null, odometro = null, ativo = 1, data = new Date().toLocaleDateString(), servicos = []) {
		this.veiculo = veiculo;
		this.fornecedor = fornecedor;
		this.odometro = odometro;
		this.data = data;
		this.ativo = ativo;
		this.servicos = servicos;
	}
}
