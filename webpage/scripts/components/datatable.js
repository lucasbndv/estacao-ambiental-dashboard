class DataTable {
  constructor(data) {
    this.table = document.createElement("table");
    
    ["caption", "colgroup", "thead", "tbody"].forEach(e => {
      this[e] = document.createElement(e);
      this.table.appendChild(this[e]);
    }); 
    
    if (data && data.headers) {
      data.headers.forEach(h => this.insertHeader(h));
    }
  }
  
  insertHeader(name) {
    let h = document.createElement("th");
    h.scope = "col"
    h.innerHTML = name;
    
    this.thead.appendChild(h);
  }
  
  insertRow(data) {
    let tr = document.createElement("tr");
    tr.classList.add(`row-${data.id}`);
    
    let id = [...this.table.querySelectorAll("tbody > tr")].length;
    
    Object.keys(data).forEach( d => {
      let td = document.createElement("td");
      td.classList.add(`user-${d}`);
      
      let div = document.createElement("div");
      div.innerHTML = data[d];
      
      td.appendChild(div);
      
      tr.appendChild(td);
    });
    
    this.tbody.appendChild(tr);
  }
  
  deleteRowPop() {
    [...table.table.querySelectorAll("tbody > tr")].pop().remove()
  } 
  
  deleteRowShift() {
    [...table.table.querySelectorAll("tbody > tr")].pop().remove()
  }  
   
  deleteRowByOrder(i) {
    [...table.table.querySelectorAll("tbody > tr")][i].remove()
  }
  
  deleteRowById(id) {
    
  }
}
