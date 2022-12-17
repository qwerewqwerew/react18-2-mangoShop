import "./ProductPage.css";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {API_URL} from "../config/constants.js";
import dayjs from "dayjs";
import {Button , message } from "antd";

function ProductPage() {
	const {id} = useParams();
	const [product, setProduct] = useState(null);
	const getProduct = () => {
		axios
			.get(`${API_URL}/products/${id}`)
			.then(function (result) {
				setProduct(result.data.product);
			})
			.catch(function (error) {
				console.error(error);
			});
	};
	useEffect(function () {
		getProduct();
	}, []);
	if (product === null) {
		return <h1>상품정보를 받고 있습니다...</h1>;
	}

	const onClickPurchase = () => {
		axios
			.post(`${API_URL}/purchase/${id}`)
			.then((result) => {
				message.info('결제가 완료 되었습니다')
				getProduct();
			})
			.catch((error) => {
				message.error(`에러가 발생했습니다. ${error.message}`);
			});
	};
	return (
		<div>
			<div id="image-box">
				<img src={`${API_URL}/${product.imageUrl}`} alt={product.name} />
			</div>
			<div id="profile-box">
				<img src="/images/icons/avatar.png" alt={product.seller} />
				<span className="product-seller">{product.seller}</span>
			</div>
			<div id="contents-box">
				<div id="name">{product.name}</div>
				<div id="price">{product.price}원</div>
				<div id="createAt">{dayjs(product.createdAt).format("YYYY년 MM월 DD일")}</div>
				<Button size="large" type="primary" danger={true} className="purchase" onClick={onClickPurchase} disabled={product.soldout ===1 }>
					즉시결제하기
				</Button>
				<pre id="description">{product.description}</pre>
			</div>
		</div>
	);
}

export default ProductPage;
