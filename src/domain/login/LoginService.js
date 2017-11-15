export default class LoginService {
    constructor(resource) {
        this._resource = resource;
    }

    login(email, senha) {
        return this._resource
            .post('auth', { email, senha })
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível realizar o login');
            });
    }

    getUserInfo(email) {
        return this._resource
            .get(`auth/userInfo/${email}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível recuperar as informações do usuário');
            });
    }

    getTelaInfo(route) {
        return this._resource
            .get(`auth/telaInfo/${route}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível recuperar as informações do usuário');
            });
    }

    getUserMenus(perfil) {
        return this._resource
            .get(`auth/userMenus/${perfil}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível recuperar os menus do usuário');
            });
    }
}
