migrate((db) => {
  const collection = new Collection({
    "id": "fil9ch7rglcdaij",
    "created": "2023-04-12 02:41:04.353Z",
    "updated": "2023-04-12 02:41:04.353Z",
    "name": "portfolio",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vwmat5ux",
        "name": "userid",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("fil9ch7rglcdaij");

  return dao.deleteCollection(collection);
})
