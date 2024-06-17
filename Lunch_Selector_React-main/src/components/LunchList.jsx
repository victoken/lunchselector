import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import "/src/styles.css";

export default function LunchList() {
  const [lunches, setLunches] = useState([]);
  const ratingBodyTemplate = (lunches) => {
    return <Rating value={lunches.rating} readOnly cancel={false} />;
  };
  useEffect(() => {
    // 讀取數據
    fetch("/LuchOptionData.json")
      .then((response) => response.json())
      .then((data) => setLunches(data))
      .catch((error) => console.error("資料有問題阿:", error));
  }, []);

  return (
    <div className="card">
      <DataTable
        value={lunches}
        showGridlines
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="id" header="編號" sortable></Column>
        <Column field="name" header="名稱" sortable></Column>
        <Column field="shopName" header="店家" sortable></Column>
        <Column field="price" header="價格" sortable></Column>
        <Column
          field="rating"
          header="評分"
          sortable
          body={ratingBodyTemplate}
        ></Column>
      </DataTable>
    </div>
  );
}
