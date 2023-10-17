migrate((db) => {
  const collection = new Collection({
    "id": "d0ysk1m38rmls5t",
    "created": "2023-04-11 00:45:10.108Z",
    "updated": "2023-04-11 00:45:10.108Z",
    "name": "asset_classes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "oipcsdyv",
        "name": "asset_classes_userid",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "not8txnw",
        "name": "asset_class_name",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "STOCK",
            "BOND",
            "REIT"
          ]
        }
      },
      {
        "system": false,
        "id": "lc9wxpj9",
        "name": "asset_class_amount",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "ak4y4h94",
        "name": "asset_class_target",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 1
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
  const collection = dao.findCollectionByNameOrId("d0ysk1m38rmls5t");

  return dao.deleteCollection(collection);
})
