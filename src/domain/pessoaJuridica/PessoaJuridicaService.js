export default class PessoaJuridicaService {
    constructor(resource) {
        this._resource = resource;
    }

    get(cnpj) {
        return this._resource
            .post(`pessoaJuridica`, { cnpj })
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter o registro');
            })
    }
}
