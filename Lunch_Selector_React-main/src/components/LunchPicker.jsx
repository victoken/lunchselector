import React, { useState, useEffect } from "react";
import LunchList from "./LunchList";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const LunchPicker = () => {
  const [lunches, setLunches] = useState([]);
  const [selectedLunch, setSelectedLunch] = useState(null);

  useEffect(() => {
    // 讀取數據
    fetch("/LuchOptionData.json")
      .then((response) => response.json())
      .then((data) => setLunches(data))
      .catch((error) => console.error("資料有問題阿:", error));
  }, []);

  const pickRandomLunch = () => {
    if (lunches.length > 0) {
      const randomIndex = Math.floor(Math.random() * lunches.length);
      setSelectedLunch(lunches[randomIndex]);
    }
  };

  return (
    <div>
      <button
        onClick={pickRandomLunch}
        style={{ marginBottom: "2rem" }}
        className="button-style"
      >
        {" "}
        今天吃甚麼
      </button>
      {selectedLunch && (
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h2>今日午餐：</h2>
          <DataTable value={[selectedLunch]} tableStyle={{ minWidth: "50rem" }}>
            <Column field="id" header="編號" />
            <Column field="name" header="名稱" />
            <Column field="shopName" header="店家" />
            <Column field="price" header="價格" />
            <Column field="rating" header="評分" />
          </DataTable>
        </div>
      )}
      <LunchList lunches={lunches} />
    </div>
  );
};

export default LunchPicker;
