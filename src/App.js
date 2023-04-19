import { Route, Routes, Link, useNavigate } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage";
import UploadPage from "./components/UploadPage";
import ProductPage from "./components/ProductPage";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createBrowserHistory } from "history";
import ReactGA from "react-ga";
const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID; // 환경 변수에 저장된 추적ID 가져오기
ReactGA.initialize(gaTrackingId, { debug: true }); // react-ga 초기화 및 debug 사용
ReactGA.pageview(window.location.pathname); // 추적하려는 page 설정
const history = createBrowserHistory();
history.listen((response) => {
	console.log(response.location.pathname);
	ReactGA.set({ page: response.location.pathname });
	ReactGA.pageview(response.location.pathname);
});

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
					<Route path={`${process.env.PUBLIC_URL}/`} element={<MainPage />} />
					<Route path={`${process.env.PUBLIC_URL}/upload`} element={<UploadPage />} />
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
		</div>
	);
}

export default App;
