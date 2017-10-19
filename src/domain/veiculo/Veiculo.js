export default class Veiculo {
	constructor(nome = null, ano = null, odometro = null, placa = null, ativo = null, planoManutencao = null, tipoVeiculo = null) {
        this.nome = nome;
        this.ano = ano;
        this.odometro = odometro;
        this.placa = placa
        this.ativo = ativo;
		this.planoManutencao = planoManutencao;
		this.tipoVeiculo = tipoVeiculo;
	}
}
