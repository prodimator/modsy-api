import React, { Component } from 'react';
import { ReactComponent as Question } from '../../assets/question.svg';
import { ReactComponent as Left } from '../../assets/left-chevron.svg';
import { ReactComponent as Right } from '../../assets/right-chevron.svg';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import axios from 'axios';

import './ProductList.scss';

export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productData: [],
            showLimit: 5,
            page: 1,
            pageLimit: 1,
            loading: true
        }
    }

    componentDidMount() {
        const url = 'https://api.bestbuy.com/v1/products(search=oven&search=stainless&search=steel)?format=json&show=all&apiKey=mPlbr5GXMVkagVgzwT7T2V5X';
        axios.get(url)
            .then(res => {
                //parse results from the api and build an array of just the necessary items
                let productData = [];
                res.data.products.map((product, index) => {
                    let item = {
                        name: product.name,
                        image: product.image,
                        shortDescription: product.shortDescription,
                        longDescription: product.longDescription,
                        price: product.regularPrice
                    }
                    productData.push(item);
                });
                this.setState({
                    productData,
                    loading: false,
                    pageLimit: Math.ceil(productData.length / this.state.showLimit)
                })
            });

    }
    render() {
        if (this.state.loading) {
            // if we're waiting on fetching the data from the endpoint, show this.
            return (
                <div>
                    <LoadingScreen />
                </div>
            )
        }
        else {
            // if we have the data loaded, show the products

            //this is calculations to show which items are being shown in the header
            let first = (this.state.showLimit * this.state.page) - (this.state.showLimit - 1);
            let last = this.state.showLimit * this.state.page;
            let total = this.state.productData.length;
            return (
                <div className="product-container">
                    <div className="header">
                        <h1>Product List</h1>
                        <h4>Showing items: {first}-{last} out of {total}</h4>
                    </div>

                    {/* map through each product and render a product item element */}
                    {this.state.productData.map((product, index) => {

                        // if product is on the current page
                        if (index < (this.state.page * this.state.showLimit) && (index >= ((this.state.page - 1) * this.state.showLimit))) {
                            return (
                                <div className="product-item" key={index}>
                                    <h2 className="item-index">{index + 1}</h2>

                                    {/* if there is an image from the api, show it, otherwise display a question mark svg */}
                                    {product.image ?
                                        <img className="product-image" src={product.image} />
                                        :
                                        <div className="product-image">
                                            <Question />
                                        </div>
                                    }

                                    <div className="product-content">
                                        <div className="content-primary">
                                            <span className="product-title">{product.name}</span>
                                            <span className="product-price">${product.price}</span>
                                        </div>
                                        <p className="product-description">{product.shortDescription}</p>
                                    </div>
                                </div>
                            )
                        }
                    })}
                    <div className="pagination">
                        {(this.state.page <= this.state.pageLimit && this.state.page > 1) &&
                            <span onClick={() => this.setState({ page: this.state.page - 1 })}>
                                <Left />
                            </span>
                        }
                        {(this.state.page >= 1 && this.state.page < this.state.pageLimit) &&
                            <span onClick={() => this.setState({ page: this.state.page + 1 })}>
                                <Right />
                            </span>
                        }
                    </div>
                </div>
            )
        }
    }
}
