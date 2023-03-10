import { Route, Routes, Link, useNavigate } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage";
import UploadPage from "./components/UploadPage";
import ProductPage from "./components/ProductPage";
import { Button, ConfigProvider,theme  } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function App() {


	const navigate = useNavigate();
	return (
		<div>
			<ConfigProvider theme={{ token: {colorPrimary : '#ff0000'}}}>
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
				<div id="footer">
					<a href="#">회사소개</a>
					<a href="#">이용약관</a>
					<a href="#">통신판매업:123-1234</a>
					<a href="#">사업자등록번호:456-4567</a>
					<a href="#">개인정보...</a>
				</div>
			</ConfigProvider>
		</div>
	);
}

export default App;
