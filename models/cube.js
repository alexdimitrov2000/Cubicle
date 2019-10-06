const fs = require('fs');
const path = require('path');

class CubeModel {
    constructor() {
        this.data = require('../config/database');
    }

    _write(newData, resolveData) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.resolve('config/database.json'), JSON.stringify(newData, null, 2), (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                this.data = newData;
                resolve(resolveData);
            });
        });
    }

    create(name, description, imageUrl, difficultyLevel) {
        return { name, description, imageUrl, difficultyLevel };
    }

    insert(cube) {
        const currentIndex = this.data.lastIndex;
        const newCube = { id: currentIndex, ...cube };
        const newData = {
            lastIndex: currentIndex + 1,
            entities: this.data.entities.concat(newCube)
        };

        return this._write(newData, newCube);
    }

    getSingle(cubeId) {
        return Promise.resolve(this.data.entities.find(({ id: i }) => i === cubeId));
    }

    getAll() {
        return Promise.resolve(this.data.entities);
    }

    update(cubeId, updates) {
        let entityIndex = this.data.entities.findIndex(({ id }) => id === cubeId);
        let entity = this.data.entities[entityIndex];
        let updatedEntity = { ...entity, ...updates };

        let newData = {
            lastIndex: this.data.lastIndex,
            entities: {
                ...this.data.entities.slice(0, entityIndex),
                updatedEntity,
                ...this.data.entities.slice(entityIndex + 1)
            }
        };

        return this._write(newData, updatedEntity);
    }

    delete(cubeId) {
        let entity = this.getSingle(cubeId);

        let newData = {
            lastIndex: this.data.lastIndex,
            entities: this.data.entities.filter(({id}) => id !== cubeId)
        };

        return this._write(newData, entity);
    }
}

module.exports = new CubeModel();