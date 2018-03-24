export default class SeguroVeiculo {
	constructor(veiculo = null, seguradora = null, inicio = new Date().toLocaleDateString(), fim = new Date().toLocaleDateString(), apolice = null) {
		this.veiculo = veiculo;
        this.seguradora = seguradora;
		this.inicio = inicio;
		this.fim = fim;
		this.apolice = apolice;
	}
}
