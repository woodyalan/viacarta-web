export default class Feriado {
	constructor(calendario = null, nome = null, dia = Date()) {
        this.calendario = calendario;
        this.nome = nome;
		this.dia = dia;
	}
}
