// Get All List Tree
const getAllListTree = (
  roots: [],
  list: [],
  propertyId: string | number,
  propertyParent: string | number
) => {
  return roots.map((x) => {
    x.children = list.filter((k) => x[propertyId] === k[propertyParent])
    if (x.children != null) {
      getAllListTree(x.children, list, propertyId, propertyParent)
    }
    return x
  })
}

// Generate Tree
export function generateTree(
  list: [],
  propertyId: string | number,
  propertyParent: string | number
) {
  if (list != null) {
    return getAllListTree(
      list.filter((x) => x[propertyParent] === null),
      list,
      propertyId,
      propertyParent
    )
  }
  return null
}

// Search Tree
export function searchTree(item: { children: [] }, property: string, value: any) {
  if (item[property] === value) {
    return item
  } else {
    if (item.children.length > 0) {
      return searchTrees(item.children, property, value)
    }
  }
  return null
}
// Search Trees
export function searchTrees(items: [], property: string, value: any) {
  let set = false
  let obj = null
  items.forEach((item) => {
    if (set === false) {
      obj = searchTree(item, property, value)
      if (obj !== null) {
        set = true
      }
    }
  })
  return obj
}
