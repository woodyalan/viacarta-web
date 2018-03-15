export default class Pessoa {
	constructor(nome = null, cep = null, endereco = null, numero = null, complemento = null, bairro = null, cidade = null, estado = null) {
        this.nome = nome;
        this.cep = cep;
        this.endereco = endereco;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;	
    }
}
