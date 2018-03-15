export default class PessoaFisicaService {
    constructor(resource) {
        this._resource = resource;
    }

    get(cpf) {
        return this._resource
            .get(`pessoaFisica/${cpf}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter o registro');
            })
    }
}
