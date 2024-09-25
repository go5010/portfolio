import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// 都道府県と市区町村のデータを用意
const municipalities = {
  北海道: ["札幌市", "函館市", "小樽市"],
  東京都: ["新宿区", "渋谷区", "世田谷区"],
  大阪府: ["大阪市", "堺市", "東大阪市"],
  // ここに他の都道府県と市区町村も追加可能
};

const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null); // メインメニューの位置
  const [subMenuEl, setSubMenuEl] = useState(null); // サブメニューの位置
  const [selectedPrefecture, setSelectedPrefecture] = useState(""); // 選択された都道府県

  // メインメニューを開く
  const handleMainClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // メインメニューを閉じる
  const handleMainClose = () => {
    setAnchorEl(null);
    setSubMenuEl(null); // サブメニューも閉じる
  };

  // サブメニューを開く
  const handleSubMenuOpen = (event, prefecture) => {
    setSubMenuEl(event.currentTarget);
    setSelectedPrefecture(prefecture);
  };

  // サブメニューを閉じる
  const handleSubMenuClose = () => {
    setSubMenuEl(null);
  };

  return (
    <div>
      {/* メインメニューのボタン */}
      <Button
        aria-controls="main-menu"
        aria-haspopup="true"
        onClick={handleMainClick}
      >
        都道府県を選択
      </Button>

      {/* メインメニュー */}
      <div className="w-[100px] h-[300px] rounded border">
        {Object.keys(municipalities).map((prefecture) => (
          <button
            key={prefecture}
            onClick={(event) => handleSubMenuOpen(event, prefecture)}
            aria-haspopup="true"
          >
            {`>${prefecture}`}
            {/* サブメニュー */}
              municipalities[selectedPrefecture].map((city) => (
            {selectedPrefecture === prefecture &&
                <div>
                  <button onClick={handleSubMenuClose}>{city}</button>
                </div>
              ))}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
