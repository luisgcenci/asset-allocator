migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d0ysk1m38rmls5t")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_yqZrfOK` ON `asset_classes` (\n  `asset_class_userid`,\n  `asset_class_name`\n)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oipcsdyv",
    "name": "asset_class_userid",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d0ysk1m38rmls5t")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_yqZrfOK` ON `asset_classes` (\n  `asset_classes_userid`,\n  `asset_class_name`\n)"
  ]

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
