migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d0ysk1m38rmls5t")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_yqZrfOK` ON `asset_classes` (\n  `asset_classes_userid`,\n  `asset_class_name`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d0ysk1m38rmls5t")

  collection.indexes = []

  return dao.saveCollection(collection)
})
