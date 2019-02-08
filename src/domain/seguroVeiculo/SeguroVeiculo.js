export default class SeguroVeiculo {
	constructor(veiculo = null, seguradora = null, inicio = new Date(), fim = new Date(), apolice = null) {
		this.veiculo = veiculo;
        this.seguradora = seguradora;
		this.inicio = inicio;
		this.fim = fim;
		this.apolice = apolice;
	}
}
