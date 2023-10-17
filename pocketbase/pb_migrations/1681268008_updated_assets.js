migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fil9ch7rglcdaij")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_946LhiJ` ON `assets` (\n  `asset_userid`,\n  `asset_name`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fil9ch7rglcdaij")

  collection.indexes = []

  return dao.saveCollection(collection)
})
