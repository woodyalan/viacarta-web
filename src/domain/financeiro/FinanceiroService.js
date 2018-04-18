export default class FinanceiroService {
    constructor(resource) {
        this._resource = resource
    }

    getAcompanhamentoFinanceiro(params) {
        return this._resource
            .post(`financeiro/acompanhamentoFinanceiro`, params)
            .then(res => res.json(), err => {
                throw new Error(err.body.error.name);
            })
    }
}
