const ProList = () => {
  axios.get(`http://localhost:3000/products`).then(({ data }) => {
    document.querySelector("tbody").innerHTML = data
      .map((product, index) => {
        return /*html*/ `  <tr>
      <td>${index + 1}</td>
      <td>${product.name}</td>
      <td><img src="${product.image}" alt="anh" width="150px"></td>
      <td>              
        <button class="btn btn-danger btn-delete" data-id="${
          product.id
        }">Delete</button>
        <button class="btn btn-warning btn-edit" data-id="${
          product.id
        }">Edit</button>
      </td>
    </tr>`;
      })
      .join("");
    const btndelete = document.querySelectorAll(".btn-delete");
    for (const btn of btndelete) {
      const id = btn.dataset.id;
      btn.addEventListener("click", () => {
        const tb = window.confirm("Are you sure?");
        if (tb) {
          axios.delete(`http://localhost:3000/products/${id}`).then(() => {
            alert("Thanh cong");
            location.reload();
          });
        }
      });
    }

    const btnedit = document.querySelectorAll(".btn-edit");
    for (const btn of btnedit) {
      const id = btn.dataset.id;
      btn.addEventListener("click", () => {
        return UpdatePro(id);
      });
    }
  });
};
ProList();

const AddPro = () => {
  document.querySelector(".container").innerHTML = /*html*/ `
    <div class="container">
    <h1>Product Add</h1>
    <form action="" id="form">
      <div class="mb-3"><input type="text" placeholder="name" id="name" class="form-control"></div>
      <div class="mb-3"><input type="text" placeholder="image" id="image" class="form-control"></div>
      <div class="mb-3"><button type="submit" class="btn btn-primary">Submit</button></div>
    </form>
  </div> `;
  document.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const product = {
      name: document.querySelector("#name").value.trim(),
      image: document.querySelector("#image").value.trim(),
    };
    const dau = /[.,:;]/;
    if (dau.test(product.name)) {
      alert("Khong dung dau .,:; ");
    } else if (product.name == "") {
      alert("Khong bo trong name");
    } else if (product.image == "") {
      alert("Khong bo trong image");
    } else {
      axios.post(`http://localhost:3000/products`, product).then(() => {
        alert("Thanh cong");
        location.reload();
      });
    }
  });
};
document.querySelector("#add").addEventListener("click", AddPro);

const UpdatePro = (id) => {
  axios.get(`http://localhost:3000/products/${id}`).then(({ data }) => {
    document.querySelector(".container").innerHTML = /*html*/ `
    <div class="container">
    <h1>Product Edit</h1>
    <form action="" id="form">
      <div class="mb-3"><input type="text" placeholder="name" value="${data.name}" id="name" class="form-control"></div>
      <div class="mb-3"><input type="text" placeholder="image" value="${data.image}" id="image" class="form-control"></div>
      <div class="mb-3"><button type="submit" class="btn btn-primary">Submit</button></div>
    </form>
  </div> `;
    document.querySelector("#form").addEventListener("submit", (e) => {
      e.preventDefault();
      const product = {
        name: document.querySelector("#name").value.trim(),
        image: document.querySelector("#image").value.trim(),
      };
      const dau = /[.,:;]/;
      if (dau.test(product.name)) {
        alert("Khong dung dau .,:; ");
      } else if (product.name == "") {
        alert("Khong bo trong name");
      } else if (product.image == "") {
        alert("Khong bo trong image");
      } else {
        axios.put(`http://localhost:3000/products/${id}`, product).then(() => {
          alert("Thanh cong");
          location.reload();
        });
      }
    });
  });
};
