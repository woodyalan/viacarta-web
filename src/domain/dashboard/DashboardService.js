export default class DashboardService {
    constructor(resource) {
        this._resource = resource
    }

    getSaldosFuncionarios() {
        return this._resource
            .get(`dashboard/saldosFuncionarios`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter os saldos dos funcionarios');
            })
    }

    getDespesasProjetos() {
        return this._resource
            .get(`dashboard/despesasProjetos`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter as despesas dos projetos');
            })
    }

    getManutencoesVeiculos() {
        return this._resource
            .get(`dashboard/manutencoesVeiculos`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter as despesas dos projetos');
            })
    }
}
