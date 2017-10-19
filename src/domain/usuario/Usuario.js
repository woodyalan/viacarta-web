export default class Usuario {
	constructor(nome = null, email = null, celular = null, senha = null, ativo = null, perfil = null) {
        this.nome = nome
        this.email = email
        this.celular = celular
        this.senha = senha
        this.ativo = ativo
        this.perfil = perfil
	}
}
