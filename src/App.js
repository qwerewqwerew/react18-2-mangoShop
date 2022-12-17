import "./App.css";
import MainPage from "./components/MainPage";
import {  Route, Routes, Link, useNavigate } from "react-router-dom";
import UploadPage from "./components/UploadPage";
import ProductPage from "./components/ProductPage";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function App() {
	const navigate = useNavigate();
	return (
		<div>
			<div id="header">
				<div id="header-area">
					<Link to="/">
						<img src="/images/icons/logo.png" alt="" />
					</Link>
					<Button
						size="large"
						icon={<UploadOutlined />}
						onClick={() => {
							navigate("/upload");
						}}
					>
						상품업로드
					</Button>
				</div>
			</div>
			<div id="body">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/upload" element={<UploadPage />} />
					<Route path="product/:id" element={<ProductPage />} />
				</Routes>
			</div>
			<div id="footer"></div>
		</div>
	);
}

export default App;
