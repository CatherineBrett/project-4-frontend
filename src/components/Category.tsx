import { ICategory } from "../interfaces/category"

function Category({name}: ICategory) {
  console.log(name)
  return <div className="ml-6 mt-2">✅ {name}</div>
}

export default Category
