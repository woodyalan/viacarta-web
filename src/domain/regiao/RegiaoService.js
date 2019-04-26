export default class RegiaoService {
  constructor(resource) {
    this._resource = resource('regiaoFichaCadastro{/id}');
  }

  get(id) {
    return this._resource.get({ id }).then(
      res => res.json(),
      err => {
        console.log(err);
        throw new Error('Não foi possível obter o registro');
      }
    );
  }

  save(regiao) {
    return this._resource.save(regiao).then(
      res => res.json(),
      err => {
        console.log(err);
        throw new Error('Não foi possível salvar o registro');
      }
    );
  }

  update(id, regiao) {
    return this._resource.update({ id }, regiao).then(
      res => res.json(),
      err => {
        console.log(err);
        throw new Error('Não foi possível salvar o registro');
      }
    );
  }

  delete(id) {
    return this._resource.delete({ id }).then(
      res => res.json(),
      err => {
        console.log(err);
        throw new Error('Não foi possível remover o registro');
      }
    );
  }
}
