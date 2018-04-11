import Endereco from 'src/domain/cep/Endereco';

export default class CepService {
    constructor(resource) {
        this._resource = resource
    }

    getEndereco(cep) {
        let cleanValue = cep.replace(/\D/g, '')

        return this._resource
            .get(`cep/${cleanValue}`)
            .then(res => {
                let result = res.body;

                if(result.valid) {
                    return result;
                } else {
                    return new Endereco();
                }
            }, err => {
                console.log(err);
                throw new Error('Não foi possível consultar o CEP');
            })
    }
}
