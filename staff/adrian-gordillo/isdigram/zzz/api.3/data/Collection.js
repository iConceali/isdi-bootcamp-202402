import { readFile, writeFile } from "fs";
class Collection {
    name;
    constructor(name) {
        this.name = name;
    }
    // helpers
    _generateId() {
        // @ts-ignore
        return (+parseInt(Math.random() * 10 ** 17).toString()).toString(36);
    }
    _loadDocuments(callback) {
        if (typeof callback !== "function")
            throw new TypeError("callback is not a function");
        readFile(`./data/${this.name}.json`, "utf8", (error, documentsJSON) => {
            if (error) {
                callback(error);
                return;
            }
            const documents = JSON.parse(documentsJSON || "[]");
            callback(null, documents);
        });
    }
    _saveDocuments(documents, callback) {
        if (!(documents instanceof Array))
            throw new TypeError("documents is not an array");
        if (typeof callback !== "function")
            throw new TypeError("callback is not a function");
        documents.forEach((document) => {
            // if (!(document instanceof Object)) throw new TypeError('a document in documents is not an object')
            if (typeof document !== "object")
                throw new TypeError("a document in documents is not an object");
        });
        const documentsJSON = JSON.stringify(documents);
        writeFile(`./data/${this.name}.json`, documentsJSON, (error) => {
            if (error) {
                callback(error);
                return;
            }
            callback(null);
        });
    }
    // CRUD
    findOne(condition, callback) {
        if (typeof condition !== "function")
            throw new TypeError("condition callback is not a function");
        if (typeof callback !== "function")
            throw new TypeError("callback is not a function");
        this._loadDocuments((error, documents) => {
            if (error) {
                callback(error);
                return;
            }
            const document = documents.find(condition);
            callback(null, document || null);
        });
    }
    insertOne(document, callback) {
        // if (!(document instanceof Object)) throw new TypeError('document is not an object')
        if (typeof document !== "object")
            throw new TypeError("document is not an object");
        // if (!(callback instanceof Function)) throw new TypeError('callback is not a function')
        if (typeof callback !== "function")
            throw new TypeError("callback is not a function");
        this._loadDocuments((error, documents) => {
            if (error) {
                callback(error);
                return;
            }
            document.id = this._generateId();
            documents.push(document);
            this._saveDocuments(documents, (error) => {
                if (error) {
                    callback(error);
                    return;
                }
                callback(null, document.id);
            });
        });
    }
    insertMany(documents, callback) {
        if (!Array.isArray(documents))
            throw new TypeError("documents is not an array");
        if (typeof callback !== "function")
            throw new TypeError("callback is not a function");
        documents.forEach((document) => {
            if (typeof document !== "object")
                throw new TypeError("a document in documents is not an object");
        });
        this._loadDocuments((error, existingDocuments) => {
            if (error) {
                callback(error);
                return;
            }
            const mergedDocuments = existingDocuments.concat(documents);
            this._saveDocuments(mergedDocuments, (error) => {
                if (error) {
                    callback(error);
                    return;
                }
                callback(null);
            });
        });
    }
    updateOne(condition, document, callback) {
        if (typeof condition !== "function")
            throw new TypeError("condition callback is not a function");
        if (typeof document !== "object")
            throw new TypeError("document is not an object");
        if (typeof callback !== "function")
            throw new TypeError("callback is not a function");
        this._loadDocuments((error, documents) => {
            if (error) {
                callback(error);
                return;
            }
            const index = documents.findIndex(condition);
            if (index > -1) {
                documents.splice(index, 1, document);
                this._saveDocuments(documents, (error) => {
                    if (error) {
                        callback(error);
                        return;
                    }
                    callback(null, true);
                });
                return;
            }
            callback(null, false);
        });
    }
    deleteOne(condition, callback) {
        if (typeof condition !== "function")
            throw new TypeError("condition callback is not a function");
        if (typeof callback !== "function")
            throw new TypeError("callback is not a function");
        this._loadDocuments((error, documents) => {
            if (error) {
                callback(error);
                return;
            }
            const index = documents.findIndex(condition);
            if (index > -1) {
                documents.splice(index, 1);
                this._saveDocuments(documents, (error) => {
                    if (error) {
                        callback(error);
                        return;
                    }
                    callback(null, true);
                });
                return;
            }
            callback(null, false);
        });
    }
    // deleteAll(callback) {
    //   if (typeof callback !== "function")
    //     throw new TypeError("callback is not a function");
    //   documents = [];
    //   this._saveDocuments([], (error) => {
    //     if (error) {
    //       callback(error);
    //       return;
    //     }
    //     callback(null, 0);
    //   });
    // }
    getAll(callback) {
        if (typeof callback !== "function")
            throw new TypeError("callback is not a function");
        this._loadDocuments((error, documents) => {
            if (error) {
                callback(error);
                return;
            }
            callback(null, documents);
        });
    }
}
export default Collection;
