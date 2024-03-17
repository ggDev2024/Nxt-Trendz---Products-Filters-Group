import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
    displayStyle: false,
  },
  {
    name: 'Electronics',
    categoryId: '2',
    displayStyle: false,
  },
  {
    name: 'Appliances',
    categoryId: '3',
    displayStyle: false,
  },
  {
    name: 'Grocery',
    categoryId: '4',
    displayStyle: false,
  },
  {
    name: 'Toys',
    categoryId: '5',
    displayStyle: false,
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    apiStatus: '',
    activeOptionId: sortbyOptions[0].optionId,
    categoryList: categoryOptions,
    searchUserInput: '',
    selectedCategory: '',
    selectedRating: '',
    disRatingsList: ratingsList,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: 'isLoading',
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {
      activeOptionId,
      selectedCategory,
      selectedRating,
      searchUserInput,
    } = this.state

    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${selectedCategory}&rating=${selectedRating}&title_search=${searchUserInput}`

    console.log(apiUrl)
    /*   if (selectedCategory) {
      apiUrl += `&category=${selectedCategory}`
    }

    if (selectedRating) {
      apiUrl += `&rating=${selectedRating}`
    }

       if (selectedRating && selectedCategory && searchUserInput) {
      apiUrl += `&title_search=${searchUserInput.toLowerCase()}`
    }  */

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: 'success',
      })
    } else {
      this.setState({apiStatus: 'failed'})
    }
  }

  updateCategory = cat => {
    const {categoryList} = this.state
    const updatedCategoryList = categoryList.map(each => {
      if (each.categoryId === cat) {
        return {...each, displayStyle: true}
      }
      return {...each, displayStyle: false}
    })

    this.setState(
      {selectedCategory: cat, categoryList: updatedCategoryList},
      this.getProducts,
    )
  }

  updateRating = ratID => {
    this.setState({selectedRating: ratID}, this.getProducts)
  }

  clearRatingCategory = () => {
    const {categoryList} = this.state

    const updatedCategoryList = categoryList.map(each => ({
      ...each,
      displayStyle: false,
    }))

    console.log(updatedCategoryList)

    this.setState(
      {
        selectedRating: '',
        selectedCategory: '',
        searchUserInput: '',
        categoryList: updatedCategoryList,
      },
      this.getProducts,
    )
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  changeSearch = enterSearch => {
    this.setState({searchUserInput: enterSearch})
  }

  enterSearchInput = () => {
    this.getProducts()
  }

  renderProduct = productsList =>
    productsList.map(eachProduct => (
      <ProductCard productData={eachProduct} key={eachProduct.id} />
    ))

  renderNoProduct = () => (
    <div className="no_product_container">
      <img
        className="no_product_img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
        alt="no products"
      />
      <h1>No Products Found</h1>
      <p>We Could not find any products. Try other filters.</p>
    </div>
  )

  renderProductsList = () => {
    const {
      productsList,
      activeOptionId,
      categoryList,
      searchUserInput,
      disRatingsList,
    } = this.state

    /*  const filteredSearch = productsList.filter(eachProduct =>
      eachProduct.title.toLowerCase().includes(searchUserInput.toLowerCase()),
    )  */

    const noMatchProduct = productsList.length === 0

    // TODO: Add No Products View
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
          changeSearch={this.changeSearch}
          enterSearchInput={this.enterSearchInput}
          searchUserInput={searchUserInput}
        />
        <div className="product_display_section">
          <FiltersGroup
            categoryList={categoryList}
            disRatingsList={disRatingsList}
            updateCategory={this.updateCategory}
            updateRating={this.updateRating}
            clearRatingCategory={this.clearRatingCategory}
          />
          <ul className="products-list">
            {noMatchProduct
              ? this.renderNoProduct()
              : this.renderProduct(productsList)}
          </ul>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view
  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    let content

    switch (apiStatus) {
      case 'success':
        content = this.renderProductsList()
        break
      case 'failed':
        content = this.renderFailureView()
        break
      default:
        content = this.renderLoader()
        break
    }

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        {content}
        {/* isLoading ? this.renderLoader() : this.renderProductsList() */}
      </div>
    )
  }
}

export default AllProductsSection
