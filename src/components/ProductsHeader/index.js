import {BsFilterRight} from 'react-icons/bs'

import {IoSearchSharp} from 'react-icons/io5'

import './index.css'

const ProductsHeader = props => {
  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }

  const onChangeUserInput = event => {
    const {changeSearch} = props
    changeSearch(event.target.value)
  }

  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const {sortbyOptions, activeOptionId} = props

  return (
    <div className="products-header">
      <div className="search_container">
        <input
          onKeyDown={onEnterSearchInput}
          onChange={onChangeUserInput}
          className="search_input"
          placeholder="search"
          type="search"
        />
        <IoSearchSharp className="search_logo" />
      </div>
      <div className="products-header2">
        <h1 className="products-list-heading">All Products</h1>
        <div className="sort-by-container">
          <BsFilterRight className="sort-by-icon" />
          <p className="sort-by">Sort by</p>
          <select
            className="sort-by-select"
            value={activeOptionId}
            onChange={onChangeSortby}
          >
            {sortbyOptions.map(eachOption => (
              <option
                key={eachOption.optionId}
                value={eachOption.optionId}
                className="select-option"
              >
                {eachOption.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default ProductsHeader
