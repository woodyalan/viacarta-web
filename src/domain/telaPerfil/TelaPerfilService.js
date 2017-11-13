export default class TelaPerfilService {
    constructor(resource) {
        this._resource = resource;
    }

    get(perfil, tela) {
        return this._resource
            .get(`telaPerfil/${perfil}/${tela}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter o registro');
            })
    }

    getTelas(perfil) {
        return this._resource
            .get(`telaPerfil/${perfil}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter o registro');
            })
    }

    save(telaPerfil) {
        return this._resource
            .post('telaPerfil', telaPerfil)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível salvar o registro');
            })
    }

    update(perfil, tela, telaPerfil) {
        return this._resource
            .put(`telaPerfil/${perfil}/${tela}`, telaPerfil)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível salvar o registro');
            })
    }

    delete(perfil, tela) {
        return this._resource
            .delete(`telaPerfil/${perfil}/${tela}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível remover o registro');
            })
    }
}
