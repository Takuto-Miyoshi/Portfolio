const ELEMENT_CLASS = {
	titleLight: "titleLight",
};

const ELEMENT_ID = {
	top: "top",
	profile: "profile",
	skill: "skill",
	created: "created",
};

// トップのタイトル
let titleLight = null;
setTimeout(() => {
	titleLight = document.getElementsByClassName(ELEMENT_CLASS.titleLight).item(0);
	Flickering();
}, 100);

// 項目別の情報
let contentList = [];
setTimeout(() => {
	// HTMLファイルで出てくる順
	contentList = [
		{ id: ELEMENT_ID.top, pos: document.getElementById(ELEMENT_ID.top).offsetTop, backgroundColor: "#220533" },
		{ id: ELEMENT_ID.profile, pos: document.getElementById(ELEMENT_ID.profile).offsetTop, backgroundColor: "#522908" },
		{ id: ELEMENT_ID.skill, pos: document.getElementById(ELEMENT_ID.skill).offsetTop, backgroundColor: "#404040" },
		{ id: ELEMENT_ID.created, pos: document.getElementById(ELEMENT_ID.created).offsetTop, backgroundColor: "#dddddd" },
	];
	contentList.reverse();
}, 100);

// チカチカさせる
// 一回呼べば勝手に再起して一生続ける
async function Flickering(onLight = true) {
	// 消えている状態
	if (!onLight)
		setTimeout(() => {
			titleLight.style.opacity = 1;
			Flickering(true);
		}, 100);
	// ついている状態
	else
		setTimeout(() => {
			titleLight.style.opacity = 0;
			Flickering(false);
		}, GetRandomFloat(5.0, 0.1) * 1000);
}

function GetRandomFloat(max, min = 0.0) {
	return Math.random() * (max - min) + min;
}

// idの場所へスクロール
function ScrollTo(destination) {
	window.scrollTo(0, DestinationToPos(destination));
}

// idを位置に変換
function DestinationToPos(destination) {
	return contentList.find(content => {
		return content.id == destination;
	}).pos;
}

window.onscroll = () => {
	// スクロールしたら背景を設定
	const pos = window.scrollY;
	const result = contentList.find(content => {
		return content.pos - 150 < pos;
	});
	document.body.style.background = result.backgroundColor;
};
