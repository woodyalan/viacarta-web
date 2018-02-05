export default class Endereco {
	constructor(cep = '', logradouro = '', complemento = '', bairro = '', cidade = '', estado = '') {
        this.valid = true;
        this.cep = cep;
        this.logradouro = logradouro;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
	}
}
