const CharacterModel = require('../shemas/Character');
const comicsStore = require('./ComicsStore');

class CharactersStore {
    async getAll() {
        return CharacterModel.find().populate('comics').select('-__v');
    }

    async get(id) {
        return CharacterModel.findById(id);
    }

    async add(data) {
        let { comics, ...params } = data;
        const character = new CharacterModel(params);
        character.comics = [];
        const comicsModel = await Promise.all((comics || []).map(async comic => {
            return await comicsStore.create(comic);
        }));
        comicsModel.forEach(comic => character.comics.push(comic._id));
        await character.save();
        return character;
    }
};

module.exports = new CharactersStore();