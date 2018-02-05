import Endereco from 'src/domain/cep/Endereco';

export default class CepService {
    constructor(resource) {
        this._resource = resource
    }

    getEndereco(cep) {
        let cleanValue = cep.replace(/\D/g, '')

        return this._resource
            .get(`http://cep.republicavirtual.com.br/web_cep.php?cep=${cleanValue}&formato=json`)
            .then(res => {
                if(res.body.resultado > 0) {
                    return {
                        valid: true,
                        cep: cep,
                        logradouro: res.body.tipo_logradouro + " " + res.body.logradouro,
                        bairro: res.body.bairro,
                        cidade: res.body.cidade,
                        estado: res.body.uf
                    }
                } else {
                    return new Endereco();
                }
            }, err => {
                console.log(err);
                throw new Error('Não foi possível consultar o CEP');
            })
    }
}
