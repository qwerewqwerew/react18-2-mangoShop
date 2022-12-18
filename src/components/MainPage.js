import React from "react";
import "./MainPage.css";
import axios from "axios";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {API_URL} from "../config/constants.js";
import {Carousel} from "antd";

dayjs.extend(relativeTime);

function MainPage() {
	const [products, setProducts] = React.useState([]);
	const [banners, setBanners] = React.useState([]);
	React.useEffect(function () {
		axios
			.get(`${API_URL}/products/`)
			.then(function (result) {
				console.log(result);
				const products = result.data.products;
				setProducts(products);
			})
			.catch(function (error) {
				console.log("에러발생:", error);
			});
		axios
			.get(`${API_URL}/banners`)
			.then((result) => {
				const banners = result.data.banners;
				setBanners(banners);
			})
			.catch((error) => {
				console.error("에러 발생 : ", error);
			});
	}, []);
	return (
		<div>
			<Carousel autoplay autoplaySpeed={3000}>
				{banners.map((banner, index) => {
					return (
						<Link to={banner.href} key={index}>
							<div id="banner">
								<img src={`${API_URL}/${banner.imageUrl}`} alt="" />
							</div>
						</Link>
					);
				})}
			</Carousel>
			<h1>Products</h1>
			<div id="product-list">
				{products.map(function (product, index) {
					return (
						<div className="product-card" key={index}>
							{product.soldout === 1 ? <div className="product-blur"></div> : null}
							<Link className="product-link" to={`/product/${product.id}`}>
								<div>
									<img className="product-img" src={`${API_URL}/${product.imageUrl}`} alt={`${product.name}`} />
								</div>
								<div className="product-contents">
									<span className="product-name">{product.name}</span>
									<span className="product-price">{product.price}원</span>
									<div className="product-footer">
										<div className="product-seller">
											<img className="product-avatar" src="images/icons/avatar.png" alt={`${product.seller}`} />
											<span>{product.seller}</span>
										</div>
										<span className="product-date">{dayjs(product.createdAt).fromNow()}</span>
									</div>
								</div>
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
}
export default MainPage;
