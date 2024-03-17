import './index.css'

const FiltersGroup = props => {
  const {
    categoryList,
    disRatingsList,
    updateCategory,
    updateRating,
    clearRatingCategory,
  } = props

  const onClickCat = catID => {
    updateCategory(catID)
  }

  const onClickRat = ratID => {
    updateRating(ratID)
  }

  const onClickClearFilter = () => {
    clearRatingCategory()
  }

  return (
    <div className="filters-group-container">
      <h1>Category</h1>
      {categoryList.map(eachCat => (
        <button
          onClick={() => onClickCat(eachCat.categoryId)}
          type="button"
          className={`category_sub_heading ${
            eachCat.displayStyle ? 'clicked_style' : ''
          }`}
          key={eachCat.categoryId}
          value={eachCat.categoryId}
        >
          <p>{eachCat.name}</p>
        </button>
      ))}

      <h1>Rating</h1>
      {disRatingsList.map(eachSB => (
        <button
          onClick={() => onClickRat(eachSB.ratingId)}
          type="button"
          className="btn_star"
          key={eachSB.ratingId}
        >
          <>
            <img
              className="star_img"
              src={eachSB.imageUrl}
              alt={`rating ${eachSB.ratingId}`}
            />
            <p>&up</p>
          </>
        </button>
      ))}

      <button
        onClick={onClickClearFilter}
        className="clear_filter_btn"
        type="button"
      >
        Clear Filters
      </button>
      {/* Replace this element with your code */}
    </div>
  )
}

export default FiltersGroup
