export default class Viagem {
	constructor(veiculo = null, funcionario = null, odometroInicio = null, odometroTermino = null, saida = new Date(), chegada = new Date(), observacoes = null, projetos = []) {
		this.veiculo = veiculo;
		this.funcionario = funcionario;
		this.odometroInicio = odometroInicio;
		this.odometroTermino = odometroTermino;
		this.saida = saida;
		this.chegada = chegada;
		this.observacoes = observacoes;
		this.projetos = projetos;
	}
}
