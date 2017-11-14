export default class SeguroVeiculo {
	constructor(seguradora = null, veiculo = null, inicio = new Date(), fim = new Date(), apolice = null) {
        this.seguradora = seguradora;
		this.veiculo = veiculo;
		this.inicio = inicio;
		this.fim = fim;
		this.apolice = apolice;
	}
}
