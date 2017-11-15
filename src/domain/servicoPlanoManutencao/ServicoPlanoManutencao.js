export default class servicoPlanoManutencao {
	constructor(planoManutencao = null, servicoManutencao = null, tempo = null, km = null) {
		this.planoManutencao = planoManutencao;
        this.servicoManutencao = servicoManutencao;
		this.tempo = tempo;
		this.km = km;
	}
}
