export default class Custeio {
	constructor(veiculo = null, tipoOcorrencia = null, data = new Date()) {
		this.veiculo = veiculo;
		this.tipoOcorrencia = tipoOcorrencia;
		this.data = data;
	}
}
