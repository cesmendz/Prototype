// SIDEBAR TOGGLE

let sidebarOpen = false;
const sidebar = document.getElementById('sidebar');

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add('sidebar-responsive');
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove('sidebar-responsive');
    sidebarOpen = false;
  }
}
//END TOGGLE

// ---------- CHARTS ----------

// BAR CHART
const barChartOptions = {
  series: [
    {
      data: [10,8,5,9,6],
      name: 'Products',
    },
  ],
  chart: {
    type: 'bar',
    background: 'transparent',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: ['#2962ff', '#d50000', '#2e7d32', '#ff6d00', '#583cb3'],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: '40%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    opacity: 1,
  },
  grid: {
    borderColor: '#55596e',
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    labels: {
      colors: '#000000',
    },
    show: true,
    position: 'top',
  },
  stroke: {
    colors: ['transparent'],
    show: true,
    width: 2,
  },
  tooltip: {
    shared: true,
    intersect: false,
    theme: 'dark',
  },
  xaxis: {
    categories: ['Paper Towel', 'Kitchen Towel', 'Bathroom Tissue', 'Hand Roll Tissue ', 'Jumbo Tissue Roll'],
    title: {
      style: {
        color: '#000000',
      },
    },
    axisBorder: {
      show: true,
      color: '000000',
    },
    axisTicks: {
      show: true,
      color: '000000',
    },
    labels: {
      style: {
        colors: '#000000',
      },
    },
  },
  yaxis: {
    title: {
      text: 'Count',
      style: {
        color: '#000000',
      },
    },
    axisBorder: {
      color: '000000',
      show: true,
    },
    axisTicks: {
      color: '000000',
      show: true,
    },
    labels: {
      style: {
        colors: '#000000',
      },
    },
  },
};

const barChart = new ApexCharts(
  document.querySelector('#bar-chart'),
  barChartOptions
);
barChart.render();

// AREA CHART
const areaChartOptions = {
  series: [
    {
      name: 'Purchase Orders',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: 'Sales Orders',
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  chart: {
    type: 'area',
    background: 'transparent',
    height: 350,
    stacked: false,
    toolbar: {
      show: false,
    },
  },
  colors: ['#00ab57', '#d50000'],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  dataLabels: {
    enabled: false,
  },
  fill: {
    gradient: {
      opacityFrom: 0.4,
      opacityTo: 0.1,
      shadeIntensity: 1,
      stops: [0, 100],
      type: 'vertical',
    },
    type: 'gradient',
  },
  grid: {
    borderColor: '#000000',
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    labels: {
      colors: '#000000',
    },
    show: true,
    position: 'top',
  },
  markers: {
    size: 6,
    strokeColors: '#1b2635',
    strokeWidth: 3,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    axisBorder: {
      color: '#55596e',
      show: true,
    },
    axisTicks: {
      color: '#55596e',
      show: true,
    },
    labels: {
      offsetY: 5,
      style: {
        colors: '#f5f7ff',
      },
    },
  },
  yaxis: [
    {
      title: {
        text: 'Purchase Orders',
        style: {
          color: '#f5f7ff',
        },
      },
      labels: {
        style: {
          colors: ['#f5f7ff'],
        },
      },
    },
    {
      opposite: true,
      title: {
        text: 'Sales Orders',
        style: {
          color: '#f5f7ff',
        },
      },
      labels: {
        style: {
          colors: ['#f5f7ff'],
        },
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
    theme: 'dark',
  },
};

const areaChart = new ApexCharts(
  document.querySelector('#area-chart'),
  areaChartOptions
);
areaChart.render();


/* ----- REPORT -----*/
//Validate form inputs before submitting data
function validateForm(){
  var title = document.getElementById("title").value;
  var text = document.getElementById("text").value;
  var title = document.getElementById("price").value;
  var text = document.getElementById("stock").value;

  if(title == "") {
      alert("ID is Required");
      return false;
  }

  if(text =="") {
      alert("Product Name is required");
      return false;
  }

  if(price == "") {
      alert("Price is Required");
      return false;
  }

  if(stock =="") {
      alert("Stock Quantity is required");
      return false;
  }

  return true;
}



//function to show data
function showData() {
  var peopleList;
  if(localStorage.getItem("peopleList") == null){
      peopleList =[];
  }
  else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  var html ="";

  peopleList.forEach(function (element, index) {
      html += "<tr>";
      html += "<td>" + element.title + "</td>";
      html += "<td>" + element.text + "</td>";
      html += "<td>" + element.price + "</td>";
      html += "<td>" + element.stock + "</td>";
      html += 
      '<td><button onclick="deleteData('+ 
      index +
      ')" class="btn btn-danger">Delete</button><button onclick="updateData(' +
      index + 
      ')" class="btn btn-warning m-2">Edit</button></td>';
      html += "</tr>";
  });

  document.querySelector("#postTable tbody").innerHTML = html;
}

//Loads All data from local storage when document or page loaded
document.onload = showData();

//function to add data to local storage
function addData() {
  //form is validated
  if(validateForm() == true) {
      var title = document.getElementById("title").value;
      var text = document.getElementById("text").value;
      var price = document.getElementById("price").value;
      var stock = document.getElementById("stock").value;

      var peopleList;
      if(localStorage.getItem("peopleList") == null){
          peopleList =[];
      }
      else {
          peopleList = JSON.parse(localStorage.getItem("peopleList"));
      }

      peopleList.push({
          title : title,
          text: text,
          price : price,
          stock: stock,  
      });

      localStorage.setItem("peopleList", JSON.stringify(peopleList));
      showData();
      document.getElementById("title").value = ""; 
      document.getElementById("text").value = "";
      document.getElementById("price").value = ""; 
      document.getElementById("stock").value = "";
  }
}

//function to delete data from local storage
function deleteData(index) {
  var peopleList;
  if(localStorage.getItem("peopleList") == null){
      peopleList =[];
  }
  else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  peopleList.splice(index,1);
  localStorage.setItem("peopleList", JSON.stringify (peopleList));
  showData();
}
//function to update/edit data from local storage
function updateData(index){
  //Submit button willl hide and update button will show for updating of Data in local storage
  document.getElementById("Submit").style.display ="none";
  document.getElementById("Update").style.display ="block";

  var peopleList;
  if(localStorage.getItem("peopleList") == null) {
      peopleList = [];
  } else {
      peopleList = JSON.parse(localStorage.getItem ("peopleList"));
  }

  document.getElementById("title").value = peopleList[index].title;
  document.getElementById("text").value = peopleList[index].text;

  document.querySelector("#Update").onclick = function() {
      if(validateForm() == true){
          peopleList[index].title = document.getElementById("title").value;
          peopleList[index].text = document.getElementById("text").value;
          peopleList[index].price = document.getElementById("price").value;
          peopleList[index].stock = document.getElementById("stock").value;

          localStorage.setItem("peopleList", JSON.stringify(peopleList));

          showData();

          document.getElementById("title").value = "";
          document.getElementById("text").value = "";
          document.getElementById("price").value = "";
          document.getElementById("stock").value = "";


           //Update button willl hide and submit button will show 
  document.getElementById("Submit").style.display ="block";
  document.getElementById("Update").style.display ="none";
      }
  }
}
/*End report */


/* Notif */
var box  = document.getElementById('box');
var down = false;


function toggleNotifi(){
	if (down) {
		box.style.height  = '0px';
		box.style.opacity = 0;
		down = false;
	}else {
		box.style.height  = '510px';
		box.style.opacity = 1;
		down = true;
	}
}